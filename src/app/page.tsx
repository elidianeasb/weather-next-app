'use client'
import { useEffect, useState } from "react"

function getCurrentDate() {

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
    <div>
        <h1>Weather App</h1>
    </div>
  )
}
