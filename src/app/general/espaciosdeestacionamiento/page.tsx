'use client'

import { ParkingSpacesCreateDialog } from "@/components/ParkingSpaces/ParkingSpacesCreateDialog";
import { TableSpaces } from "@/components/ParkingSpaces/TableSpaces";
import { ParkingSpaces } from "@/model/Parkingspaces";
import { getParkingSpaces } from "@/service/ParkingSpaces";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function EspaciosDeEstacionamiento() {

    const [parkingSpaces, setParkingSpaces] = useState<ParkingSpaces[]>([]);

    const fetchParkingSpaces = async () => {
            
        const data = await getParkingSpaces();
    
        if(!data){
            console.log('error')
        }

        setParkingSpaces(data)
        console.log(' se lanzo el metodo')
        console.log(data)
       
    }
            
    useEffect(() => {
        fetchParkingSpaces();
    }, []);

    return(

       <Box sx={{paddingTop: {md: '2%', xs: '7%'}, paddingRight:{xs: '10%', md: '10%'},paddingLeft: {xs: '10%', md: '10%'}, paddingBottom: '2%' }}>
            <Box sx={{width: '100%',display: 'flex', justifyContent: 'flex-end',marginBottom: '20px'}}>
            <ParkingSpacesCreateDialog onUpdate={fetchParkingSpaces}/>
            </Box>
            <TableSpaces parkingSpaces={parkingSpaces} onUpdate={fetchParkingSpaces}/>
        </Box>
    )
}