import "./card_abajo.css"

function Card_abajo(props){
    return(
        <div >
            <p>{props.top}</p>
                <div>
                    <p>{props.middleNumber}</p>
                    <p>{props.middleMesure}</p>
                </div>
        </div>
    )
}
export default Card_abajo