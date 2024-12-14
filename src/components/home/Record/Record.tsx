'use client'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, Card, CardContent, Divider, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material"
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from "react"
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GoogleIcon from '@mui/icons-material/Google';
import { UserDtoUpdate } from '@/model/UserDtoUpdate';
import { createUser } from '@/service/UserService';

interface FormErrors {
    email?: string
    password?: string
    name?: string
    phone?: string
    address?: string
    surnames? : string
}

export const Record =() => {
    
    const router = useRouter();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [surnames, setSurnames] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [errors, setErrors] = useState<FormErrors>({})
    const [isPasswordShown, setIsPasswordShown] = useState(false)

    const handleClickShowPassword = () => setIsPasswordShown(show => !show)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

          const user: UserDtoUpdate = {

            nombres: name,
            apellidos: surnames,
            correo: email,
            telefono: phone,
            direccion: address,
            rolUsuario: 'ADMIN',
            contraseña: password
          }

          const newUser =  await createUser(user)
          
          if(newUser){

            if (typeof window === "undefined") return;
            
            router.push('/general')
          }
        }
      }

    return(
        <Box
            sx={{
              display: 'flex',
              backgroundImage: {
                xs: 'url("https://i.pinimg.com/originals/7d/7c/00/7d7c00adb02f09ea74928b8c8502c5fb.png")', // Imagen para pantallas pequeñas
                md: 'url("https://img.remediosdigitales.com/caf69c/audi-tt_rs_roadster-2017-1600-01/1366_2000.jpg")',  // Imagen para pantallas medianas y grandes
              },
              backgroundSize: 'cover',
              justifyContent: 'center',
              backgroundPosition: 'center',
              alignItems: 'center',
              height: '100vh', // Asegura que el contenedor ocupe toda la altura de la ventana
              width: '100vw', // Asegura que el contenedor ocupe todo el ancho
              position: 'relative',
              overflow: 'hidden',
           
            }}
          >
            <Card  
              sx={{
                display: 'flex',
                flexDirection: 'column',
                bgcolor:'#f1f1f1',
                width: '450px',
                boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.9)',
                   
              }}>
            <CardContent  sx={{
              padding:'2.5rem',
                 
            }}>
            
            <Box  
                sx={{
                    display: 'flex' ,
                    flexDirection: 'column',
                    gap: 2
                }} >
              <Box>
                <Typography variant='h4' sx={{ textAlign: 'center', fontWeight:800 }}>{`REGISTRO`}</Typography>
              </Box>
              <form autoComplete='off' onSubmit={handleSubmit}style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                <Box sx={{display: 'flex', flexDirection: 'row', gap: 1}}>

                    <TextField
                    fullWidth
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
                <Box  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.75rem 0.25rem', // gap-x-3 (1rem) y gap-y-1 (0.25rem)
                    flexWrap: 'wrap',
                }}>
                
                </Box>
                <Button fullWidth variant='contained' type='submit' sx={{bgcolor: '#000000', '&:hover': {
                  backgroundColor: '#1a1a1a', // Cambia este color
                  color: 'white', // Cambia el color del texto si quieres
                },}}>
                  Ingresar
                </Button>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center', // Alinea los elementos en el eje horizontal al centro
                    alignItems: 'center',      // Alinea los elementos en el eje vertical al centro
                    flexWrap: 'wrap',          // Permite que los elementos se ajusten en varias líneas si es necesario
                    gap: '0.5rem',             // Establece un espacio entre los elementos (gap-2 en Tailwind)
                  }}>
                  <Typography >¿Ya tienes una cuenta?</Typography>
                  <Typography component={Link} href='/' color='#8d8d8d' sx={{  textDecoration: 'none',}}>
                    Inicia sesión
                  </Typography>
                </Box>
                <Divider className='gap-3'>o</Divider>
                <Box  sx={{
                  display: 'flex',
                  justifyContent: 'center',  // Centra los elementos en el eje horizontal
                  alignItems: 'center',      // Centra los elementos en el eje vertical
                  gap: '0.5rem',             // Establece el espacio entre los elementos (gap-2 en Tailwind)
                }}>
                  <IconButton size='small' className='text-facebook'>
                    <FacebookRoundedIcon sx={{color: '#8d8d8d'}}/>
                  </IconButton>
                  <IconButton size='small' className='text-googlePlus'>
                    <GoogleIcon sx={{color: '#8d8d8d'}}/>
                  </IconButton>
                </Box>
              </form>
            </Box>
          </CardContent>
        </Card>
        
      </Box>
    )
}