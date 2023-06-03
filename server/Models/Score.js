const mongoose = require("mongoose")

const scoreSchema = new mongoose.Schema({
userId: {type: String, required:true},
turns: { type: Number, required: true },
})

const Score = mongoose.model("Score", scoreSchema)
module.exports = Score
