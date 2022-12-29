const router = require('express').Router();

const { AccountInfo, MaxInfo, } = require('../models');

    router.route('/find/:id')

    .get((req, res) => {
        MaxInfo.findAll({
            where: {
                accountInfoId: req.params.id 
            }, include: [AccountInfo]
        });
    
        res.render('index.ejs',{
            bset1: benchSet1, bset2: benchSet2, bset3: benchSet3, bset4: benchSet4, bset5: benchSet5,
            tset1: triSet1, tset2: triSet2, tset3: triSet3, tset4: triSet4, tset5: triSet5,
            fset1: flySet1, fset2: flySet2, fset3: flySet3, fset4: flySet4, fset5: flySet5
        })})
    
    .post((req,res) => {

        MaxInfo.update({maxbench:req.body.userInputMax},
            {where: {
                accountInfoId: req.session.accountInfoId 
            }})
    })

router.get('/max/find/user', (req, res) => {
    if (req.session.logged_in) {
        res.redirect(`/max/find/${userData.id}`);
        return;
      }
    res.render('login.ejs')
});

router.post('/max/find/user', (req, res) =>{
    MaxInfo.update({maxbench:req.body.userInputMax},
     {where: {
         accountInfoId: req.session.accountInfoId 
     }});
    })

let userInputMax = 135  //preset to 135 until button works
var benchSet1 = Math.round(userInputMax * .6 / 5) * 5
var benchSet2 = Math.round(userInputMax * .7 / 5) * 5
var benchSet3 = Math.round(userInputMax * .8 / 5) * 5
var benchSet4 = Math.round(userInputMax * .85 / 5) * 5
var benchSet5 = Math.round(userInputMax * .9 / 5) * 5

var triSet1 = Math.round(userInputMax * .13 / 5) * 5
var triSet2 = Math.round(userInputMax * .13 / 5) * 5
var triSet3 = Math.round(userInputMax * .15 / 5) * 5
var triSet4 = Math.round(userInputMax * .15 / 5) * 5
var triSet5 = Math.round(userInputMax * .17 / 5) * 5

var flySet1 = Math.round(userInputMax * .1 / 5) * 5
var flySet2 = Math.round(userInputMax * .1 / 5) * 5
var flySet3 = Math.round(userInputMax * .13 / 5) * 5
var flySet4 = Math.round(userInputMax * .13 / 5) * 5
var flySet5 = Math.round(userInputMax * .15 / 5) * 5 

module.exports = router;