const mongoose=require("mongoose");

const addBookSchema=new mongoose.Schema({
    bookname:{
        type:String,
        required:true
    },
    writername:{
        type:String,
        required:true
    }
})

const addbook=mongoose.model('Books',addBookSchema);

module.exports=addbook;