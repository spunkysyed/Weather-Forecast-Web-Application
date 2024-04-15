import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa6";
import Map from "./Map";
import { useNavigate } from "react-router-dom";

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
  };
  coord: {
    lat: number;
    lon: number;
  };
  sys: {
    country: string;
  };
}

export const WeatherPage: React.FC = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [units, setUnits] = useState("metric");
  const navigate = useNavigate();

  const api_key = "8a0de69d15760ffa6f0a611f238123d5";

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${api_key}`
        );
        const data: WeatherData = await response.data;
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        navigate(`/error/${404}/${"Error While Fetching API"}`);
      }
    };

    fetchWeatherData();
  }, [cityName, units,navigate]);

  if (!weatherData) {
    return <div>Failed to fetch weather data.</div>;
  }

  const { main, weather, wind, coord, sys } = weatherData;

  let weatherImagePath = "";
  if (weather[0].description.includes("rain")) {
    weatherImagePath = "/images/rain.jpg";
  }if (weather[0].description.includes("cloudy")) {
    weatherImagePath = "/image/cloudy.jpg";
  }if (weather[0].description.includes("haze")) {
    weatherImagePath = "/images/haze.jpg";
  }if (weather[0].description.includes("mist")) {
    weatherImagePath = "/images/mist.jpg";
  }if (weather[0].description.includes("thunder")) {
    weatherImagePath = "/images/thunder.jpg";
  }if (weather[0].description.includes("fog")) {
    weatherImagePath = "/images/fog.jpg";
  }if (weather[0].description.includes("cloud")) {
    weatherImagePath = "/images/cloud.jpg";
  }if (weather[0].description.includes("overcast")) {
    weatherImagePath = "/images/overcast.jpg";
  }else {
    weatherImagePath = "/images/clear.jpg";
  }

  let tempUnit: string;
  if (units === "metric") {
    tempUnit = "°C";
  } else if (units === "imperial") {
    tempUnit = "°F";
  } else {
    tempUnit = "K";
  }

  let speedUnit: string;
  if (units === "imperial") {
    speedUnit = "mph"; // Corrected here
  } else {
    speedUnit = "m/s";
  }

  return (
    <div className="w-full h-screen bg-zinc-200 flex flex-col justify-center items-center font-mono relative">
      
      <img
        src={weatherImagePath}
        alt={weatherImagePath}
        className="w-full h-full absolute z-0"
      />
      <div className="w-3/4 md:h-3/5 rounded-3xl flex flex-col items-center text-center absolute z-10 backdrop-blur-sm text-white">
        <div className="w-full h-full flex flex-col md:flex-row rounded-3xl">
          <div className="w-full md:w-2/4 pb-4 flex flex-col items-center justify-center">
            <h1 className="text-5xl md:text-4xl font-bold mb-4 uppercase mt-5 ">
              {cityName},{sys.country}
            </h1>
            <div>
              <div>
                <div className="mt-12">
                  <h1 className="text-9xl">
                    {main.temp.toFixed()}
                    {tempUnit}
                  </h1>
                </div>
                <div className="capitalize text-4xl mt-2">
                  {weather[0].description}
                </div>
                <div className="w-full flex justify-between mt-20">
                  <div className="flex text-4xl">
                    <WiHumidity />
                    {main.humidity.toFixed()}%
                  </div>
                  <div className="flex text-4xl">
                    <FaWind />
                    {wind.speed.toFixed()}
                    {speedUnit}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Map lat={coord.lat} lon={coord.lon} />
        </div>
      </div>
      <div className="absolute bottom-5 z-10">
        <select
          name="metric_system"
          id="unit"
          className="border-none py-2 px-4 rounded-xl"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setUnits(e.target.value)
          }
        >
          <option value="metric">Metric</option>
          <option value="standard">Standard</option>
          <option value="imperial">Imperial</option>
        </select>
      </div>
    </div>
  );
};
