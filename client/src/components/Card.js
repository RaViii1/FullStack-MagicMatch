import './css/Card.css'

export default function Card({ card , handleChoice, flipped , disabled}){

    const handleClick = () => {
        if (!flipped) {
          handleChoice(card);
        }
    
      };
    return (
        <div className="card" >
            <div className={flipped ? "flipped" : ""}>
            <img className="front" src={card.src} alt="card front" />
                <img 
                    className="back" 
                    src="/img/back.png" 
                    onClick={handleClick}
                    alt="card back"  
                />
            </div>
        </div>
    )
} 
