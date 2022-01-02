import React, { useState } from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { AppBar, Button, Tab, Tabs } from '@mui/material';
import Login from './Login';
import SignUp from './SignUp';
import { GoogleButton } from 'react-google-button';
import { makeStyles } from '@mui/styles'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase.js';
import { CryptoState } from '../../CryptoContext';


const useStyles = makeStyles({
  google:{
    padding: 24,
    paddingTop: 0,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 20,
    fontSize: 20,
  },
});

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 10,
  color: 'white',
  borderBottom: 1, 
  borderColor: 'divider',
 
};

export default function AuthModal() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState(0);

  const { setAlert } = CryptoState();

    const handleChange = (event, newValue) => {
    setValue(newValue);
    };

    const googleProvider = new GoogleAuthProvider();

    const SignInWithGoogle = () =>{
      signInWithPopup(auth , googleProvider).then(res =>{

        setAlert({
          open:true,
          message: `Login Successfull. Welcome ${res.user.email}`,
          type:'success',
        });
        handleClose(); 

      }).catch(error => {
        setAlert({
          open:true,
          message: error.message,
          type:'error',
        });
      })
    }

   

  return (

    <div>
        
    <Button onClick={handleOpen} variant="contained" style= {{
        width: 85,
        height: 40,
        backgroundColor:"#EEBC1D",
        fontFamily: "Montserrat",
        color: "white",
    }}> 
    Login
    </Button>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
        <AppBar position='static' style={{
            backgroundColor:"transparent" , color:"white",
        }}>
            <Tabs value={value} onChange={handleChange} style={{ borderRadius: 10 }}>
                <Tab label="Login"  />
                <Tab label="Sign Up" />
            </Tabs>

        </AppBar>

              {value === 0 && <Login handleClose={handleClose} />}
              {value === 1 && <SignUp handleClose={handleClose} />}

              <Box className={classes.google}>
              <span>OR</span>
                <GoogleButton 
                  style= {{ width: "100%" , outline: "none" }}
                  onClick={SignInWithGoogle}
                />
              </Box>

        </Box>
      </StyledModal>
    </div>
  );
}