import React, { useState } from 'react';
import { WiThermometerExterior, WiThermometer } from 'react-icons/wi';
const api = {
  key: "0bcd431cd5f0512ba5622b80d2edf52a",
  base: "https://api.openweathermap.org/data/2.5/" 
}


function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});


  const search = evt => {
    if(evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('');

        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "Agust", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturady"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") 
      ? ((weather.main.temp > 16 )
        ? 'app warm'
        :'app') 
      : 'appp'}>
    
      <main>    
      <div className="search-box">
        <input type="text" 
          className="search-bar" 
          placeholder="Search" 
          onChange={ e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}>

        </input>
      </div>
      {(typeof weather.main != "undefined") ? (
      <div>
        <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">{Math.round(weather.main.temp)}°C</div>
          <div className="weather">{weather.weather[0].main}</div>
          <div className="icon">{(typeof weather.main.temp!= "undefined") 
            ? ((weather.main.temp > 20 )
              ? <h2><WiThermometer /></h2>
              : <h1><WiThermometerExterior /></h1>) 
            : <h1><WiThermometerExterior /> </h1>}</div>
          
         
        </div>
      </div>
      ) : ('')}
      </main>
    </div>
    
    
  );

      }

export default App;
