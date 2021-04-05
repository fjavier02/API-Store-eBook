const expresss = require('express');
const database = require('./database/connection');
const router = require('./src/routes/routes');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const app = expresss();



const saltRounds = 10;
const myPassword = "Store-Book";
const myOtherPassword = "Other-Store-Book";

const llave = "Store-Book Password"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.set('llave', llave);
dato = 'Francisco';

let hash = '$2b$10$6giE5XBZpol7mCsREGxbmOoMER3ziv/G1LsBrEp0XxSq4XLEUpgYe';

/* bcrypt.hash(myPassword, saltRounds, function(err, hash) {
    if(err) console.log(err)
    hash = hash
    console.log(hash)
});

bcrypt.compare(myPassword, hash, function(err, result) {
    if(err)console.log(err);
    console.log(result)
}); */

app.get('/lol3', (req,res)=>{

    bcrypt.hash(myPassword, saltRounds, function(err, hash) {
        if(err) console.log(err)
        hash = hash
        console.log(hash)
        res.json(hash)
    });
    /* token  = jwt.sign( {  data : dato, iat: Math.floor(Date.now() / 1000)} , llave, { expiresIn: '1m' } ) ;  

    console.log({'hash':token, "fecha":Date()}) // Francisco
    res.json({'hash':token, "fecha":Date()}) */
});

app.get('/lol2', (req,res)=>{
    bcrypt.compare(myPassword, hash, function(err, result) {
        if(err)console.log(err);
        console.log(result)
        res.json(result)
    });
    
    /* jwt.verify(token, llave, function(err, decoded) {
        if(err){ 
            err = {
                name: 'TokenExpiredError',
                message:'Token expired',
                expireAt: err.expiredAt
            }
            console.log(err)
            res.send(err)
        }else{
            console.log({'hash':decoded, "fecha":Date()}) // Francisco
            res.json({'hash':decoded, "fecha":Date()})
        }
    }); */
});


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

app.get('/lol', (req,res)=>{
    database.select('id', 'username').table('users').then( data => {
        console.log(data)
        res.json(data)
    })
});

app.listen(4000,()=> {
    console.log("Working in the port 4000" + " http://localhost:4000/");
});
