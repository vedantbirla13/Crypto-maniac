import './App.css';
import {  BrowserRouter  , Routes, Route } from 'react-router-dom';
// import { makeStyles } from '@mui/styles';
import Header from './Components/Header';
import Home from './Pages/Home';
import Coins from './Pages/Coins';
import Alert from './Components/Alert';

function App() {

  

  return (
    <div className='app'>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/coins/:id" element={<Coins />} />
      </Routes>
    <Alert />
    </BrowserRouter>
  </div>

  );
}

export default App;
