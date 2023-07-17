const metaModel = require('../models/metaModel');



async function getAndUpdateNumberofBookings()
{
    let doc = await metaModel.findById('meta');
    console.log(doc);
    let numberOfBookings = doc.numberofBookings;
    numberOfBookings++;
    const filter = { _id: 'meta' };
    const update = { numberOfBookings: numberOfBookings}
    await metaModel.findOneAndUpdate(filter, update);
    return numberOfBookings;
}


module.exports =  getAndUpdateNumberofBookings