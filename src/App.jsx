import './App.css'
import axios  from 'axios'
import { useEffect, useState } from 'react'
import Card from './componentes/card/card'
import Card_abajo from './componentes/card_abajo/card_abajo'
import InputSearch from './funciones/Input_text'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLocationCrosshairs, faLocationDot, faLocationArrow, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'


function App() {
    const [DataResponse, setDataResponse] = useState(null) 
    const [cambioCiudad, SetCambioCiudad] = useState("London")
    const [valorInput, setValorInput] = useState("")
    const [IsFarenhait, setIsFarenhait] = useState(true)

    // const [UbicacionLatitude, setUbicacionLatitude] = useState(null)
    // const [UbicacionLongitude, setUbicacionLongitude] = useState(null)


    
    const apiKey = "7273842f78e9cc5efe909fab65025514";//Llave de mi api
    useEffect( ()=>{
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cambioCiudad}&appid=${apiKey}`;
      console.log(url)
      axios.get(url) // Json con data es asincronico (no sabemos exactamente el tiempo en el que va a llegar)
      .then( 
        response => {
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

      const nombresDias = ["Sun.", "Mon.", "Tue.", "Wen.", "Thu.", "Fri.", "Sat."];
      const monthNames = [
        'Jan', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
        'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
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

    function BtnSearch(){
      SetCambioCiudad(valorInput)
    }
    const BtnUbicacion = ()=>{
      let UbicacionLatitude, UbicacionLongitude
      navigator.geolocation.getCurrentPosition((position)=>{
        // setUbicacionLatitude(position.coords.latitude)
        // setUbicacionLongitude(position.coords.longitude)
        UbicacionLatitude = position.coords.latitude
        UbicacionLongitude = position.coords.longitude
        let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${UbicacionLatitude}&lon=${UbicacionLongitude}&appid=${apiKey}`; 
        axios.get(url) 
        .then( 
          response => {
            setDataResponse(response.data)
          }
        )
        .catch(
          error =>{
            console.error(error.message)
          }
        )
      })
    }

    const centigradosToFahrenheit =  (centigrados)=>{
      let fahrenheit = (centigrados * 9/5) + 32;
      return fahrenheit;
    }

    const ConversionGrados = (grados)=>{
      if (grados == "C") {
        setIsFarenhait(true)
      }
      else if (grados == "F") {
        setIsFarenhait(false)
      } 
    }
    console.log(DataResponse)

  return (
    <main className='main_all'>
      <section className='izquierda'>
        <div className='contenedor_btn_arriba'>
          <button onClick={mostrar_modal} className='search btns_sm'>Search for places</button>
          <button 
            className='mira btns_sm'
            onClick={BtnUbicacion}
          >
            <FontAwesomeIcon icon={faLocationCrosshairs}/>
          </button>
        </div>
        <div className='contenedor_imagenes'>
          <img 
          className='sol_nube_lluvia' src={ImgClimaDinamico(DataResponse?.list[0].weather[0].main)} alt="nube y sol" />
        </div>
        <div className='grados'>
          <p className='temp_hoy'>
            {IsFarenhait ? Math.round(DataResponse?.list[0].main.temp/10) : 
            
            
            Math.round(  
            
            (DataResponse?.list[0].main.temp/10 *9/5)  
            
            
            +32)
            
            }


            {/* {
              
              IsFarenhait
            
              ? 
              
              Math.round(cadaList.main.temp_min/10) 
              
              :

              Math.round(
                (cadaList.main.temp_min/10 *9/5)
                
                +32)
            
            } 
              
              
              */}


          </p>
          
          <p className='letras_transparente grados_hoy'>{IsFarenhait ? "°C" : "°F"}</p> 
          
        </div >




          
         <p className='tipo_clima'>{DataResponse?.list[0].weather[0].main}</p>




         <p className='letras_transparente'>{DataResponse?.list[0].weather[0].main.temp}</p>
         <div className='fecha'>
            <p className='letras_transparente'>Today</p>
            <p className='letras_transparente'>‧</p>
            <p className='letras_transparente'>{formatTimestamp(DataResponse?.list[0].dt)}</p>
         </div>
         <div className='pie_pagina'>
            <FontAwesomeIcon icon={faLocationDot} />
            <p className='letras_transparente'>{DataResponse?.city.name}</p>
         </div>
      </section>

      <section className='derecha'>

        <div className='botonera_grados'>
          <button 
            className='btns_cf btn_cent'
            onClick={()=>ConversionGrados("C")}
            >°C
          </button>

              <button className='btns_cf btn_faren' onClick={()=>ConversionGrados("F")}>°F
   
              </button>
        </div>

        <div className='derecha_arriba'>
          {DataResponse?.list.map((cadaList,index) =>(
            (index+1) %  8 === 0 &&(
            
            
            <Card
              dia={formatTimestamp(cadaList.dt)}
              imgsDinamicas={ImgClimaDinamico(cadaList.weather[0].main)}
              gradosMinimo={IsFarenhait ? Math.round(cadaList.main.temp_min/10) : Math.round((cadaList.main.temp_min/10*9/5)+32)}




              simboloGrados= {IsFarenhait ? "°C" : "°F"}





              gradosMaximo={IsFarenhait ? Math.round(cadaList.main.temp_max/10) : Math.round((cadaList.main.temp_max/10*9/5)+32)}




              />)
          ))}
        </div>

        <h1>Today's HighLights</h1>
        <div className='derecha_abajo'>
          
          <div className="contenedor_card_abajo">
            <Card_abajo
            top="Wind status"
            middleNumber={Math.round(DataResponse?.list[0].wind.speed)}
            middleMesure="mph"
            />
            <div className='wsw_arrow'>
                <div className='locataion_arrow'>
                  <FontAwesomeIcon icon={faLocationArrow} rotation={180} />
                </div>
                <p>WSW</p>
            </div>
          </div>
          
          <div className="contenedor_card_abajo">
          <Card_abajo
          top="Humidity"
          middleNumber={DataResponse?.list[0].main.humidity} 
          middleMesure="%"/>

            <div>


                <div className='numeros_progress'>
                  <p>0</p>
                  <p>50</p>
                  <p>100%</p>
                </div>
               <progress 
               value={DataResponse?.list[0].main.humidity} 
               max="100"
               className='custom-progress'
               ></progress>




            </div>
          </div>
          
          
          
          <div className="contenedor_card_abajo ">
            <p>Visibility</p>
          <div className='miles_mb'>
            <Card_abajo
            middleNumber={DataResponse?.list[0].visibility/1000}
            />
            <p className='medicion_abajo'>miles</p>
          </div>
          </div>
          
          
          <div className="contenedor_card_abajo ">
            <p>Aire Pressure</p>
          <div className='miles_mb'>
            <Card_abajo
            middleNumber={DataResponse?.list[0].main.pressure} 
            />
            <p className='medicion_abajo'>mb</p>
          </div>
          </div>
        </div>
        





{/* MODAL */}
      </section>
            {usoDeModal&&
      <div className="contenedor_modal">
        <button 
          className='btn_cerrar_modal' 
          onClick={cerrar_modal}
        >
            X
        </button>
          <div className='contenedor_text_search'>
            <div className='costum_inputext'>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input 
                className='inputext'
                type="text" 
                placeholder='search location' 
                onChange={(e)=>InputSearch(e, setValorInput)} 
                value={valorInput}
              />
            </div>

            <button 
              className='btn_search'
              onClick={BtnSearch}
            
            >Search</button>
          </div>
          <div className='countries'>
              
              <button 
                onClick={clima_london} className='london_arrow all_countries'>
                <p>London</p> 
                <p className='only_arrow'>{">"}</p>
              </button>

              <button 
                onClick={clima_barsa}         className='london_arrow all_countries '>
                  <p>Barcelona</p>
                  <p className='only_arrow'>{">"}</p>
              </button>

              <button 
                onClick={clima_canada} className='london_arrow all_countries '>
                  <p>Canada </p>
                  <p className='only_arrow'>{">"}</p>
              </button>


          </div>
          
      </div>}
      
      
      
      

    </main>
  )



}

export default App
