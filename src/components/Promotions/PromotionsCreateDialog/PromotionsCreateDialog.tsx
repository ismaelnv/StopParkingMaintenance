'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';;
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import CachedIcon from '@mui/icons-material/Cached';
import { Box, TextField } from '@mui/material';
import {useState} from "react"
import { createPromotion} from '@/service/PromotionsService';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface FormErrors {
    promotionCode?: string
    description?: string
    discount?: string
    startDate?: string
    endDate?: string
}

type UserDialogProps = {
  onUpdate: () => void;
};

export function PromotionsCreateDialog({onUpdate}: UserDialogProps) {

  
    const [open, setOpen] = React.useState(false);
    const [promotionCode, setPromotionCode] = useState('')
    const [description, setDescription] = useState('')
    const [discount, setDiscount] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [errors, setErrors] = useState<FormErrors>({})

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleCreate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
    
        const newErrors: FormErrors = {}
    
        if (!promotionCode) {
          newErrors.promotionCode = 'Codigo de promocion obligatorio.'
        } 

        if (!discount){newErrors.discount = 'El descuento es obligatorio.'}
        if(!endDate){newErrors.startDate = 'La fecha de inicio es obligatoria'}
    
        if (!description) newErrors.description = 'La descripcion es obligatoria.'
    
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors)
        } else {

          const promotion = {
            codigoPromocion: promotionCode,
            descripcion: description,
            descuento: Number(discount),
            fechaInicio: new Date(startDate),
            fechaFin: new Date(endDate),
            estado: true
          }
          await createPromotion(promotion)
          setOpen(false)
          onUpdate()
        }
    }
  
    return (
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen} sx={{marginRight: '2%', backgroundColor: 'white',borderColor: 'white',color: 'secondary.main',
          '&:hover': {
            backgroundColor: 'secondary.light', // Cambia este color
            borderColor: 'secondary.light',
            color: 'white', // Cambia el color del texto si quieres
          },
        }}>
            Crear Promocion
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
                }}>{"Crear Promociones"}
          </DialogTitle>
          <DialogContent>
           <Box sx={{marginTop: '10px'}} >
              <form autoComplete='off' style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <TextField
                    sx={{ width: '100%'}}
                    fullWidth
                    label='Codigo Promocion'
                    type='text'
                    value={promotionCode} // Estado del campo de mensaje
                    onChange={e => setPromotionCode(e.target.value)}
                    error={Boolean(errors.promotionCode)} // Marca como error si hay un mensaje
                    helperText={errors.promotionCode} // Muestra el mensaje de error
                    />

                    <TextField
                    sx={{ width: '100%'}}
                    fullWidth
                    label='Descripcion'
                    multiline
                    rows={4}
                    type='text'
                    value={description} // Estado del campo de mensaje
                    onChange={e => setDescription(e.target.value)}
                    error={Boolean(errors.description)} // Marca como error si hay un mensaje
                    helperText={errors.description} // Muestra el mensaje de error
                    />

                    <Box sx={{display: 'flex', flexDirection: 'row', gap: 1}}>
                        <TextField
                            sx={{ width: '100%'}}
                            fullWidth
                            label='Descuento'
                            type='text'
                            value={discount} // Estado del campo de mensaje
                            onChange={e => setDiscount(e.target.value)}
                            error={Boolean(errors.discount)} // Marca como error si hay un mensaje
                            helperText={errors.discount} // Muestra el mensaje de error
                        />

                        <TextField
                            sx={{ width: '100%'}}
                            fullWidth
                            label='Fecha de Inicio'
                            type='date'
                            value={startDate} // Estado del campo de mensaje
                            onChange={e => setStartDate(e.target.value)}
                            error={Boolean(errors.startDate)} // Marca como error si hay un mensaje
                            helperText={errors.startDate} // Muestra el mensaje de error
                            InputLabelProps={{
                                shrink: true, // Asegura que la etiqueta no se superponga con el valor
                            }}
                        />

                       
                    </Box>
                    
                    <Box sx={{display: 'flex', flexDirection: 'row', gap: 1}}> 

                        <TextField
                            sx={{ width: '100%'}}
                            fullWidth
                            label='Fecha de Fin'
                            type='date'
                            value={endDate} // Estado del campo de mensaje
                            onChange={e => setEndDate(e.target.value)}
                            error={Boolean(errors.endDate)} // Marca como error si hay un mensaje
                            helperText={errors.endDate} // Muestra el mensaje de error
                            InputLabelProps={{
                                shrink: true, // Asegura que la etiqueta no se superponga con el valor
                            }}
                        />
                    </Box>
                    <Box sx={{width: '100%',display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                      <Button variant="contained" color ='secondary' sx={{textAlign:'center'}} onClick={handleCreate}>
                        Crear
                      </Button>
                    </Box>
             </form>
           </Box>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
}