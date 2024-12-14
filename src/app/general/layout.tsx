
import { Footer } from "@/components/general/Footer";
import { ResponsiveAppBar } from "@/components/general/ResponsiveAppBar";
import { Box } from "@mui/material";
import React from "react";

export default function Layout({children}: {children: React.ReactNode}){

    return (

        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            bgcolor: '#2f3742',
            minHeight: '100vh' // Asegura que el contenedor ocupe toda la altura de la ventana
          }}>
            <ResponsiveAppBar/>
            <Box sx={{ flex: 1}}>
                {children}
            </Box>
            <Footer/>
        </Box>
    )
}
