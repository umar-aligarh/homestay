const mongoose = require("mongoose");

const roomStatusSchema = new mongoose.Schema({

    _id: {  
        type: String,  //category number
        reqired: true
    },
    categoryName:String, //Deluxe-Ground Floor

    bookings: {        
        type: [{bookingId: String, checkIn: Date, checkOut: Date}]
    },
    capacity: Number,  //(short form)
    amount: Number
})

mongoose.pluralize(null)
module.exports = mongoose.model("roomstatus",roomStatusSchema);

