const router = require('express').Router();
const passport = require('passport');
const account = require('../models/userAccountsModel')
const path = require('path')
const alert = require('alert')
const { TWILIO_SERVICE_SID, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env
const client = require('twilio')(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN,{lazyLoading:true})

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
        const otpResponse= await client.verify.services(TWILIO_SERVICE_SID).verifications.create({ to : `+91${phone}`,channel:"sms"});
        console.log(JSON.stringify(otpResponse)) 
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

    const password = req.body.password
    const enteredOtp = req.body.otp

        const newUser = new account({_id:phone,password:password})
        await newUser.save()
        const user = { phone : phone , loggedIn: "true"}
        req.session.user = user
        res.send("success")


})
router.route('/verifyOtp').post(async (req,res)=>{
    const enteredOtp = req.body.enteredOtp ; 
    const phone  = req.body.phone ; 
    console.log(enteredOtp,phone)
    try{
        const verifiedResponse = await client.verify.services(TWILIO_SERVICE_SID).verificationChecks.create({
            to: `+91${phone}`,
            code : enteredOtp
        })  
        res.send(`${JSON.stringify(verifiedResponse)}`)
    }   
    catch(error){
        res.status(error?.status || 400).send(error?.message || 'something went wrong!');
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
