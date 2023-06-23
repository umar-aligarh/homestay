const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

    _id: {
        type: String,
        required: true
    },
    accountId: {
        type: String,
        required: true
    },
    roomsBooked: {
        type: [String]
    },
    checkIn: Date,
    checkOut: Date,
    isBookingCompelete: Boolean
})
mongoose.pluralize(null)
module.exports = mongoose.model("booking",bookingSchema);