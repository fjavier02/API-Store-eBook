const database = require('../../database/connection');
const express = require("express")
const router = express.Router()
const Controller = require('../controllers/Controller')
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')

const saltRounds = 10;
const myPassword = "Store-Book";
const myOtherPassword = "Other-Store-Book";

router.use(cookieParser('secret'));
router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  database.select('id', 'username').table('users').where({id:id}).then(data => {
    done(null, data[0]);
  })
});

//CRUD Authors
router.get('/api/admin/authors',Controller.readAuthors)
router.get('/api/admin/authors/idAuthor',Controller.readAuthorsID)
router.post('/api/admin/authors',Controller.createAuthors)
router.put('/api/admin/authors',Controller.editAuthors)
router.delete('/api/admin/authors',Controller.deleteAuthors)
    
//CRUD eBook
router.get('/api/admin/eBook',Controller.readeBook)
router.get('/api/admin/eBook/id',Controller.readeBookID)
router.get('/api/admin/eBook/:category',Controller.readeBookCategory)
router.post('/api/admin/eBook',Controller.createeBook)
router.put('/api/admin/eBook',Controller.editeBook)
router.delete('/api/admin/eBook',Controller.deleteeBook)
    
//login API
router.post('/api/login', passport.authenticate('local', {
    //Receive credentials and log in
    successRedirect: "/",
    failureRedirect: "/api/loginFail"
}))

router.get('/api/loginFail', Controller.loginFail)

//Sign-up API
router.post('/api/sign-up',Controller.signUp)
router.put('/api/sign-up/resetPassword',Controller.resetPassword)

//logout API
router.get('/api/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});


/* bcrypt.hash(myPassword, saltRounds, function(err, hash) {
    if(err) console.log(err)
    console.log(hash)
}); */

/* bcrypt.compare(myPassword, hash, function(err, result) {
    if(err)console.log(err);
    console.log(result)
}); */

passport.use(new LocalStrategy({ usernameField: 'username', passwordField: 'password'}, function(username, password, done) {
    database("users").where({ username : username}).then(data =>  {
        if(data.length == 1){
            bcrypt.compare(myPassword, data[0].password, function(err, result) {
                if(err)console.log(err);
                if(username === data[0].username && result === true){
                    console.log("login " + data[0].username);
                    return done(null,{id:data[0].id, name:data[0].username});
                    
                }else {
                    console.log("Username or password invalid")
                    return done(null, false, { message: 'Username or password invalid' });
                }
            });
            
        }else {
            console.log("Username or password invalid")
            return done(null, false, { message: 'Username or password invalid' });
        }
    }).catch(error=>{
        console.log(error)
    }) 

}));

module.exports = router
