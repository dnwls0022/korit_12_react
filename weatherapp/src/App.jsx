
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [weather, setWeather] = useState({
    temp: '',
    desc: '',
    icon: '',
  });

  useEffect(()=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Busan&units=Metric&APIkey=384996904b70326d25f72a69d9474f91`)
    .then(response=> response.json())
    .then(data=> {
      setWeather({  
          temp: data.main.temp,
          desc: data.weather[0].description,
          icon: data.weather[0].icon
      })
    })
    .catch(err => console.log(err));
  },[]);
  // useEffect 해석 중요
  if (weather.icon){
    return (
    <>
      <p>기온: {weather.temp}℃</p>
      <p>설명: {weather['desc']}℃</p>
      <p>아이콘 string : {weather.icon}</p>
      <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
      alt="날씨아이콘" />
    </>
  )
  }else{
    return <h1>Loading... 🕛 </h1>
  }


  
}

export default App

// 'desc' 작은따옴표 주의
