import "./App.css";
import axios from "axios";
import { useRef, useState } from "react";
import icon from "./assets/clear_weather.png";
import { API_BASE_URL, API_ERR, WEATHER_API_KEY } from "./config/";

const App = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const searchInputRef = useRef(null);

  const getWeatherData = async () => {
    setIsLoading(true);
    setError("");
    const API = `${API_BASE_URL}?q=${searchInputRef.current.value}&appid=${WEATHER_API_KEY}`;
    try {
      const res = await axios.get(API);
      setData(res.data);
      setIsLoading(false);
    } catch (err) {
      if (err.code === API_ERR.code) {
        setIsLoading(false);
        setError(API_ERR.msg);
      }
    }
  };

  return (
    <div className="page-container">
      <h1 className="heading">Weather App</h1>
      <div className="searchContainer">
        <input type="text" ref={searchInputRef} placeholder="Search..." />
        <button
          type="button"
          onClick={() => searchInputRef.current.value && getWeatherData()}
        >
          Search
        </button>
      </div>
      {isLoading ? (
        <div className="messageBox">
          <h1 className="message">Loading...</h1>
        </div>
      ) : error ? (
        <div className="messageBox">
          <h1 className="message">{error}</h1>
        </div>
      ) : Object.keys(data).length > 0 ? (
        <div className="wetherResultContainer">
          <div>
            <div className="imageContainer">
              <img src={icon} className="weatherIcon" alt="weatherLogo" />
            </div>
            <div className="detailsContainer">
              <h5 className="weatherCity">{data?.name}</h5>
              <h6 className="weatherTemp">
                {(data?.main?.temp - 273.15).toFixed(2)}°C
              </h6>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default App;
