const mongoose=require("mongoose");

const addUserEntrySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    bookname:{
        type:String,
        required:true
    },
    pickupdate:{
        type:String,
        required:true
    },
    returndate:{
        type:String,
        required:true
    }
})

const userEntry=mongoose.model('UserEntry',addUserEntrySchema);

module.exports=userEntry;