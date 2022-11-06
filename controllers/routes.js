const router = require('express').Router();
const { AccountInfo, MaxInfo, Exercise } = require('../models');
const bCrypt = require('bcrypt');





/*  let userInputMax = 0
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

 router.get('/', (req,res) =>{
    
    res.render('index.ejs',
    {
        bset1: benchSet1, bset2: benchSet2, bset3: benchSet3, bset4: benchSet4, bset5: benchSet5,
        tset1: triSet1, tset2: triSet2, tset3: triSet3, tset4: triSet4, tset5: triSet5,
        fset1: flySet1, fset2: flySet2, fset3: flySet3, fset4: flySet4, fset5: flySet5
    })

})
router.get('/find:id', (req,res) =>{
    MaxInfo.findAll({
        where: {account_info_id: req.params.id},
        include: [AccountInfo]
    })
})

router.post('/',async (req,res) =>{
    try{
        const maxBench = await req.body.userInputMax
        await MaxInfo.create({
            account_info_id: req.body.account_info_id,
            maxbench: maxBench,
    })
    } catch{}
})






 register routes 
router.get('/register', (req, res) => {
    res.render('register.ejs')
});


router.post('/register', async (req, res) => {
    try {
        const password = await req.body.password
        const username = await req.body.username

        
        await AccountInfo.create({
            username: username,
            password: password,
        })

        res.redirect('/login')
    } catch {
        
        res.redirect('/register')
    }

}) */



/* 
router.get('/register', (req, res) => {
    res.render('register.ejs')
});
 */

/* login routes */
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/max/find/:id');
        return;
      }

    res.render('login.ejs')
});


router.post('/login', async (req, res) => {
    try {
        const userData = await AccountInfo.findOne({ where: { username: req.body.username } });
        if (!userData) {
            console.log('no user')
            res.json({ message: 'Incorrect username or password' })
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            console.log('bad password')
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }


        req.session.save(() => {
            console.log('session saved')
            req.session.accountInfoId = userData.id;
            req.session.logged_in = true;
            
        });
        res.redirect('/max/find/:id');
 

    } catch (err) {
        res.status(400).json({ message: 'potato' });
    }

});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(err => {
        if (err) {
          res.status(400).send('Unable to log out')
        } else {
          res.redirect('/login')
        }
      });
    } else {
      res.end()
    }
  })

module.exports = router;