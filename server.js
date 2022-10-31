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

app.get('/', checkAuthenticated , (req,res) => {
    res.render('index.ejs', { name: 'Rick' })
})

app.get('/login', checkNotAuthenticated , (req,res) => {
    res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: "/login",
    failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req,res) => {
    res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req,res) => {
 try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const username = await req.body.username
//not needed after database is connected
    
         AccountInfo.create({
        username: username,
        password: hashedPassword
    });

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

app.listen(3006)