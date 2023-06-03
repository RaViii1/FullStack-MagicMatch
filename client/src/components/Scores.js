import { useState, useEffect } from 'react';
import axios from 'axios';

function Scores() {
  const [scoresData, setScores] = useState([]);
  useEffect(() => {
    
    axios.get("http://localhost:5000/api/scores")
      .then(response => {
        setScores(response.data);
      })
      .catch(error => {
        console.log(error);
      });

   }, []);



   return (

     <>
{scoresData
  .sort((a, b) => a.turns - b.turns)
  .slice(0, 10)
  .map((score, index) => (
    <tr key={index + 1} >
      <td>{index + 1}.</td> 
      <td>{score.name.charAt(0).toUpperCase() + score.name.slice(1)}</td>  
      <td>{score.turns}</td>
    </tr>
))}
    
    </>
   );

}

export default Scores;