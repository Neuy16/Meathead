if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOveride = require('method-override')
const { MaxInfo, Exercise, AccountInfo } = require('./models');
const sequelize = require('sequelize');
const initializePassport = require('./passport-config')
initializePassport(
    passport,
    username => users.find(user => user.username === username),
    id => users.find(user => user.id === id)
);

//database info goes here
//right now users stores an empty array that is refreshed every time the server restarts

const users = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOveride('_method'))

//sets input as userInputMax
/* const userInputMax = [225] */



/* document.getElementById("userInputMax").onclick = function(){
    userInputMax = document.getElementById("genWorkoutBtn").ariaValue
    console.log(userInputMax)
} */
let userInputMax = 225;

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.post('/', async (req, res) => {
    userInputMax = req.body.userInputMax
    /*  userInputMax.push(req.body.userInputMax) */
    console.log(userInputMax)
    console.log(benchSet3)

})


//converts user max to a percentage and uses Math.round to round it to the nearest 5

//bench set conversions
 var benchSet1 = Math.round(userInputMax * .6 / 5) * 5
var benchSet2 = Math.round(userInputMax * .7 / 5) * 5
var benchSet3 = Math.round(userInputMax * .8 / 5) * 5
var benchSet4 = Math.round(userInputMax * .85 / 5) * 5
var benchSet5 = Math.round(userInputMax * .9 / 5) * 5

//tricep extension set conversions
var triSet1 = Math.round(userInputMax * .13 / 5) * 5
var triSet2 = Math.round(userInputMax * .13 / 5) * 5
var triSet3 = Math.round(userInputMax * .15 / 5) * 5
var triSet4 = Math.round(userInputMax * .15 / 5) * 5
var triSet5 = Math.round(userInputMax * .17 / 5) * 5

//chest fly set conversions
var flySet1 = Math.round(userInputMax * .1 / 5) * 5
var flySet2 = Math.round(userInputMax * .1 / 5) * 5
var flySet3 = Math.round(userInputMax * .13 / 5) * 5
var flySet4 = Math.round(userInputMax * .13 / 5) * 5
var flySet5 = Math.round(userInputMax * .15 / 5) * 5 

app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs',
        {
            bset1: benchSet1, bset2: benchSet2, bset3: benchSet3, bset4: benchSet4, bset5: benchSet5,
            tset1: triSet1, tset2: triSet2, tset3: triSet3, tset4: triSet4, tset5: triSet5,
            fset1: flySet1, fset2: flySet2, fset3: flySet3, fset4: flySet4, fset5: flySet5
        })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {

    successRedirect: '/',
    failureRedirect: "/login",
    failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const username = await req.body.username

        //not needed after database is connected

        AccountInfo.create({
            username: username,
            password: hashedPassword
        })

        users.push({
            username: username,
            password: hashedPassword,
        })

        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }

})

app.delete('/logOut', (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err)
        }
        res.redirect('/login')
    })
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

app.listen(3000)