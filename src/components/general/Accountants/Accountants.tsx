'use client'
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

interface CounterAttributes{

    image: string,
    amount: number,
    qualification:string
}

export function Accountants({image, amount, qualification}: CounterAttributes) {

    const [startCounting, setStartCounting] = useState(false);

    // Disparar el contador al cargar la página
    useEffect(() => {
        setStartCounting(true);
    }, []);

    return (
        <Card sx={{ width: 250, height: 350, margin: '0 auto', borderRadius: 3, marginTop: '20px', bgcolor: '#ffffff',
        boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.9)', }}>
            <Box sx={{ display: 'flex',justifyContent: 'center', paddingTop: '20px'}}>
                <Box
                    sx={{ height: '130px', width: '130px',}}
                >
                    <CardMedia
                        component="img"
                        sx={{
                            maxHeight: '100%', // La altura de la imagen se adapta al contenedor
                            maxWidth: '100%', // El ancho de la imagen se adapta al contenedor
                            objectFit: 'contain', // Mantiene la imagen completa dentro del contenedor
                        }}
                        image={image}
                    />
                </Box>
        </Box>
            <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ marginTop: '10px', fontSize: '3rem', color: '#2f3742' }}>
                <CountUp start={0} end={amount} duration={3} startOnMount={startCounting} />
            </Typography>
            <Typography variant="body1" sx={{ textTransform: 'uppercase', marginTop: '10px', fontWeight: 800, fontSize: 25, color: '#2f3742' }}>
                {qualification}
            </Typography>
            </CardContent>
        </Card>
  
    );
}