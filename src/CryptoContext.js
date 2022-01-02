import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { CoinList } from './config/api';
import { auth ,db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';




const Crypto = createContext();

const CryptoContext = ({ children }) => {

    const [currency , setCurrency] = useState("INR");
    const [symbol , setSymbol] = useState("₹");
    const [Coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [alert, setAlert] = useState({
        open:false,
        message:"",
        type: 'success',
    });
    const [Watchlist , setWatchlist] = useState([]);

    

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));

        setCoins(data);
        setLoading(false);
    }

    useEffect(() => {
        if(currency === "INR") setSymbol("₹");
        else if(currency === "USD") setSymbol("$");

    }, [currency]);

    useEffect(() => {
        onAuthStateChanged(auth , user=> {
            if(user) setUser(user);
            else setUser(null);

        });
    } ,[]);

    useEffect(() => {
        if (user) {
            const coinRef = doc(db ,"Watchlist" , user.uid);

           var unsubscribe =  onSnapshot(coinRef ,(coin) => {
                if(coin.exists()){
                    setWatchlist(coin.data().coins);
                }else{
                    console.log("No item in the watchlist");
                }
            });
            return () => {
                unsubscribe();  
            };
        }
    },[user])

    return (

        <Crypto.Provider value={{currency , symbol, setCurrency, Coins, loading, fetchCoins, alert, setAlert ,user, Watchlist  }}>
            {children}
        </Crypto.Provider>


    )
}

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);
} 
