'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';;
import DialogContent from '@mui/material/DialogContent';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import CachedIcon from '@mui/icons-material/Cached';
import { Box, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import {useState, useEffect } from "react"
import { getUsersId, updateUser } from '@/service/UserService';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface FormErrors {
    email?: string
    password?: string
    name?: string
    phone?: string
    address?: string
    surnames? : string
}

type UserDialogProps = {
  id: number;
  onUpdate: () => void;
};

export function UserDialog({id, onUpdate}: UserDialogProps) {

  
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [surnames, setSurnames] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [errors, setErrors] = useState<FormErrors>({})
    const [isPasswordShown, setIsPasswordShown] = useState(false)
    const [rol, setRol] = React.useState('');
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleChange = (event: SelectChangeEvent) => {
        setRol(event.target.value as string);
    };
    

    const handleClickShowPassword = () => setIsPasswordShown(show => !show)

    const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
    
        const newErrors: FormErrors = {}
    
        if (!email) {
          newErrors.email = 'El correo electrónico es obligatorio.'
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          newErrors.email = 'El correo electrónico no es válido'
        }

        if (!name){newErrors.name = 'El nombre es obligatorio.'}

        if(!surnames){newErrors.surnames = 'El apellido es obligatorio'}
        if(!phone){newErrors.phone = 'El telefono es obligatorio'}
        if(!address){newErrors.address = 'Direccion obligatoria'}
    
        if (!password) newErrors.password = 'La contraseña es obligatoria.'
    
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors)
        } else {

          const user = {
            nombres: name,
            apellidos:surnames,
            telefono:phone,
            direccion:address,
            rolUsuario: rol,
            correo:email,
            contraseña: password
          }
          await updateUser(id,user);
          setOpen(false)
          onUpdate()
        }
    }

    useEffect(() =>{
      const getUser = async () =>{
        const user =  await getUsersId(id)
        console.log(user)
        if(user){
          setEmail(user.correo)
          setAddress(user.direccion)
          setName(user.nombres)
          setPassword(user.contraseña)
          setPhone(user.telefono)
          setRol(user.rolUsuario)
          setSurnames(user.apellidos)
        }
        
      }
      getUser()
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
                }}>{"Actualizar Usuarios"}
          </DialogTitle>
          <DialogContent>
           <Box sx={{marginTop: '10px'}}>
            <form autoComplete='off' style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <TextField
                    sx={{ width: '100%'}}
                    fullWidth
                    label='Nombres'
                    type='text'
                    value={name} // Estado del campo de mensaje
                    onChange={e => setName(e.target.value)}
                    error={Boolean(errors.name)} // Marca como error si hay un mensaje
                    helperText={errors.name} // Muestra el mensaje de error
                    />

                    <TextField
                    sx={{ width: '100%'}}
                    fullWidth
                    label='Apellidos'
                    type='text'
                    value={surnames} // Estado del campo de mensaje
                    onChange={e => setSurnames(e.target.value)}
                    error={Boolean(errors.surnames)} // Marca como error si hay un mensaje
                    helperText={errors.surnames} // Muestra el mensaje de error
                    />

                    <Box sx={{display: 'flex', flexDirection: 'row', gap: 1}}>
                        <TextField
                            sx={{ width: '100%'}}
                            fullWidth
                            label='Email'
                            type='email'
                            value={email} // Estado del campo de mensaje
                            onChange={e => setEmail(e.target.value)}
                            error={Boolean(errors.email)} // Marca como error si hay un mensaje
                            helperText={errors.email} // Muestra el mensaje de error
                        />

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={rol}
                                label="Age"
                                onChange={handleChange}
                            >
                            <MenuItem value='USER'>USER</MenuItem>
                            <MenuItem value='ADMIN'>ADMIN</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    
                    <Box sx={{display: 'flex', flexDirection: 'row', gap: 1}}>

                        <TextField
                        fullWidth
                        value={password}
                        label='Contraseña'
                        onChange={e => setPassword(e.target.value)}
                        id='outlined-adornment-password'
                        type={isPasswordShown ? 'text' : 'password'}
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                size='small'
                                edge='end'
                                onClick={handleClickShowPassword}
                                onMouseDown={e => e.preventDefault()}
                                >
                                {isPasswordShown ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            </InputAdornment>
                            )
                        }}
                        />

                        <TextField
                            sx={{ width: '100%'}}
                            fullWidth
                            label='Telefono'
                            type='number'
                            value={phone} // Estado del campo de mensaje
                            onChange={e => setPhone(e.target.value)}
                            error={Boolean(errors.phone)} // Marca como error si hay un mensaje
                            helperText={errors.phone} // Muestra el mensaje de error
                        />
                    </Box>
                    <TextField
                        sx={{ width: '100%'}}
                        fullWidth
                        label='Dirección'
                        type='text'
                        value={address} // Estado del campo de mensaje
                        onChange={e => setAddress(e.target.value)}
                        error={Boolean(errors.address)} // Marca como error si hay un mensaje
                        helperText={errors.address} // Muestra el mensaje de error
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