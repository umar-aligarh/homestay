const mongoose = require("mongoose");
mongoose.pluralize(null);


const metaSchema = new mongoose.Schema({

    _id: String,
    numberofBookings: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("meta",metaSchema);