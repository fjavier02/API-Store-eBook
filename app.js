const expresss = require('express');
const database = require('./database/connection');
const TaskController = require('./src/controllers/Controller');
const router = require('./src/routes/routes');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const app = expresss();

app.use(bodyParser.json());
app.use(router);

//Create Database Store
database.schema.raw('CREATE DATABASE IF NOT EXISTS Store;').raw('USE Store;').raw('CREATE TABLE IF NOT EXISTS authors(idAuthor INT AUTO_INCREMENT NOT NULL PRIMARY KEY,  name VARCHAR(65) NOT NULL,  picture VARCHAR(255) NOT NULL);').raw('CREATE TABLE IF NOT EXISTS eBook(  id INT(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,  idAuthor INT(11) NOT NULL, category VARCHAR(65) NOT NULL,  title VARCHAR(255) NOT NULL, summary TEXT NOT NULL,  firstParagraph VARCHAR(255) NOT NULL,  body VARCHAR(255) NOT NULL,  CONSTRAINT idAuthor FOREIGN KEY (idAuthor) REFERENCES authors (idAuthor));').raw('CREATE TABLE IF NOT EXISTS users( id INT(11) AUTO_INCREMENT NOT NULL PRIMARY KEY, username VARCHAR(65) NOT NULL,  email VARCHAR(100) NOT NULL UNIQUE,  password VARCHAR(65) NOT NULL);').then(data =>{
    console.log({message: "Database Store created with success!"})
}).catch(error =>{
    console.log(error)
});


//Home page

app.get('/', (req,res,next)=>{
    if(req.isAuthenticated()) return next();
    //is not logined
    console.log("is not logined")
    console.log({login: req.isAuthenticated(), user: req.user})
    res.send({login: req.isAuthenticated(), user: req.user})
    //res.send('<h1>Welcome to my eBook-Store!</h1> <br> <p>Please do it login</p> <br> <p>from login use "/api/login"</p>')
},(req,res)=>{
    //is logined
    console.log("is logined")
    console.log({login: req.isAuthenticated(), user: req.user})
    res.send({login: req.isAuthenticated(), user: req.user})
    //res.send("<h1>Welcome to my eBook-Store!</h1>")
});


app.listen(4000,()=> {
    console.log("Working in the port 4000" + " http://localhost:4000/");
});
