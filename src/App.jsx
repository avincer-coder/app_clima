import './App.css'
import axios  from 'axios'
import { useEffect } from 'react'

function App() {
    useEffect( ()=>{
     
      const apiKey = "7273842f78e9cc5efe909fab65025514";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=Mexico City&appid=${apiKey}`;
     
      axios.get(url) // Json con data es asincronico (no sabemos exactamente el tiempo en el que va a llegar)
      .then( 
        response => {
          console.log(response)
        }
      )
      .catch(
        error =>{
          console.error(error.message)
        }
      )
    },[])










  





  return (
    <>

    <p>Preuba</p>
    </>
  )
}

export default App
