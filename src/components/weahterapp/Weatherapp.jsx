import { useState, useEffect } from "react";
import "./weatherapp.css";
import cloud from "../assets/cloud.png";
import searchimg from "../assets/search.png";
import drizzle from "../assets/drizzle.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import wind from "../assets/wind.png";
import humidity from "../assets/humidity.png";
import axios from "axios";

const Weatherapp = () => {
  const [searchval, setSearchval] = useState("Gulistan");
  const [weahetrdata, seTweatherdata] = useState();
  const api_key = "0c4bb56bc55aaa8de064cd8f2f6e3b61";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchval}&units=Metric&appid=${api_key}`;
  useEffect(() => {
    search();
  }, []);

  const search = () => {
    if (searchval === "") {
      return 0;
    }

    axios.get(url).then((response) => seTweatherdata(response.data));
    console.log(weahetrdata);
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          value={searchval}
          onInput={(e) => setSearchval(e.target.value)}
          className="city"
          placeholder="Search"
        />
        <div className="search" onClick={() => search()}>
          <img src={searchimg} alt="search" />
        </div>
      </div>
      <div className="weather-img">
        {weahetrdata ? (
          <img
            src={`http://openweathermap.org/img/wn/${weahetrdata.weather[0].icon}@4x.png`}
            alt="weahetrdata"
          />
        ) : (
          ""
        )}
      </div>
      <div className="element">
        <h1 style={{textAlign:'center'}}>{weahetrdata && weahetrdata.weather[0].main}</h1>
      <div className="temp-img">{weahetrdata ? weahetrdata.main.temp : ""}℃</div>
      <div className="location">{weahetrdata && weahetrdata.name}</div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidity} alt="humidity" />
          <div className="data">
            <div className="humidty">
              {weahetrdata && weahetrdata.main.humidity}%  <br /><span>Humidity</span>
            </div>
          </div>
        </div>  
        <div className="element">
          <img src={wind} alt="wind" />
          <div className="data">
            <div className="humidty">
              {weahetrdata && weahetrdata.wind.speed}km/h <br />
              <span> Wind speed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weatherapp;
