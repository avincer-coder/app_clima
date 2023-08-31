import './App.css'
import axios  from 'axios'
import { useEffect, useState } from 'react'
import Card from './componentes/card/card'
import Card_abajo from './componentes/card_abajo/card_abajo'

function App() {
    const [DataResponse, setDataResponse] = useState(null) 

    useEffect( ()=>{
     
      let ciudad = "London";
      const apiKey = "7273842f78e9cc5efe909fab65025514";
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&appid=${apiKey}`;
      console.log(url)
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
    <main className='main_all'>
      <section className='izquierda'>
        <div className='contenedor_btn_arriba'>
          <button className='search'>Search for places</button>
          <button className='mira'>Icono</button>
        </div>
        <div>
          <img className='nubes_fondo' src="./img/Cloud-background.png" alt="imagen nubes de fondo" />
          <img className='sol_nube_lluvia' src="img/shower.png" alt="nube y sol" />
        </div>
        <div className='grados'>
          <p>15</p>
          <p className='letras_transparente'>°C</p> 
        </div>
         <p className='letras_transparente'>Shower</p>
         <div>
            <p className='letras_transparente'>Today</p>
            <p className='letras_transparente'>‧</p>
            <p className='letras_transparente'>Fri, 5 Jun</p>
         </div>
         <div className='pie_pagina'>
            <img  className='Icono_ubicacion' src="" alt="icono ubicacion" />
            <p className='letras_transparente'>Helsinki</p>
         </div>
      </section>

      <section className='derecha'>

        <div className='derecha_arriba'>
          <Card
            dia="Tomorrow" />
          <Card
            dia="Tomorrow" />
          <Card
            dia="Tomorrow" />
          <Card
            dia="Tomorrow" />
          <Card
            dia="Tomorrow" />
        </div>
        <div className='derecha_abajo'>
          <Card_abajo/>
        </div>
        
        
      </section>
      {/* <section>
      <p>{DataResponse?.name}</p>
        <p>{DataResponse?.wind.speed}</p>
        <p>Temperatura: {DataResponse?.main.temp}</p>
      </section> */}


    

    </main>
  )



}

export default App
