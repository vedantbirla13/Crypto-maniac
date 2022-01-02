import React from 'react';
import Drawer from '@mui/material/Drawer';
import { Avatar, Button  } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { CryptoState } from '../../CryptoContext.js';
import { signOut } from 'firebase/auth';
import { auth , db } from '../../firebase.js';
import {numberWithCommas} from '../../Banner/Carousel';
import { AiFillDelete } from 'react-icons/ai';
import { doc, setDoc } from 'firebase/firestore';


const useStyles = makeStyles({
    container: {

        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: 350,
        padding: 25,
        fontFamily: "monospace",
    },
    profile: {
        flex:1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        height: "92%",
    },
    picture: {
        width: 180,
        height: 180,
        cursor: "pointer",
        objectFir: "contain",
        backgroundColor: "#EEBC1D",
    },
    logout:{
        fontFamily: "Montserrat",
        letterSpacing: 0.5,
        height: "8%",
        marginTop: 20,
    },
    watchlist:{
        flex: 1,
        width: "100%",
        backgroundColor: "grey",
        borderRadius: 10,
        paddingTop: 10,
        padding: 15,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        overflowY: "scroll", 

    },
    coin:{
      padding: 10,
      borderRadius: 5,
      color: "black",
      width: "100%",
      display: "flex",
      justifyContent:"space-between",
      alignItems: "center",
      backgroundColor: "#EEBC1D",
      boxShadow: " 0 0 3px black",
    },
});


export default function UserSidebar() {
  
  const [state, setState] = React.useState({
    right: false,
  });
  
  const classes = useStyles();


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const { user  , setAlert ,Watchlist, Coins, symbol } = CryptoState();


  const logOut = () =>{
    signOut(auth);

    setAlert({
        open:true,
        message: "Logout Succesfull !!",
        type:'success',
      });
  };

  const removeFromWatchlist = async(coin) =>{
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
    <div>
      {[ 'right'].map((anchor) => (
        <React.Fragment key={anchor}>

          <Avatar 
        onClick={toggleDrawer(anchor, true)}
        style={{
            height: 38,
            width: 38,
            cursor: "pointer",
            backgroundColor: "#EEBC1D",

        }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
           <div className={classes.container}>
                <div className={classes.profile}>
                    <Avatar 

                        className={classes.picture}
                        src= {user.photoURL}
                        alt={user.displayName || user.email}
                    />

                    <span
                    style={{
                        width: "100%",
                        fontSize: 25,
                        textAlign: "center",
                        fontWeight: "bolder",
                        wordWrap: "break-word",
                    }}
                    >
                    {user.displayName || user.email}
                    </span>

                    <div className={classes.watchlist}>
                        <span style={{ fontSize: 15, textShadow: "0 0 5px black"  }}>
                            Watchlist
                        </span>

                        {Coins.map((coin) => {
                            if(Watchlist.includes(coin.id))
                            return (
                              
                              <div className={classes.coin}>
                                <span> { coin.name } </span>
                                <span style= {{ display: "flex", gap: 8 }}>
                                  {symbol}
                                  {numberWithCommas(coin.current_price.toFixed(2))}
                                </span>
                                <AiFillDelete 
                                  style={{ cursor: "pointer" }}
                                  fontSize= "16"
                                  onClick={()=> removeFromWatchlist(coin) }
                                />
                              </div> 
                          );
                        })
                        }
                    </div>
                </div>

                <Button
                variant="contained"
                className={classes.logout}
                onClick={logOut}
                style={{ backgroundColor: "#EEBC1D" }}
                >
                Logout
                </Button>
           </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}