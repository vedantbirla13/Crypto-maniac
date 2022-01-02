import React from 'react';
import './banner.css';
import { Container , Typography } from '@mui/material';
import Carousel from '../Banner/Carousel';




const Banner = () => {

    return (
        <div className= "banner" >
             <Container className="bannerContent">
                <div className="tagline">
                    <Typography variant='h3' className="main_tagline" style={{
                        fontWeight: "bold",
                        marginBottom: 15,
                        fontFamily: "Montserrat",
                        color: "gold",
                        letterSpacing: 1,
                       
                    }} >
                      Crypto Maniac 
                    </Typography>

                    <Typography variant='subtitle2' style={{
                        textTransform: "capitalize",
                        fontFamily: "Montserrat",
                        color: "darkgrey",
                        marginBottom: 30,
                        
                    }} >
                      Get all the Info regarding your favourite crypto currency 
                    </Typography>
                </div>

                <Carousel/>
             </Container>
        </div>
    )
}

export default Banner;
