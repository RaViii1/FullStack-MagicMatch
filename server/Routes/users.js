const router = require("express").Router()
const { User, validate } = require("../Models/User")
const bcrypt = require("bcrypt")

router.post("/", async (req, res) => {
    try {
            const { error } = validate(req.body)
            if (error) return res.status(400).send({ message: error.details[0].message })
            const user = await User.findOne({ email: req.body.email })
            if (user) return res.status(409).send({ message: "User with given email already Exist!" })
            const usname = await User.findOne({name: req.body.name})
            if(usname) return res.status(409).send({ message: "User with given name already Exist!" })
            const salt = await bcrypt.genSalt(Number(process.env.SALT))
            const hashPassword = await bcrypt.hash(req.body.password, salt)
            await new User({ ...req.body, password: hashPassword }).save()
            res.status(201).send({ message: "User created successfully" })
    } catch (error) {
            res.status(500).send({ message: "Internal Server Error" })
    }
})

router.get("/", async (req, res) => {

        try {
      
          const users = await User.find();
      
          res.status(200).send(users);
      
        } catch (error) {
      
          res.status(500).send({ message: "Internal Server Error" });
      
        }
      
      });

      router.get("/:userId", async (req, res) => {
        try {
          const userId = req.params.userId;
          const user = await User.findById(userId);
          if (!user) {
            return res.status(404).send({ message: "User not found" });
          }
          res.status(200).send(user);
        } catch (err) {
          response.status(err.status).send({ message: err.message})
        }
      
      });
      
      router.delete("/:userId", async (req, res) => {

        try {
                const userId = req.params.userId;
                const deletedUser = await User.findByIdAndDelete(userId);
                if (!deletedUser) {
                  return res.status(404).send({ message: "User not found" });
                }
                res.status(200).send({
                  message: `Successfully deleted user, logging out`,
                  data: deletedUser,
                });
              } catch (err) {
                res.status(err.status || 500).send({ message: err.message })
        }
            });  
            
router.put("/:userId", async (req, res) => {
              try {
                const userId = req.params.userId;
            
                const user = await User.findById(userId);
            
                if (!user) {
                  return res.status(404).send({ message: "User not found" });
            
                }
            
                // Check if another user with the same name already exists
            
                const userNameExists = await User.findOne({ name: req.body.name });
            
                if (userNameExists && userNameExists._id.toString() !== userId) { 
                  console.log(userNameExists )
                  return res.status(409).send({ message: "User with given name already exists!" });
            
                 }
                 
            
                 if(req.body.name === user.name){
            
                   return res.status(400).send({message: "Its your current name!"});
            
                 }
                await User.updateMany(
                  { name: user.name },
                  { $set: { name : req.body.name } }

                );
                
            
                user.name = req.body.name;
                
            
                await user.save();
                
            
                res.status(200).send({ message: "User updated successfully" });   
                 
            
              } catch (error) {
            
                 console.log(error); 
            
                 res.status(500).send({ message: "Internal Server Error" });   
            
              }
            
            });

module.exports = router