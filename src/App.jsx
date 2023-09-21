import './App.css'
import axios  from 'axios'
import { useEffect, useState } from 'react'
import Card from './componentes/card/card'
import Card_abajo from './componentes/card_abajo/card_abajo'

function App() {
    const [DataResponse, setDataResponse] = useState(null) 
    const [cambioCiudad, SetCambioCiudad] = useState("London")
    useEffect( ()=>{
     
      
      // let ciudad = "London";
      const apiKey = "7273842f78e9cc5efe909fab65025514";
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cambioCiudad}&appid=${apiKey}`;
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
    },[cambioCiudad])



    function formatTimestamp(timestamp) {
      const date = new Date(timestamp * 1000);


      const year = date.getFullYear();

      const nombresDias = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
      const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ];
      const month = monthNames[date.getMonth()]; 

      // const day = nombresDias[0]; 
      const day = nombresDias[date.getDay()];
      const dayMonth = date.getDate();
      return `  ${day} ${dayMonth} ${month}`;
    } 



    function mostrar_modal(){
      setUsoDeModal(true)
    }
    const [usoDeModal, setUsoDeModal] = useState(false);
    function cerrar_modal(){
      setUsoDeModal(false)
    }

    function clima_london(){
      SetCambioCiudad("London")
    }
    function clima_barsa(){
      SetCambioCiudad("Barcelona")
    }
    function clima_canada(){
      SetCambioCiudad("Canada")
    }
    


    

    function ImgClimaDinamico(Clima){

      if(Clima == "Clouds"){
        let ImgClima = "img/shower.png"
        return ImgClima
      }
      else if(Clima == "Clear"){
        let ImgClima = "img/Clear.png"
        return ImgClima
      }
      else if(Clima == "Rain"){
        let ImgClima = "img/LightRain.png"
        return ImgClima
      }

      
    }
    console.log("Aqui viene la variable DataResponse con elementeos")
    console.log(DataResponse)

  return (
    <main className='main_all'>
      <section className='izquierda'>
        <div className='contenedor_btn_arriba'>
          <button onClick={mostrar_modal} className='search'>Search for places</button>
          <button className='mira'>Icono</button>
        </div>
        <div className='contenedor_imagenes'>
          {/* <img className='nubes_fondo' src="/img/Cloud-background.png" alt="imagen nubes de fondo" /> */}
          <img className='sol_nube_lluvia' src={ImgClimaDinamico(DataResponse?.list[0].weather[0].main)} alt="nube y sol" />
        </div>
        <div className='grados'>
          <p>
            {DataResponse?.list[0].main.temp.toFixed()/10}
          </p>
          <p className='letras_transparente'>°C</p> 
        </div >
         <p className='letras_transparente'>{DataResponse?.list[0].weather[0].main.temp}</p>
         <div className='fecha'>
            <p className='letras_transparente'>Today</p>
            <p className='letras_transparente'>‧</p>
            <p className='letras_transparente'>{formatTimestamp(DataResponse?.list[0].dt)}</p>
         </div>
         <div className='pie_pagina'>
            <img  className='Icono_ubicacion' src="" alt="icono ubicacion" />
            <p className='letras_transparente'>{DataResponse?.city.name}</p>
         </div>
      </section>

      <section className='derecha'>

        <div className='derecha_arriba'>

          {DataResponse?.list.map((cadaList,index) =>(
            (index+1) %  8 === 0 &&(
            
            
            <Card
              dia={formatTimestamp(cadaList.dt)}
              imgsDinamicas={ImgClimaDinamico(cadaList.weather[0].main)}
              gradosMinimo={cadaList.main.temp_min.toFixed()/10}
              gradosMaximo={cadaList.main.temp_max.toFixed()/10}
              
              
              
              
              />)


            
            // console.log(cadaList.dt)
          ))}
        </div>
        <h1>Today's HighLights</h1>
        <div className='derecha_abajo'>
          
          <div className="contenedor_card_abajo">
            <Card_abajo
            top="Wind status"
            middleNumber={DataResponse?.list[0].wind.speed}
            middleMesure="mph"
            />
            <div>
                <img src="" alt="" />
                <p>WSW</p>
            </div>
          </div>
          
          <div className="contenedor_card_abajo">
          <Card_abajo
          top="Humidity"
          middleNumber={DataResponse?.list[0].main.humidity} 
          middleMesure="%"/>
            <div>
               <progress value={DataResponse?.list[0].main.humidity} max="100"></progress>
            </div>
          </div>
          
          
          
          <div className="contenedor_card_abajo">
          <Card_abajo
          top="Visibility"
          middleNumber={DataResponse?.list[0].visibility/1000}
          middleMesure="mph"/>
          </div>
          
          
          <div className="contenedor_card_abajo">
          <Card_abajo
          top="Pressure"
          middleNumber={DataResponse?.list[0].main.pressure} 
          middleMesure="mb"/>
          </div>






          

          

          
        </div>
        
        
      </section>
      {/* <section>
      <p>{DataResponse?.name}</p>
        <p>{DataResponse?.wind.speed}</p>
        <p>Temperatura: {DataResponse?.main.temp}</p>
      </section> */}

            {usoDeModal&&
      <div className="contenedor_modal">
        <button className='btn_cerrar_modal' onClick={cerrar_modal}>X</button>
          <div className='contenedor_text_search'>
            <input type="text" placeholder='search location'/>
            <button className='btn_search'>Search</button>
          </div>
          <div className='countries'>
              <button onClick={clima_london} className='london_arrow all_countries'>
                <p>London</p> 
                <p className='only_arrow'>{">"}</p>
              </button>
              <button onClick={clima_barsa} className='all_countries two_countries'>Barcelona</button>
              <button onClick={clima_canada} className='all_countries two_countries'>Canada </button>


          </div>
          
      </div>}
      
      
      
      

    </main>
  )



}

export default App
