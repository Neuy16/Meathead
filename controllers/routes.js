const router = require('express').Router();
const { AccountInfo, MaxInfo, Exercise } = require('../models');
const bCrypt = require('bcrypt');

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect(`/max/find/${userData.id}`);
        return;
    }
    res.render('login.ejs')
});




router.get('/', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/login');
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
        res.redirect(`/max/find/${userData.id}`);


    } catch (err) {
        res.status(400).json({ message: 'potato' });
    }

});

router.post('/logout', (req, res) => {

    req.session.destroy(err => {
      

            res.redirect('/login')
        
    });
})

module.exports = router;