import React from 'react';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import CityTable from './components/CityTable';
import { WeatherPage } from './components/WeatherPage';
import { Error } from './components/Error';

function App() {
  return (
    
    <Router>
        <Routes>
        <Route path="/" element={<CityTable />} /> 
        <Route path="/weather/:cityName" element={<WeatherPage />} /> 
        <Route path="/error/:code/:errMessage" element={<Error />} /> 
        </Routes>
    </Router>
  );
}

export default App;
