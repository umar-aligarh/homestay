const router = require('express').Router();
const User = require('../models/userAccountsModel');
const Razorpay = require("razorpay");
const transactions = require('../models/transactionsModel')
const meta = require('../models/metaModel')
const bookings = require('../models/bookingsModel.js')
router.route('/add').post(async (req,res)=>{
     amount = req.body.amount 
    const  bookingId = req.body.bookingId 
      const Meta = await    meta.find()
      const trans = Meta[0].numberOfTransactions + 1
      await meta.updateOne({_id : "meta"},{numberOfTransactions : trans})
      const transaction =  new transactions({_id : trans, mode : "offline" , amount : amount})
      transaction.save 
      console.log(bookingId)
      const booking =  await bookings.findOne({_id : bookingId}) 
      console.log(" booking s")
      console.log(booking.transactions)
   

    let   arr = booking.transactions 
    arr.push(trans.toString())
      console.log(arr)
     await   bookings.updateOne({bookingId : bookingId},{transactions : arr }) 
  res.send(" takbeer")
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
router.route('/getEachById').post( async  (req,res)=>{
  const Ids = Array(req.body.transactions) 
  const Transacs = [] 
  for(i =0 ; i<Ids.length ; i++)
  {
      transaction = await transactions.find({_id : Ids[i]})
      Transacs.push(transaction)
  }
  console.log(" array of transactions ")
  console.log(Transacs)
  res.send({transObject : Transacs})
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

module.exports = router