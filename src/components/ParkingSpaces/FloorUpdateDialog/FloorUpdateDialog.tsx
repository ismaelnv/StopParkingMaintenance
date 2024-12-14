'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';;
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import CachedIcon from '@mui/icons-material/Cached';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import {useState, useEffect } from "react"
import { getParkingSpacesId, updateParkingSpace} from '@/service/ParkingSpaces';
import { Floor } from '@/model/Floor';
import { getFloors } from '@/service/Floors';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface FormErrors {
    spaceNumber?: string
    floorCode?: string
}

type UserDialogProps = {
  id: number;
  onUpdate: () => void;
};

export function FloorUpdateDialog({id, onUpdate}: UserDialogProps) {

  
    const [open, setOpen] = React.useState(false);
    const [floors, setFloors] = useState<Floor[]>([])
    const [spaceNumber, setSpaceNumber] = useState('')
    const [errors, setErrors] = useState<FormErrors>({})
    const [floorCode, setFloorCode] = React.useState('');

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
    
        const newErrors: FormErrors = {}
    
        if (!floors) {
          newErrors.spaceNumber = 'El espacio de estacionamiento es obligatorio.'
        } 
    
        if (!spaceNumber) newErrors.floorCode = 'El codigo de piso es obligatorio.'
    
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors)
        } else {

          const parkingSpace = {
            piso: Number(floorCode),
            numeroEspacio:spaceNumber
          }
          await updateParkingSpace(id, parkingSpace)
          setOpen(false)
          onUpdate()
        }
    }

    const handleChange = (event: SelectChangeEvent) => {
        setFloorCode(event.target.value as string);
    };

    useEffect(() =>{

        const getFloorsFfect =  async () =>{
            const floorsObtain: Floor[] = await getFloors();
            if(floorsObtain){

                setFloors(floorsObtain)
            }
        }

        getFloorsFfect()
    }, [])

    useEffect(() =>{
      const getParkingSpaces = async () =>{
        const parkingSpaces =  await getParkingSpacesId(id)
        if(parkingSpaces){
          setFloorCode(String(parkingSpaces.piso.idPiso))
          setSpaceNumber(parkingSpaces.numeroEspacio)
        }
        
      }
      getParkingSpaces()
    },[id, open])
  
    return (
      <React.Fragment>
        <Button variant="outlined" color="success" sx={{width: '150px'}} onClick={handleClickOpen} startIcon={<CachedIcon />}>
            Actualizar
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle  sx={{
                textAlign: "center", // Centra el texto horizontalmente
                textTransform: "uppercase", // Convierte el texto a mayúsculas
                fontWeight: 800, // Hace que el texto sea negrita
                color: '#2f3742',
                }}>{"Actualizar Espacios de Estacionamiento"}
          </DialogTitle>
          <DialogContent>
           <Box sx={{marginTop: '10px'}}>
              <form autoComplete='off' style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Codigo Pisos</InputLabel>
                          <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={floorCode}
                              label="Codigo Pisos"
                              onChange={handleChange}
                      >
                              {floors.map((f) => (
                                  <MenuItem key={f.idPiso} value={f.idPiso}>
                                      {f.idPiso}
                                  </MenuItem>
                              ))}
                          </Select>
                    </FormControl>

                    <TextField
                      sx={{ width: '100%'}}
                      label='Número de Espacio'
                      multiline
                      type='text'
                      value={spaceNumber} // Estado del campo de mensaje
                      onChange={e => setSpaceNumber(e.target.value)}
                      error={Boolean(errors.floorCode)} // Marca como error si hay un mensaje
                      helperText={errors.floorCode} // Muestra el mensaje de error
                    />
                    <Box sx={{width: '100%',display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                      <Button variant="contained" color="success" sx={{textAlign:'center'}} onClick={handleUpdate}>
                        Actualizar
                      </Button>
                    </Box>
              </form>
           </Box>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
}