const express = require("express");
const bodyParser=require('body-parser');
const port =8000;

const app = express();

//add database
const db=require("./config/mongoose");
const addBookDB=require("./models/addBook");
const addUserEntryDB=require("./models/usersEntry");

//set view engine and views folder
app.set("view engine","ejs");
app.set("views","./views");

app.use(express.static("assets"));
app.use(bodyParser.urlencoded());

app.get("/",function(req,res){
    return res.render("home");
})

app.get("/addBook",function(req,res){
    addBookDB.find({},function(err,bookList){
        if(err){
            console.log(err)
            return;      
        }
        return res.render("addBooks",{
            book_list:bookList
        });
    })
    
})

app.get("/listoftakenbooks",function(req,res){
    addUserEntryDB.find({},function(err,entryes){
        if(err)
        {
            console.log("error in fetching user Entry ",err);
            return;
        }
        return res.render("listOfTakenBooks",{
            entry:entryes
        });
    })
    // return res.render("listOfTakenBooks");
})

app.get("/addentry",function(req,res){
    addBookDB.find({},function(err,books){
        if(err)
        {
            console.log("error in fetching book ",err);
            return;
        }
        return res.render("addEntry",{
            book:books
        });
    })
})

//create book
app.post("/book-create",(req,res)=>{
    console.log(req.body)
    addBookDB.create({
        bookname:req.body.bookname,
        writername:req.body.writername
    },function(err,newBook){
        if(err)
        {
            console.log("error in adding book into DB ",err);
            return;
        }
        console.log("*******",newBook);
        return res.redirect("back");
    })
    // return res.redirect("back");
    
})
app.post("/create-entry",(req,res)=>{
    console.log(req.body);
    addUserEntryDB.create({
        name:req.body.name,
        number:req.body.number,
        bookname:req.body.bookname,
        pickupdate:req.body.pickupdate,
        returndate:req.body.returndate
    },function(err,newEntry){
        if(err)
        {
            console.log("error in insert user taken books entry in DB",err);
            return;
        }

        console.log("*****",newEntry);
        return res.redirect("back");
    })
})

//find entry date wise
app.get('/find-listofbooks-datewise',function(req,res){
    // console.log(req.query);
    let date=req.query.pickupdate
    addUserEntryDB.find({pickupdate:date},function(err,newEntryDatewise){
        if(err)
        {
            console.log(err);
            return;
        }
        return res.render("listOfTakenBooks",{
            entry:newEntryDatewise
        })
    })
  
})

//delete entry
app.get("/delete-entry/",function(req,res){
    // console.log(req.query);
    addUserEntryDB.findByIdAndDelete(req.query.id,function(err){
        if(err)
        {
            console.log(err)
            return;
        }
        return res.redirect("back");
    })
})

//delete book
app.get("/delete-book",function(req,res){
    addBookDB.findOneAndDelete(req.query.id,function(err){
        if(err)
        {
            console.log(err);
            return;
        }
        return res.redirect("back");
    })
})

app.listen(port,(err)=>{
    if(err)
    {
        console.log("error to server run ");
        return;
    }
    console.log(`server is up on ${port} port` );
    return;
})