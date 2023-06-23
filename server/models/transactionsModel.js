const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({

    _id: {  
        type: String,  //Our own generated id
        required: true
    },
    mode: {        
        type: String
    },
    amount: Number,
    accountId : String,
    bookingId : String
})

module.exports = mongoose.model("transactions",transactionSchema);
