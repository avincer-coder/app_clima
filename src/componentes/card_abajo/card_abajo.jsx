import "./card_abajo.css"

function Card_abajo(props){
    return(
        <div >
            <p className="top_cardabajo">{props.top}</p>
                <div className="medida_simbolo">
                    <p className="middle_number">{props.middleNumber}</p>
                    <p className="medida">{props.middleMesure}</p>
                </div>
        </div>
    )
}
export default Card_abajo