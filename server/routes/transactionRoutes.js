const router = require('express').Router();
const User = require('../models/userAccountsModel');
const Razorpay = require("razorpay");
const transactions = require('../models/transactionsModel')
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
router.route('getOne').get(async (req,res)=>{
    
})
router.route('/get').get(async (req,res)=>{
  const phone = req.session.user.phone
  console.log(phone)
  const Transactions = await transactions.find({accountId : phone})
  console.log(Transactions)
  res.send(Transactions)
})
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
var paymentId = req.p_id
var orderId = req.o_id
console.log(req.bookingId)
instance.orders.fetchPayments(orderId).then((data)=>
{
  console.log(data)
})
})

module.exports = router;