const express = require('express'); //Here we use express package module to be able to write the API syntax needed
const bcrypt = require('bcrypt-nodejs');// Here the bycrypt package module is used to encrypt the pasword so we don't store the password as plain text in the db
const cors = require('cors');// We use cors here so communication btw the browser and our browser in allowed
const register = require('./controller/register')
const signin = require('./controller/signin');
const profile = require('./controller/profile');
const image = require('./controller/image');
// We use knex to be able to communicate with our database | so we install knex then install the database we're using e.g. postgresql, mysql etc.
const db = require('Knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'Leinads',
        database: 'ztm_test'
    }
})

// db.select('*').from('users').then(resp => {
//     console.log(resp)
// });



const app = express();
app.use(express.json());
app.use(cors());


//================= API Methods ========================

//========== Home Page ========================
//Nb to use this, reconfigure the get() below to have another route i.e. './'
// app.use(express.static(__dirname + '/public'))

//========== Get ========================
/// Home - App
app.get('/', (req, res) => {
    res.send({ "msg": "This is app page" })
})

app.get('/all', (req, res) => {
    db.select('*').from('users').then(allUsers => {
        res.status(200).json(allUsers);
    })
})

app.get('/profile/:id', (req, res) => { profile.handleProfile(res, req, db) })

//========== Post ========================
/// Sign In => { register.handleRegister(req, res, bcrypt, db) })
app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) })


// Register
app.post('/register', (req, res) => { register.handleRegister(req, res, bcrypt, db) })

/// image entries
app.put('/image', (req, res) => { image.handleImage(req, res, db) })


// The Clarifai API Call
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })



//=============== bcrypt for password check ====================
// bcrypt.hash("bacon", null, null, function (err, hash) {
//     //Store hash in password db
// })

//Load hash from db
// bcrypt.compare("bacon", hash, function (err, res) {
//     //res ==true
// })
// bcrypt.compare("veggies", hash, function (err, res) {
//     //res == false
// })


// const PORT = process.env.PORT
app.listen(3000, () => {
    console.log("server is running on port 3000")
});

// console.log(process.env)

/* Planning all routes
'/' - res --> Home
'/signin' --> Post, Success/Fail
'/register' --> Post, User
'/profile/userId' --> Get, User
'/image' --> Put, user
'/delete/userId' --> Post, success/fail
*/