const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost/libraryManagementSystem");

const db=mongoose.connection;

db.on("error",function(){
    console.log("error to connect database");
})

db.once("open",function(){
    console.log("sucessfuly connected to database");
})