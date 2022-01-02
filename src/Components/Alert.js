import React from 'react';
import MuiAlert from '@mui/material/Alert';
import { CryptoState } from '../CryptoContext';
import { Snackbar } from '@mui/material';

const Alert = () => {

    const { alert, setAlert } = CryptoState();

   

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setAlert({open: false});
    };

    

    return (
        <Snackbar 
        anchorOrigin={{
            vertical:"top",
            horizontal: "center",
        }}
        open={alert.open} 
        autoHideDuration={3000} 
        onClose={handleClose}>
        <MuiAlert
        onClose={handleClose}
        elevation={10}
        variant="filled"
        severity={alert.type}
        >
        {alert.message}
        </MuiAlert>
      </Snackbar>
    )
}

export default Alert;
