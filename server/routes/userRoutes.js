const router = require('express').Router();
const passport = require('passport');
const account = require('../models/userAccountsModel')
const path = require('path')
const alert = require('alert')


router.route('/login').get((req,res)=>{
    const room_id = req.query.room_id
    res.render('login',{room_id});
})


router.route('/checkUser').post(async (req, res) => {
    const phone = req.body.phone;
    const data = phone 
   const p = await account.exists({_id:phone})
    if(p)
    {
        
        res.render('existingUserLogin',{data})
    }
    else 
    {
        const data = {
            phone : phone,
            condition :true  
        }
        res.render('signup',{data})
    }    
  
    // newUser.save()
    // .then(() => res.json('User added!'))
    // .catch(err => res.status(400).json('Error: ' + err));

});
const fast2sms = require('fast-two-sms')

router.route('/add').post(async (req,res)=>{
    const phone = req.body.phone 
    console.log(phone)
    var options = {
                
    } 
    const password = req.body.password
    const enteredOtp = req.body.otp
    let sentOtp = "1234"
    
    if( enteredOtp === sentOtp)
    {
        const newUser = new account({_id:phone,password:password})
        await newUser.save()
        const user = { phone : phone , loggedIn: "true"}
        req.session.user = user
        res.redirect('/')
    }
    else 
    {
        alert(" wrong otp ")
    }
})
router.route('/login').post(async (req,res)=>{
     
     const password = req.body.password 
     const phone = req.body.phone
     const p =  await account.exists({_id:phone,password:password})
     
     const user = {phone : phone , loggedIn : "true"}
     if(p)
     {
        req.session.user = user 
        res.redirect('/')
     }
     else 
     {
         alert(" wrong password ")
     }
})
router.route('/logout').get((req,res)=>{
    req.session.user = null
    res.redirect('/')
})
router.post('/register',)
module.exports = router;
