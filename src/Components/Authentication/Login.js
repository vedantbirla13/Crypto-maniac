import React, {useState} from 'react';
import {  Box } from '@mui/system';
import { TextField, Button } from '@mui/material';
import { CryptoState } from '../../CryptoContext';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';


const Login = ({ handleClose }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setAlert } = CryptoState();


    const handleSubmit = async() => {
      if(!email || !password){
          setAlert({
            open:true,
            message: "Please fill all the details",
            type:'error',
          });
        }

        try{
          const result = await signInWithEmailAndPassword( auth ,email, password);

           setAlert({
              open:true,
              message: `Login Successfull. Welcome ${result.user.email}`,
              type:'success',
            });
            handleClose(); 

        } catch (error) {

          setAlert({
              open:true,
              message: error.message,
              type:'error',
            });
        }
    };

    return (
        <Box 
        p={3}
        style={{ display: "flex" , flexDirection: "column" , gap: "20px" }}
      >

      <TextField
       variant="outlined"
       type="email"
        label="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />

       <TextField
       variant="outlined"
       type="password"
        label="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />

        <Button
        variant="contained"
        size="large"
        style={{ 
            backgroundColor: "#EEBC1D" , 
            fontFamily: "Montserrat", 
            letterSpacing: 0.5, 
        }}
        onClick={handleSubmit}
        >
            Login
        </Button> 

      </Box>
    )
}

export default Login;
