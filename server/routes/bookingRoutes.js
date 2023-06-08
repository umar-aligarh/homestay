const router = require('express').Router();
const User = require('../models/bookingsModel');

// app.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));
// app.set('view engine', 'ejs');
// app.set('views',__dirname + '/views');

router.route('/newBooking').get((req,res)=>{
    const phone = req.query.phone
    return res.render("newBooking",{phone})
})

router.route('/newBooking').post((req, res) => {
    const mob = req.body.mobNo;

    const newUser = new User({
       _id: mob
    });
  
    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
   return res.redirect('../../client/home.html')
});

module.exports = router;

