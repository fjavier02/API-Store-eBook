const { req, res } = require('express')
const database = require('../../database/connection')
const passport = require('passport');



class Controller {

    //CRUD Authors
    readAuthors(req, res){
        database.select().from("authors").asCallback(function(err, rows) {
            if (err) return console.error(err);
            console.log("get all Authors with  success")
            res.send(rows)
        })  
    }

    readAuthorsID(req,res){
        const { idAuthor } = req.body;
        database("authors").where({ idAuthor : idAuthor}).asCallback(function(err, rows) {
            if (err) return console.error(err);
            console.log("get Authors by ID with  success")
            res.send(rows)
        })  
    }

    createAuthors(req,res){
        const { name, picture } = req.body;
        database.insert(req.body).into("authors").asCallback(function(err, rows) {
            if (err) return console.error(err);
            database("authors").where({ idAuthor : rows[0]}).asCallback(function(err, data) {
                if (err) return console.error(err);
                console.log({"messagem": " Create Authors with success"});
                res.send({
                    "data": data, "messagem": " Create Authors with success"
                })
            })
        });          
    }

    editAuthors(req, res){
        const { idAuthor, name, picture } = req.body;
        database("authors").where({idAuthor : idAuthor}).update({name: name, picture: picture}).asCallback(function(err, rows) {
            if (err) return console.error(err);
            res.send({
                "data edit": req.body,
                "messagem": "Edit Authors with success"
            })
        });
    }
    
    deleteAuthors(req, res){
        const { idAuthor } = req.body;
        database("authors").where({idAuthor : idAuthor}).del().then(data => {
            res.send({"data": req.body, "messagem": " Delete Authors with success"})
            console.log({"deleter author id:" : req.body.idAuthor })
        }).catch(function(error) {
            console.error(error);
        });
        
    }



    //CRUD eBook


    readeBook(req, res){
        let list = [];
        let articleCat = [];
        database("eBook").join("authors", "eBook.idAuthor", "=", "authors.idAuthor").asCallback(function(err, data) {
            if (err) return console.error(err);
            if(req.isAuthenticated()) {
                //login
                for (const row of data) {
                    articleCat = {
                        "id": row.id,
                        "author": {
                            "name": row.name,
                            "picture": row.picture
                        },
                        "category": row.category,
                        "title": row.title,
                        "summary": row.summary,
                        "firstParagraph": row.firstParagraph,
                        "body": row.body
                    }
                
                    list.push(articleCat);
                }           
                console.log("get all ebook")
                res.json(list)
            }else{
                //anonymous
                for (const row of data) {
                    articleCat = {
                        "id": row.id,
                        "author": {
                            "name": row.name,
                            "picture": row.picture
                        },
                        "category": row.category,
                        "title": row.title,
                        "summary": row.summary,
                        "firstParagraph": row.firstParagraph
                    }
                
                    list.push(articleCat);
                }
                console.log({"messagem" : "get all ebook" ,
                "login": req.isAuthenticated()})
                res.json(list)
            }
        }) 
    }    

    readeBookID(req, res){
        const { id } = req.body;
        const { category } = req.params;
        let list = [];
        let articleCat = [];
        database("eBook").join("authors", "eBook.idAuthor", "=", "authors.idAuthor").where({id:id}).asCallback(function(err, data) {
            if (err) return console.error(err);
            if(req.isAuthenticated()) {
                //login
                for (const row of data) {
                    articleCat = {
                        "id": row.id,
                        "author": {
                            "name": row.name,
                            "picture": row.picture
                        },
                        "category": row.category,
                        "title": row.title,
                        "summary": row.summary,
                        "firstParagraph": row.firstParagraph,
                        "body": row.body
                    }
                
                    list.push(articleCat);
                }           
                console.log({"messagem" : "get all ebook" ,
                "login": req.isAuthenticated()})
                res.json(list)
            }else{
                //anonymous
                for (const row of data) {
                    articleCat = {
                        "id": row.id,
                        "author": {
                            "name": row.name,
                            "picture": row.picture
                        },
                        "category": row.category,
                        "title": row.title,
                        "summary": row.summary,
                        "firstParagraph": row.firstParagraph
                    }
                
                    list.push(articleCat);
                }
                console.log({"messagem" : "get ebook by id" ,
                "login": req.isAuthenticated()});
                res.json(list);
            }
        })
    }

    readeBookCategory(req, res){
        const { category } = req.params;
        let list = [];
        let articleCat = [];
        database("eBook").join("authors", "eBook.idAuthor", "=", "authors.idAuthor").where({category:category}).asCallback(function(err, data) {
            if (err) return console.error(err);
            if(req.isAuthenticated()) {
                //login
                for (const row of data) {
                    articleCat = {
                        "id": row.id,
                        "author": {
                            "name": row.name,
                            "picture": row.picture
                        },
                        "category": row.category,
                        "title": row.title,
                        "summary": row.summary,
                        "firstParagraph": row.firstParagraph,
                        "body": row.body
                    }
                
                    list.push(articleCat);
                }           
                console.log({"messagem" : "get ebook by category" ,
                "login": req.isAuthenticated()});
                res.json(list);
            }else{
                //anonymous
                for (const row of data) {
                    articleCat = {
                        "id": row.id,
                        "author": {
                            "name": row.name,
                            "picture": row.picture
                        },
                        "category": row.category,
                        "title": row.title,
                        "summary": row.summary,
                        "firstParagraph": row.firstParagraph
                    }
                
                    list.push(articleCat);
                }
                console.log({"messagem" : "get ebook by category" ,
                "login": req.isAuthenticated()});
                res.json(list);
            }
        })
    }

    createeBook(req, res){
        const { idAuthor, category, title, summary, firstParagraph, body } = req.body;
        database.insert(req.body).into("eBook").asCallback(function(err, rows) {
            if (err) return console.error(err);
            database("authors").where({ idAuthor : idAuthor}).asCallback(function(err, data) {
                if (err) return console.error(err);
                console.log("ebook create with success")
                res.send({
                    "id": rows[0],
                    "author": {
                        "name": data[0].name,
                        "picture": data[0].picture
                      },
                      "category": req.body.category,
                      "title": req.body.title,
                      "summary": req.body.summary,
                      "firstParagraph": req.body.firstParagraph,
                      "body": req.body.body
                });
            });
        });
    }

    editeBook(req, res){
        const { id, category, title, summary, firstParagraph, body } = req.body;
        database("eBook").where({id : id}).update({category: category, title: title, summary: summary, firstParagraph: firstParagraph, body: body}).asCallback(function(err, rows) {
            if (err) return console.error(err);
            console.log({"Edit eBook with success, id ": id});
            res.send({"data edit": req.body, "messagem": " Edit eBook with success"});
        });
    }
    
    deleteeBook(req, res){
        const { id } = req.body;
        database("ebook").where({id : id}).del().then(data => {
            res.send({" Delete eBook with success, id ": id })
            console.log({" Delete eBook with success, id ": id })
        }).catch(function(error) {
            console.error(error);
        });
    }


    //Users
    //Login API /api/login
    loginUser(){
        passport.authenticate('local',{
            //Recibir credenciales e iniciar sesión
            successRedirect: "/",
            failureRedirect: "/"
        });
    }

    //Sign-up API
    signUp(req,res) {
        const { username, email, password } = req.body;
        database.insert(req.body).into("users").asCallback(function(err, rows) {
            if (err) return console.error(err);
            console.log("Record created successfully")
            res.json("Record created successfully")
        })
        
    }
    resetPassword(req,res) {
        const { password } = req.body;
        const { id, name } = req.user;
        if(req.isAuthenticated()) {
            database("users").where({id: id, username : name}).update({password: password}).then(data => {
                if(data == 1){
                    console.log({"Recovery password successfully form user.id: ": id})
                    res.json("Recovery password successfully")
                }else{
                    console.log({"Recovery password fail form user.id: ": id})
                    res.json("incorrect data entered")
                }
            }).catch(err => {
                console.log(err)
                res.send(err)
            })
        }else{
            res.send("<h2>you must be logged in to change password</h2>")
        }
    }

}

module.exports = new Controller()