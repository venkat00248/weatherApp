/* eslint-disable no-unused-vars */
// App.js

import React, { useState } from 'react';
import { getWeatherData } from './WeatherService';
import { RippleLoader } from './Loader/RippleLoader';

function  WeatherComponent() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false)

  const fetchWeatherData = async () => {
    try {
      setLoading(true)
      const data = await getWeatherData(city);
      console.log("data", data)
      if(data){
        setLoading(false)
      }
      setWeatherData(data);
    } catch (error) {
      // Handle error
    }
  };
//   {
//     "temp": 282.61,
//     "feels_like": 279.62,
//     "temp_min": 280.32,
//     "temp_max": 282.61,
//     "pressure": 1021,
//     "sea_level": 1021,
//     "grnd_level": 1024,
//     "humidity": 75,
//     "temp_kf": 2.29
// }
  return (
    <div>
      <div className='dataWrapper'>
        <h4> Weather In your city</h4>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <br />
      <button onClick={fetchWeatherData}>Get Weather</button>
      </div>
     {loading && <RippleLoader/> }
      <div className='tableWrapper'>
     {weatherData.map((day, index) => (

        <table  key={index} className='custom-table'>
        <thead>
          <tr>
            <th colSpan="5">{`Date:${day.dt_txt}`}</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td colSpan="5">Temperature</td>
            </tr>
            <tr>
              <td >min</td>
              <td >max</td>
            </tr>
            <tr>
            <td>{day.main.temp_min}</td>
              <td>{day.main.temp_min}</td>
            </tr>
            <tr>
              <td>Pressure</td>
              <td>{day.main.pressure}</td>
            </tr>
            <tr>
              <td>Humidity</td>
              <td>{day.main.humidity}</td>
            </tr>
        </tbody>
      </table>
       ))}
</div>
    </div>
  );
}

export default WeatherComponent