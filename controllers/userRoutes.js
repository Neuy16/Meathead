const router = require('express').Router();
const db = require('../models');


router.get('/new', (req, res) => {
    res.render('register.ejs')
});

router.post('/new', (req, res)=> {
    db.AccountInfo.create({
        username: req.body.username,
        password: req.body.password
    }).then(res.redirect('/login'));
});

router.get('/all', (req, res)=> {
    db.AccountInfo.findAll({
        include: [db.MaxInfo]
    }).then(Account => res.send(Account));
});


module.exports = router;