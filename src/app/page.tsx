'use client'
import { useEffect, useState } from "react"
import styles from './page.module.css'

function getCurrentDate() {
  const currentDate = new Date();
  const options = { month: "long" };
  const month = currentDate.toLocaleDateString("en-US", options);
  const date = currentDate.getDate() + ", " + month;
  return date;
}

export default function Home() {
  const date = getCurrentDate();
  const [weatherData, setWeaterData] = useState(null)
  const [city, setCity] = useState('lisbon')

  async function fetchData(cityName: string) {
    try {
      const response = await fetch(`http://localhost:3001/api/weather?address=${cityName}`)
      const jsonData = (await response.json()).data
      setWeaterData(jsonData)      
    } catch (error) {
      console.log(error)
    }
    
  }

  useEffect(() => {
    fetchData('lisbon')
  }, [])

  return (
    <main className={styles.main}>
        <article className={styles.widget}>
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
                      {(weatherData.main.temp - 273.5).toFixed(2) + String.fromCharCode(176)}
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
