import React ,{ useEffect, useState } from 'react';
import axios from 'axios';
import { CryptoState } from '../CryptoContext';
import { HistoricalChart } from '../config/api';
import './CoinInfo.css';
import { Line } from 'react-chartjs-2';
import SelectButton from '../Components/SelectButton';
import { Chart as ChartJS, LineElement, LineController,  PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import { chartDays } from '../config/data';
import { ThemeProvider, createTheme ,CircularProgress } from '@mui/material';

 
const CoinInfo = ( {coin} ) => {

    const [historicalData, setHistoricalData] = useState();
    const [days, setDays] = useState(1);

    const { currency } = CryptoState();
    const [flag, setFlag] = useState(false);

    const darkTheme = createTheme({
   palette: {
      mode:"dark",
      
   }
   });
   
    const fetchHistoricalData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id , days, currency));
        setHistoricalData(data.prices);
    }

    
    useEffect(() => {
        fetchHistoricalData();
       
    }, [currency]);

    ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

    return (
        <ThemeProvider theme={darkTheme}>
            <div className="Container">
                {!historicalData ? (
                    <CircularProgress 
                    style={{ color:"gold" }}
                    size={250}
                    thickness={1}
                    />

                ) : (
                    <>
                       <Line
                       data = {{
                           labels: historicalData.map((coin) => {
                                let date = new Date(coin[0]);
                                let time = 
                                date.getHours() > 12
                                ? `${date.getHours()-12}:${date.getMinutes()} PM  `
                                : `${date.getHours()}:${date.getMinutes()} AM `;

                                return days===1 ? time : date.toLocaleDateString();  
                           }),

                           datasets: [
                               { 
                                    label: `  Price ( Past ${days} Days ) in ${currency}`,
                                    data: historicalData.map((coin) => coin[1]),
                                    borderColor: "#EEBC1D", 
                                },
                        ],
                       }}
                       options={{
                        responsive: true,
                           elements:{
                               point: {
                                   radius: 1,
                               },
                           },
                           plugins: {
                               legend: {
                                   display: true,
                               },
                           },
                       }}
                       />

                      <div style={{
                          display: "flex",
                          justifyContent: "space-around",
                          width: "100%",
                          marginTop: 20,
                      }}> 
                      
                        {chartDays.map((day) => (
                            <SelectButton
                            key={day.value}
                            onClick={() => setDays(day.value)}
                            selected={day.value === days} 
                            >
                                {day.label}
                            </SelectButton>
                        ))} 
                      
                      </div>
                     </> 
                )}
            </div>
        </ThemeProvider>
    );
};

export default CoinInfo;
