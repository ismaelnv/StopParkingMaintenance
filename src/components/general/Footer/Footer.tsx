import { Box } from "@mui/material";
import Link from "next/link";

export function Footer() {
    return (
        <Box 
            sx={{
                display: 'flex',justifyContent: 'center', 
                alignItems: 'center', 
                bgcolor: '#000000',  // Fondo negro
                color: 'white',  // Texto blanco
                textAlign: 'center',  // Alineación del texto al centro
                width: '100%',  // Asegura que ocupe todo el ancho
                height: '100px'
            }}
        >
           
            <Box sx={{ display:'flex', height: '35px', width: '100vh', justifyContent: 'center' }}>
                <Link href='/general'>
                    <img src="https://www.stopparking.com.pe/wp-content/uploads/2023/08/cropped-cropped-logo_stop.png" alt="logo"
                    style={{ width: '270px', height: '100%' }} />
                </Link>
            </Box>
           
        </Box>
    );
}