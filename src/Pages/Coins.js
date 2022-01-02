import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import { SingleCoin } from '../config/api';
import axios from 'axios';
import CoinInfo from '../Components/CoinInfo';
import './Coins.css';
import {numberWithCommas} from '../Banner/Carousel';
import parse from 'html-react-parser';
import { Typography, LinearProgress, Button } from '@mui/material';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase.js';


const Coins = () => {

    
    const { id } = useParams();
    const [coin, setCoin] = useState();
    const { currency, symbol ,user , setAlert, Watchlist } = CryptoState();
    
    const fetchCoin = async() => {
        const { data } = await axios.get(SingleCoin(id));

        setCoin(data);
    }
    
    // console.log(coin);
    
    
    useEffect(() => {
        fetchCoin();
        
    }, []);

    const inWatchlist = Watchlist.includes(coin?.id);

    if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />

    const addToWatchlist = async () =>{
        const coinRef = doc(db ,"Watchlist" , user.uid);
        try{
            await setDoc(coinRef , {
                    coins:Watchlist ? [...Watchlist , coin?.id]: [coin?.id],
            });

                setAlert({
                    open:true,
                    message: `${coin.name} added to the watchlist `,
                    type:'success',
                  });

        }catch(error){

            setAlert({
                open:true,
                message: error.message,
                type:'error',
              });
        }
    };

    const removeFromWatchlist = async() =>{
        const coinRef = doc(db ,"Watchlist" , user.uid);

        try{
            await setDoc(
                coinRef, 
                {
                    coins: Watchlist.filter((watch) => watch !== coin?.id),
                },
                {merge: "true"}
            );

            setAlert({
                open:true,
                message: `${coin.name} removed from the watchlist `,
                type:'success',
              });

        }catch(error){

            setAlert({
                open:true,
                message: error.message,
                type:'error',
              });
        }
    }


    return (
        <div className="container">
            <div className="sidebar">
              
                <img 
                    src={coin?.image.large}
                    alt={coin?.name}
                    height= "200"
                    style= {{ marginBottom: 20 }}
                />

                <Typography variant="h3" className="heading" style= {{
                    fontFamily: "Montserrat",
                    fontWeight: "bold",
                    marginBottom: 15,
                    color: "gold",
                }}>
                        {coin?.name}
                </Typography>
                <Typography variant="subtitle1" className="description" style={{
                         width:"100%",
                        fontFamily: "Montserrat",
                        padding: 25,
                        paddingBottom: 15,
                        paddingTop: 0,
                        textAlign: "justify",
                        color: "lightgrey",
                }}>
                        {parse(coin?.description.en.split(". ")[0])}.
                </Typography>

                <div className="market_data" style={{
                     display: "flex", 
                     
                     }}>
                
                <span style={{ display: "flex" , marginBottom: 5}}>
                    <Typography variant="h5" className="heading" style={{
                    fontFamily: "Montserrat",
                    fontWeight: "bold",
                }}>
                    Rank:
                </Typography>
                &nbsp; &nbsp;

                <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
                    {coin?.market_cap_rank}
                </Typography>

               
                </span>    

                <span style={{ display: "flex" , marginBottom: 5 }}>
                    <Typography variant="h5" className="heading" style={{
                    fontFamily: "Montserrat",
                    fontWeight: "bold",
                }}>
                    Current Price:
                </Typography>
                &nbsp; &nbsp;

                 <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
                    {symbol}{" "}
                    {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
                </Typography>

               
                </span>    

                <span style={{ display: "flex" , marginBottom: 5 }}>
                    <Typography variant="h5" className="heading" style={{
                    fontFamily: "Montserrat",
                    fontWeight: "bold",
                }}>
                    Market Cap:{" "} 
                </Typography>
                &nbsp; &nbsp;

                 <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
                   {symbol}{" "}
                   {numberWithCommas(
                       coin?.market_data.market_cap[currency.toLowerCase()]
                       .toString()
                       .slice(0,-6)
                   )}
                </Typography>
               
                </span>    
                    
                </div>
                   
                    { user && (
                        <Button variant="outlined"  onClick={ inWatchlist ? removeFromWatchlist : addToWatchlist }
                        style={{
                            width: "85%",
                            height: 40,
                            backgroundColor:inWatchlist ? "#ff0000" : "#EEBC1D",
                            color: "black",
                            fontFamily: "Montserrat",
                            letterSpacing: 0.5,
                            display: "Flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginBottom: 10,
                        }}>
                            { inWatchlist? "Remove from watchlist" :  "Add to Watchlist"}
                        </Button>

                    )} 
                    
            </div>

            {/* chart */}

            <CoinInfo coin={coin} />
        </div>
    )
}

export default Coins;
