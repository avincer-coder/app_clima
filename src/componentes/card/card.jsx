import "./card.css"

function Card (props){
return(
    <div className="card_derecha_superior">
        <p>{props.dia}</p>
        <img className="img_5images" src={props.imgsDinamicas} alt="imagen del clima" />
        <div className="grados_card">
            <div className="grados_numero">
                <p>{props.gradosMinimo}</p>
                <p>{props.simboloGrados}</p>
            </div>
            <div className="grados_numero grados_color">
                <p>{props.gradosMaximo}</p>
                <p>{props.simboloGrados}</p>
                <p></p>
            </div>
        </div>
    </div>
)
}

export default Card