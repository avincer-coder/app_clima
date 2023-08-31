import "./card.css"

function Card (props){
return(
    <div className="card_derecha_superior">
        <p>{props.dia}</p>
        <img src="./img/Sleet.png" alt="imagen del clima" />
        <div className="grados_card">
            <div className="grados_numero">
                <p>16°</p>
                <p>C</p>
            </div>
            <div className="grados_numero">
                <p>11°</p>
                <p>C</p>
                <p></p>
            </div>
        </div>
    </div>
)
}

export default Card