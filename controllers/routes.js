const router = require('express').Router();
const {AccountInfo, MaxInfo, Exercise} = require('../models');

router.get('/login', (req,res) =>{
    res.render('login.ejs')
});
/*  */

router.post('/login', async (req,res)=> {
 try{
    const userData = await AccountInfo.findOne({ where: { username: req.body.username }});
    
    if (!userData) {
        res.json({message: 'Incorrect username or password'})
        return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.json({ message: 'Incorrect username or password' });
      return;
    }
    req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
    res.render('index.ejs');
})
 } catch (err) {
    res.status(400).json({message: 'potato'});
 }

});

router.get('/register', (req,res) =>{
    res.render('register.ejs')
});

router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const username = await req.body.username

    
    await AccountInfo.create({
            
        })

       /*  res.redirect('/login') */
    } catch {
        res.redirect('/register')
    }

})

module.exports = router;