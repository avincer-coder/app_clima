import './App.css'
import axios  from 'axios'
import { useEffect, useState } from 'react'

function App() {
    const [DataResponse, setDataResponse] = useState(null) 

    useEffect( ()=>{
     
      const apiKey = "7273842f78e9cc5efe909fab65025514";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=Mexico City&appid=${apiKey}`;
     
      axios.get(url) // Json con data es asincronico (no sabemos exactamente el tiempo en el que va a llegar)
      .then( 
        response => {
          // console.log(response)
          setDataResponse(response.data)
        }
      )
      .catch(
        error =>{
          console.error(error.message)
        }
      )
    },[])
    console.log("Aqui viene la informacion fuera de useEffect")
    console.log(DataResponse)









  





  return (
    <>
    <p>{DataResponse?.name}</p>
    <p>{DataResponse?.wind.speed}</p>
    <p>Temperatura: {DataResponse?.main.temp}</p>

    </>
  )



}

export default App
