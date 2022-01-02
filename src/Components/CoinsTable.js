import React, { useState ,useEffect } from 'react';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import {numberWithCommas} from '../Banner/Carousel';
import { 
    ThemeProvider , 
    createTheme, 
    Container, 
    Typography, 
    TextField, 
    TableContainer , 
    LinearProgress,
    TableHead,
    TableCell,
    TableRow,
    Table,
    TableBody,
    Pagination,
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import '../Components/CoinTable.css';

const CoinsTable = () => {

    const navigate = useNavigate();

    const { currency, symbol, Coins, loading, fetchCoins } = CryptoState();

 
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1)

   
    // console.log(Coins);

    useEffect(() => {
       fetchCoins();
      
    }, [currency]);

     const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    

    const handleSearch = () => {
        return Coins.filter(
            (Coin) => 
            Coin.name.toLowerCase().includes(search) || 
            Coin.symbol.toLowerCase().includes(search)
        // console.log(Coins);
        
        );
    };

    


    return (
            <Container style={{ textAlign:"center" }}>
                <Typography
                variant="h4"
                style={{ 
                    margin: 25, 
                    fontFamily: "Montserrat", 
                    }}    
                >
                    CryptoCurrency Prices by Market Cap
                </Typography>

            <ThemeProvider theme={darkTheme}>
                <TextField
                   label="Search for Crypto Currency.."
                   variant= "outlined"
                   onChange={(e) => setSearch(e.target.value)}
                   style={{ marginBottom: 20 , width:"100%" }}
                />

                <TableContainer >
                    {
                        loading ? (
                            <LinearProgress style={{ backgroundColor: "gold" }} />
                        ): (
                                <Table >
                                    <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                                        <TableRow>
                                        {
                                            ["Coin" , "Price" , "24h Change" , "Market Cap "].map((head) => (

                                            <TableCell
                                            style={{
                                                color: "black",
                                                fontWeight: "700",
                                                fontFamily: "Montserrat",
                                            }}
                                            key={head}
                                            align={head === "Coin" ? "" : "right"}
                                            >
                                                {head}        
                                            </TableCell>
                                        ))
                                        }
                                        </TableRow>
                                    </TableHead>
                                    
                                        <TableBody>
                                           {handleSearch()
                                           .slice((page-1)*10, (page-1)*10 + 10)
                                           .map((row) => {
                                                let profit = row.price_change_percentage_24h >= 0; 

                                               return (
                                                   <TableRow
                                                    onClick={() => navigate(`/coins/${row.id}`)}
                                                    className="row"
                                                    key={row.name}
                                                    style={{ cursor: "pointer", 
                                                       "&:hover" : {
                                                           backgroundColor: "#fff",
                                                       }
                                                     }}
                                                   >
                                                        <TableCell component="th" scope="row"
                                                        style={{
                                                            display: "flex",
                                                            gap: 15,
                                                        }}
                                                        >
                                                        
                                                            <img 
                                                            src={row?.image} 
                                                            alt={row.name}
                                                            height="50"
                                                            style={{ marginBottom: 10 }}
                                                            
                                                            />  

                                                            <div 
                                                            style={{
                                                                display: "flex",
                                                                flexDirection: "column",

                                                            }}
                                                            >

                                                            <span
                                                            
                                                            style={{
                                                                textTransform: "uppercase",
                                                                fontSize: 22,
                                                                color: "white",
                                                            }}
                                                            >
                                                            
                                                                {row.symbol}  

                                                            </span>    

                                                            <span style={{ color: "darkgrey"}}>{row.name}</span>                 
                                                            </div>                                                              
                                                        </TableCell>

                                                        <TableCell align="right" style={{ color: "white" }}>
                                                            {symbol}{" "}
                                                            {numberWithCommas(row.current_price.toFixed(2))}
                                                        </TableCell>

                                                        <TableCell align="right" style={{
                                                             color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                             }}
                                                             >
                                                             {profit && "+"}{row.price_change_percentage_24h?.toFixed(2)}%
                                                                                  
                                                        </TableCell>

                                                        <TableCell align="right" style={{ color:"white" }}>
                                                            {numberWithCommas(row.market_cap?.toFixed(2))}

                                                        </TableCell>
                                                    
                                                   </TableRow>         
                                               );
                                               })
                                            }

                                        </TableBody>
                                </Table>   
                        )
                    }
                </TableContainer>
                
       </ThemeProvider>
                <Pagination
                className="pagination"
                style={{
                    padding: 20,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    
                }}
                count={(handleSearch()?.length / 10).toFixed(0)}
                onChange={(_, value) => {
                    setPage(value);
                    window.scroll(0,450);
                }}
                />
              

            </Container>
    )
}

export default CoinsTable;
