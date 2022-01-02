import React from 'react';
import '../Components/Header.css';
import { useNavigate } from 'react-router-dom';
import { AppBar, Container, createTheme, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@mui/material';
import { CryptoState } from '../CryptoContext';
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';

const Header = () => {

    const {currency , setCurrency , user} = CryptoState();
    console.log(currency) ;

    let navigate = useNavigate();

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
        <div className="header">
        <AppBar color="transparent" position="static">
            <Container className="container">
                <Toolbar className = "header_body">
                    <Typography variant='h6' onClick={()=>  navigate("/") } className="header_title">
                      <span>Crypto Maniac</span>  
                    </Typography>
                    
                    <Select variant="outlined" style= {{
                        width: 100,
                        height: 40,
                        marginRight: 15,
                        
                    }}
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value) }
                    >

                        <MenuItem value={"INR"}>INR</MenuItem>
                        <MenuItem value={"USD"}>USD</MenuItem>


                    </Select>
                    { user ? <UserSidebar/> :  <AuthModal />}
                </Toolbar>
            </Container>

        </AppBar>
        </div>
    </ThemeProvider>
    )
}

export default Header;
