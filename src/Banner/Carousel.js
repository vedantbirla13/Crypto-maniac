import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Carousel.css';
import { CryptoState } from '../CryptoContext';
import { TrendingCoins } from '../config/api';
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {

    const [trending, setTrending] = useState([])

    const { currency , symbol } = CryptoState()

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));

        setTrending(data);
    };

    // console.log(trending);
    

    useEffect(() => {
      fetchTrendingCoins();
        
    }, [currency]);

    const items = trending.map((coin) => {

        let profit = coin.price_change_percentage_24h >= 0;

        return (
            <Link className="carouselItem" to={`/coins/${coin.id}`}
            >

                    <img 
                        src={coin?.image}
                        alt={coin.name}
                        height="80"
                        style={{ margin: 10 }}
                    />

                    <span style={{ marginTop: 10 }}>
                    {coin?.symbol }
                        &nbsp;
                        <span style={{marginTop: 10 , 
                            color: profit > 0 ? "rgb(14,203,129" : "red"
                        }}>
                            {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
                        </span>

                        </span>
                        <span style={{ fontSize: 22, fontWeight: 500 }}>
                            {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                    </span>
            
            </Link>
        )
    })

    const responsive = {
        0: {
            items: 2,
        }, 
        512:{
            items: 4,
        }
    };

    return (
        <div className="carousel" style={{ marginTop: 20 }}>
            <AliceCarousel 
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                autoPlay
                items = {items}
            />
        </div>
    )
}

export default Carousel
