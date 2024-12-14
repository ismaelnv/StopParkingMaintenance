'use client'

import { PromotionsCreateDialog } from "@/components/Promotions/PromotionsCreateDialog";
import { PromotionsTable } from "@/components/Promotions/PromotionsTable";
import { Promotion } from "@/model/Promotion";
import { getPromotions } from "@/service/PromotionsService";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function Promociones() {

    const [promotions, setPromotions] = useState<Promotion[]>([]);
    
    const fetchPromotions = async () => {
        
        const data = await getPromotions();

        if(!data){
            console.log('error')
        }
        console.log(' se lanzo el metodo')
        console.log(data)
        setPromotions([...data]);
    }
        
    useEffect(() => {
        fetchPromotions();
    }, []);

    return(
        <Box sx={{paddingTop: {md: '2%', xs: '7%'}, paddingRight:{xs: '10%', md: '10%'},paddingLeft: {xs: '10%', md: '10%'}, paddingBottom: '2%' }}>
            <Box sx={{width: '100%',display: 'flex', justifyContent: 'flex-end',marginBottom: '20px'}}>
                <PromotionsCreateDialog onUpdate={fetchPromotions}/>
            </Box>
            <PromotionsTable promotions={promotions} onUpdate={fetchPromotions}/>
        </Box>
    )

}