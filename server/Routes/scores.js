const router = require("express").Router()
const Score = require("../Models/Score")
const { User } = require("../Models/User")


function parseJwt (token){
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
function checkToken() {
    const token = localStorage.getItem('token');
    if(token !== ''){
        return token 
    }
  }
  
router.post("/", async (req, res) => {
    try{
        await new Score({...req.body}).save()
        res.status(201).send({ message: "Stats created successfully" })
    } catch(err){
        console.log(err)
        res.status(500).send({message: "internal server error"}) 
    }
})


router.get('/', async (req, res) => {

  try {
    const scoresData = await Score.find();
    const userData = await Promise.all(
      scoresData.map(async (data) => {
        const user = await User.findById(data.userId)
        return {
          userId: data.userId,
          turns: data.turns,
          name: user ? user.name : "unknown",
        };
      }
      )
    )
    if(!userData.length){
      return res.status(404).send({message: "User not found"})
    }
    // console.log(userData); //full tab with socores
    res.status(200).send(userData);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal Server Error' });

  }

});


module.exports = router