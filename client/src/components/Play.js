import '../App.css';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './elements/Card';
import checkToken from './elements/Token';
import jwt_decode from "jwt-decode";
const cardImages = [
  {"src": "/img/axe.png", matched: false},
   {"src": "/img/crest.png", matched: false},
  {"src": "/img/emblem.png", matched: false},
  {"src": "/img/fire.png", matched: false},
  {"src": "/img/scythe.png", matched: false},
  {"src": "/img/Fire1.png", matched: false},
  //  {"src": "/img/gem.png", matched: false},
  // {"src": "/img/lantern.png", matched: false},
  // {"src": "/img/rune.png", matched: false}
]


function Play() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choice1, setchoice1] = useState(null)
  const [choice2, setchoice2] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [isFinnished, setisFinnished] = useState(false)

  const shuffleCards = () => {

    const shuffledCards =  [...cardImages , ...cardImages ]
      
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setchoice1(null)
    setchoice2(null)  
    setCards(shuffledCards);
    setTurns(0);
    setisFinnished(false)
  };


  //handle choices from user
  const handleChoice = (card) => {
    if (!choice2) {
      choice1 ? setchoice2(card) : setchoice1(card);
    }

  };


//END GAME
const [matchedCards, setMatchedCards] = useState([]);

useEffect(() => {
  const matchedCardsSrc = cards.filter(card => card.matched).map(card => card.src);
  setMatchedCards(matchedCardsSrc);
}, [cards]);

useEffect(() => {
  if (matchedCards.length === cards.length && matchedCards.length) {
    setisFinnished(true)
    if(isFinnished) {
      console.log("turns: ", turns)
      console.log("all matched")
    }
  } 
}, [matchedCards, cards])
////////////
useEffect(() => {
  if (isFinnished) {
    setTimeout(() => {
      saveStats();
    }, 0);

  }
}, [isFinnished]);

async function saveStats(){

  const token = checkToken();
  const decodedToken = jwt_decode(token);
  const userId = decodedToken._id;
  console.log(decodedToken)
  setTurns(turns)
  if(turns !== 0){
    try{
      const stats = { userId, turns};
      console.log(stats)
      const url = "http://localhost:5000/api/scores";
      const { data: res } = await axios.post(url, stats);
      console.log(res.message)

    }catch(e){
      if( e.response && e.response.status >= 400 && e.response.status <= 500 ){
            }
        } 
  }else{
    console.log("Invalid turn value")
  }
  
}


  //compare cards
  useEffect(() => {
    
    if (choice1 && choice2) {
      setDisabled(true)
      if (choice1.src === choice2.src) {
        setCards(prevCards => {
          return prevCards.map(card =>{
            if (card.src === choice1.src) {
              return {...card, matched: true}
            }else {
              return card
            }
          })
        })
        resetTurn()
      }else{
        setTimeout(() => resetTurn(), 1000)
      }
      
    }
  }, [choice1, choice2])

  const resetTurn = () =>{
    setchoice1(null)
    setchoice2(null)
    setTurns(prevTurns => prevTurns + 1)
    setTimeout(() => setDisabled(false), 20)
  }

  return (
    <>
  
      <div className='buttons'>
        <button className='button1' onClick={shuffleCards} >New Game</button>
      </div> 
      
      <p>Turns: {turns}</p>
      
      <div className="App">
      <div className="card-grid">
        {cards.map((card) => (
         <Card  
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={card === choice1 || card === choice2 || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
    </>
  );
}
export default Play