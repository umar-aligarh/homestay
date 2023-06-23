const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const accountSchema = new mongoose.Schema({

    _id: {  
        type: String,  //mob no. is of 10 digits so no int
        required: true
    },
    bookings:{        //bookings from this account(Booking-IDs)
        type: [String]
    }
    
})
accountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("accounts",accountSchema);
