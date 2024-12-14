import { Accountants } from "@/components/general/Accountants";
import { Box, Grid} from "@mui/material";

export default function General() {


    return(

        <Box sx={{paddingTop: '9%', paddingRight:{xs: '10%', md: '10%'},
            '@media (max-width: 1257px)': {paddingRight: 0,paddingLeft:0}, 
            paddingLeft: {xs: '10%', md: '10%'}, paddingBottom: '9%'}}>
            <Grid container spacing={1}  justifyContent="center"  // Centra horizontalmente
                alignItems="center">
                <Grid item xs={12} md={3}>
                <Accountants image="https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                    amount={100} qualification="Usuarios" />
                </Grid>
                <Grid item xs={12} md={3}>
                <Accountants image="https://static.vecteezy.com/system/resources/previews/020/980/428/original/car-parking-icon-parking-space-and-traffic-sign-parking-location-isolated-illustration-vector.jpg"
                    amount={80} qualification="Aparcamiento" />
                </Grid>
                <Grid item xs={12} md={3}>
                <Accountants image="https://png.pngtree.com/png-clipart/20200225/original/pngtree-promotion-icon-png-image_5282820.jpg"
                    amount={10} qualification="Promociones " />
                </Grid>
            </Grid>
        </Box>
    )
        
       
}