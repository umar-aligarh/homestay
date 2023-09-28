const router = require('express').Router();
const User = require('../models/userAccountsModel');
const admin = require('../models/adminModel')
const flash = require('connect-flash');
router.route('/login').get((req,res)=>{

     
    res.render('adminLogin')
})
router.route('/').get((req,res)=>{
    if(!req.session.adminId)
    {
        res.redirect('/admin/login')
}
else 
    res.render('admin')
})
router.route('/checkAdmin').post(async (req,res)=>{
const userName = (req.body.username)
    const password = (req.body.password)
    const Admin         = await admin.findOne({userName:userName})   
     if(!Admin)
     {
         console.log(' false ')                 
         res.redirect('/admin/login')
     }
     else {
     req.session.adminId = userName 
     res.redirect('/admin')
     }


})
module.exports = router;
// ''gh