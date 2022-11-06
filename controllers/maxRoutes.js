const router = require('express').Router();
const db = require('../models');

/* router.post('/new', (req, res)=> {
    db.MaxInfo.create({
        maxbench: req.body.userInputMax,
        accountInfoId: req.body.accountInfoId
    }).then(newmax => res.send(newmax));
    res.redirect('/find:id')
});

router.get('/new', (req,res)=>{
    */

router.get('/find/:id', (req, res)=> {
    db.MaxInfo.findAll({
        where: {
            accountInfoId: req.params.id 
        }, include: [db.AccountInfo]
    });

    res.render('index.ejs',{
        bset1: benchSet1, bset2: benchSet2, bset3: benchSet3, bset4: benchSet4, bset5: benchSet5,
        tset1: triSet1, tset2: triSet2, tset3: triSet3, tset4: triSet4, tset5: triSet5,
        fset1: flySet1, fset2: flySet2, fset3: flySet3, fset4: flySet4, fset5: flySet5
    })});

router.post('/find/:id', (req, res) =>{
   db.MaxInfo.update({maxbench:req.body.userInputMax},
    {where: {
        accountInfoId: req.session.accountInfoId 
    }});

})
module.exports = router 
let userInputMax = 0
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
