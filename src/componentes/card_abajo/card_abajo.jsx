import "./card_abajo.css"

function Card_abajo(props){
    return(
        <div className="contenedor_card_abajo">
            <p>{props.top}</p>
                <div>
                    <p>{props.middleNumber}</p>
                    <p>{props.middleMesure}</p>
                </div>
                <div>
                    <img src="" alt="flecha"/>
                    <p>{props.end}</p>
                </div>

        </div>
    )
}
export default Card_abajo