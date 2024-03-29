const mongoose=require("mongoose")


let users=mongoose.Schema({
    name: {
        type: String,
        required: true 
      },
      email: {
        type: String,
        required: true,
        unique: true, 
        trim: true 
      },
      phoneNumber: {
        type: String
      },
      address: {
        type: String
      }
})

module.exports=mongoose.model("Users",users)