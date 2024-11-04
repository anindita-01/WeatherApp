"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoCloudSharp } from "react-icons/io5";
import { GiHeatHaze } from "react-icons/gi";
import { FaSmog } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";

export default function Home() {
  const [place, setPlace] = useState("Delhi");
  const [placeData, setPlaceData] = useState<any>(null);
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const weatherApiKey = process.env.NEXT_PUBLIC_APLI_KEY;

  const getWeatherData = async () => {
    // https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=weatherApiKey

    if (place && place.length > 0) {
      try {
        let url = ` https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${weatherApiKey}`;
        let result = await fetch(url);
        let data = await result.json();
        console.log("Get response", data);
        setPlaceData(data);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Enter a place first");
    }
  };

  useEffect(() => {
    getWeatherData();
  }, []);
  return (
    <div className={styles.outerdiv}>
      <div className={styles.searchbar}>
        <input
          type="search"
          placeholder="Enter City"
          onChange={(e) => setPlace(e.target.value)}
        />
        <button onClick={getWeatherData}>
          <BsSearch />
        </button>
      </div>

      {placeData && (
        <div className={styles.row}>
          <div className={styles.section1}>
            <div className={styles.section11}>
              {placeData.weather[0].main === "clouds" && (
                <IoCloudSharp className={styles.weathericon} />
              )}
              {placeData.weather[0].main === "Haze" && (
                <GiHeatHaze className={styles.weathericon} />
              )}
              {placeData.weather[0].main === "Smoke" && (
                <FaSmog className={styles.weathericon} />
              )}
              {placeData.weather[0].main === "Clear" && (
                <IoSunny className={styles.weathericon} />
              )}

              <p className={styles.temp}>
                {(placeData?.main.temp - 273.15).toFixed(1)}
                <span>°C</span>
              </p>
            </div>
            <div className={styles.section11}>
              <p className={styles.city}>{placeData?.name}</p>
              <p className={styles.weathertype}>{placeData?.weather[0].main}</p>
            </div>
          </div>

          <div className={styles.timediv}>
            <p className={styles.time}>{currentTime}</p>
          </div>
        </div>
      )}
      {placeData && (
        <div className={styles.section2}>
          <div className={styles.section21}>
            <p className={styles.head1}>Temperature</p>
            <p className={styles.head2}>
              {(placeData?.main.temp - 273.15).toFixed(1)}
              <span>°C</span>
            </p>
          </div>
          <div className={styles.section21}>
            <p className={styles.head1}>Temperature Min</p>
            <p className={styles.head2}>
              {(placeData?.main.temp_min - 273.15).toFixed(1)}
              <span>°C</span>
            </p>
          </div>
          <div className={styles.section21}>
            <p className={styles.head1}>Temperature Max</p>
            <p className={styles.head2}>
              {(placeData?.main.temp_max - 273.15).toFixed(1)}
              <span>°C</span>
            </p>
          </div>

          <div className={styles.section21}>
            <p className={styles.head1}>Humidity</p>
            <p className={styles.head2}>{placeData?.main.humidity}</p>
          </div>

          <div className={styles.section21}>
            <p className={styles.head1}>Pressure</p>
            <p className={styles.head2}>{placeData?.main.pressure}</p>
          </div>
          <div className={styles.section21}>
            <p className={styles.head1}>Visibility</p>
            <p className={styles.head2}>{placeData?.visibility}</p>
          </div>
          <div className={styles.section21}>
            <p className={styles.head1}>Wind Speed</p>
            <p className={styles.head2}>{placeData?.wind.speed} km/hr</p>
          </div>
        </div>
      )}
    </div>
  );
}
