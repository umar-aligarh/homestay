const router = require('express').Router();
const User = require('../models/userAccountsModel');
const Razorpay = require("razorpay");

router.route('/').get((req,res)=>{
    return 
})

const key = process.env.key
const Skey = process.env.secretKey
const instance = new Razorpay({
  key_id: key,
  key_secret: Skey,
});
let x,y,z
router.route('/order').post((req, res) => {
    params = req.body;
    console.log(params)
    instance.orders
      .create(params)
      .then((data) => {
        console.log(data.id)
        res.send({sub: data, status : "success"})
      })
      .catch((error) => {
        console.log("failed")
        res.send({ sub: error, status: "failed" });
      });    
});

router.route('/order/post').post((req,res)=>{
console.log(req.body)
})

module.exports = router;