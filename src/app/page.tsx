'use client'
import { useEffect, useState } from "react"
import styles from './page.module.css'

interface WeatherData {
  weather: {
    description: string;
  }[];
  main: {
    temp: number;
  };
  name: string;
}

function getCurrentDate() {
  const currentDate = new Date();
  const options = { month: "long" };
  const monthName = currentDate.toLocaleDateString("en-US", options);
  const date = currentDate.getDate() + ", " + monthName;
  return date;
}

export default function Home() {
  const date = getCurrentDate();
  const [weatherData, setWeaterData] = useState<WeatherData | null>(null)
  const [city, setCity] = useState('')

  async function fetchData(cityName: string) {
    try {
      const response = await fetch(`http://localhost:3001/api/weather?address=${cityName}`)
      const jsonData = (await response.json()).data
      setWeaterData(jsonData)
      setCity('')
    } catch (error) {
      console.log(error)
    }    
  }

  async function fetchDataByCoordinates(latitude: number, longitude: number) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b2a39937953907355bb1f1c2f1965d97`)
      const jsonData = (await response.json()).data
      setWeaterData(jsonData)      
    } catch (error) {
      console.log(error)
    }    
  }

  useEffect(() => {
    if("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchDataByCoordinates(latitude, longitude)
        }, (error) => {
          console.log(error)
        }
      )
    }
  }, [])

  return (
    <main className={styles.main}>
        <article className={styles.widget}>
          <form onSubmit={(e) => {
            e.preventDefault();
            fetchData(city)
          }} className={styles.weatherLocation}>
            <input 
              className={styles.input_field} 
              placeholder="Enter city name" 
              type="text" id="cityName"
              onChange={(e) => setCity(e.target.value)}              
              />
              <button className={styles.search_button} type="submit">Search</button>
          </form>
          {weatherData && weatherData.weather && weatherData.weather[0] ? (
            <>
              <div className={styles.icon_and_weatherInfo}>
                <div className={styles.weatherIcon}>
                  {weatherData.weather[0].description === "rain" || weatherData.weather[0].description === "fog" ? (
                    <i className="wi wi-day-rain"></i>

                  ) : (
                    <i className="wi wi-day-cloudy"></i>
                  )}

                </div>

                <div className={styles.weatherInfo}>
                  <div className={styles.temperature}>
                    <span>
                      {(weatherData.main.temp - 273.5).toFixed(0)}°C
                    </span>
                  </div>
                  <div className={styles.weatherCondition}>
                    {weatherData.weather[0].description.toUpperCase()}
                  </div>                
                </div>     
              </div>
              <div className={styles.place}> {weatherData.name}</div>
              <div className={styles.date}> {date}</div>
            </>

          ):(
            <div className={styles.place}>Loading...</div>
          )}
        </article>
    </main>
  )
}
