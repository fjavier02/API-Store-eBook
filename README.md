# Welcome to API Store eBook 👋
[![Version](https://img.shields.io/npm/v/app.js.svg)](https://www.npmjs.com/package/app.js)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](#)
[![Twitter: fjavier02](https://img.shields.io/twitter/follow/francisco_kurt.svg?style=social)](https://twitter.com/francisco_kurt)

> API Ebook

## Install

```sh
npm install
```

## Usage

```sh
npm run start
```
## Database MySql
Settings for your database:
file: `./database/connection.js` 

```js
var knex = require('knex')({
    client: 'mysql', //mysql, pg, sqlite3 or postgres, you can modify the client of your choice 
    connection: {
        host : 'your_host',
        port : 'your-port',
        user : 'your_user',
        password : 'your_password'
     }
});
```

Documentation of clients: http://knexjs.org/#Installation-client

## routers

### CRUD Author
- ``Method get('/api/admin/authors')``
- ``Method get('/api/admin/authors/idAuthor')``  req.body =  { idAuthor }
- ``Method post('/api/admin/authors')`` req.body = { name, picture }
- ``Method put('/api/admin/authors')`` req.body = { idAuthor, name, picture } idAuthor is obligatory
- ``Method delete('/api/admin/authors')`` req.body = { idAuthor }
    
### CRUD eBook
- ``Method get('/api/admin/eBook')`` 
- ``Method get('/api/admin/eBook/id')`` req.body =  { id }
- ``Method get('/api/admin/eBook/:category')`` req.params = { category }
- ``Method post('/api/admin/eBook')`` req.body = { idAuthor, category, title, summary, firstParagraph, body }
- ``Method put('/api/admin/eBook')`` req.body = { id, category, title, summary, firstParagraph, body }
- ``Method delete('/api/admin/eBook')`` req.body = { id }

### User

#### Sign-up
- ``Method post('/api/sign-up')`` req.body = { username, email, password }

#### Login
- ``Method post('/api/login')``  req.body = {username: , password:}

#### Change Password
- ``Method put('/api/sign-up/resetPassword')`` req.body = { password } and is login




## Author

👤 **Francisco Javier Lopez Tirado**

* Website: francisco.com
* email: [franciscolopez1995@gmail.com](franciscolopez1995@gmail.com)
* Github: [@fjavier02](https://github.com/fjavier02)
* LinkedIn: [@francisco-lopez](https://www.linkedin.com/in/francisco-lopez-b33a64110/)

## Show your support

Give a ⭐️ if this project helped you!
