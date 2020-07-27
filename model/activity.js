const mongoose = require("mongoose")

const schema = mongoose.Schema({
    id  : Number , 
    title : String, 
    description : String,
    date : String,
    time  : Array, 
    isCompleted : Boolean
})

module.exports = mongoose.model("Post", schema)