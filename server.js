if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const path = require('path');
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const routes = require('./controllers')
const flash = require('express-flash')
const session = require('express-session')

const { MaxInfo, Exercise, AccountInfo } = require('./models');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const bodyParser = require('body-parser')

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())



/* app.use(methodOveride('_method')) */


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);
let userInputMax = 225;



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

/* app.get('/', (req, res) => {
    res.render('index.ejs',
        {
            bset1: benchSet1, bset2: benchSet2, bset3: benchSet3, bset4: benchSet4, bset5: benchSet5,
            tset1: triSet1, tset2: triSet2, tset3: triSet3, tset4: triSet4, tset5: triSet5,
            fset1: flySet1, fset2: flySet2, fset3: flySet3, fset4: flySet4, fset5: flySet5
        })
})

app.get('/login',(req, res) => {
    console.log('anotherone')
    res.render('login.ejs')

})

app.post('/login',(req,res) => {
/* Athuentication stuffff 
});

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const username = await req.body.username

        //not needed after database is connected

        AccountInfo.create({
            username: username,
            password: hashedPassword
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

 */

sequelize.sync({ force: false }).then(() => {
    app.listen(3000, () => console.log('Now listening'));
  });