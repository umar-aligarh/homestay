const router = require('express').Router();
const Bookings = require('../models/bookingsModel');

// app.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));
// app.set('view engine', 'ejs');
// app.set('views',__dirname + '/views');

router.route('/newBooking').get((req,res)=>{
    const phone = req.query.phone
    return res.render("newBooking",{phone})
})

// router.route('/newBooking').post((req, res) => {
//     const mob = req.body.mobNo;

//     const newUser = new User({
//        _id: mob
//     });
  
//     newUser.save()
//     .then(() => res.json('User added!'))
//     .catch(err => res.status(400).json('Error: ' + err));
//    return res.redirect('../../client/home.html')
// });
router.route('/get').get(async (req,res)=>{
   const phone = req.session.user.phone
   const allBookings = await Bookings.find({accountId:phone})
   res.send(allBookings)
})
router.route('/getForAdmin').post(async (req,res)=>{
    const allBookings = await Bookings.find({accountId:req.body.phone})
    console.log(allBookings)
   res.send(allBookings)
 })
router.route('/newBookings').get((req,res)=>{

    if(req.headers.cookie== undefined)
    res.redirect('/users/login') 
    const phone = req.cookies.userData.phone
    res.render('newBookings',{phone})
})
router.route('/delete').post((req,res)=>{
     console.log(req.body)
     res.send(' success ')
})
module.exports = router;

