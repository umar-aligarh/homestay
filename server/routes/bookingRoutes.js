const router = require('express').Router();
const bookingsModel = require('../models/bookingsModel');
const roomsModel = require('../models/roomStatusModel');
const metaModel = require('../models/metaModel');


// app.use(bodyParser.urlencoded({limit: '5000mMb', extended: true, parameterLimit: 100000000000}));
// app.set('view engine', 'ejs');
// app.set('views',__dirname + '/views');


router.route('/newBooking').get((req,res)=>{
    if(!req.session.user)
    res.redirect('/users/login') 
    else {
    const phone =req.session.user.phone
    res.render('newBooking',{phone})
    }
})

router.route('/get').get(async (req,res)=>{
   const phone = req.session.user.phone
   const allBookings = await bookingsModel.find({accountId:phone})
   res.send(allBookings)
})
router.route('/getForAdmin').post(async (req,res)=>{
    const allBookings = await bookingsModel.find({accountId:req.body.phone})
    console.log(allBookings)
   res.send(allBookings)
 })

router.route('/delete').post((req,res)=>{
     console.log(req.body)
     res.send(' success ')
})

async function getAndUpdateNumberofBookings()
{
    let doc = await metaModel.findById('meta');
    console.log(doc);
    let numberOfBookings = doc.numberofBookings;
    numberOfBookings++;
    const filter = { _id: 'meta' };
    const update = { "$set": {
        "numberofBookings":numberOfBookings
    }}
    await metaModel.findOneAndUpdate(filter, update);
    return numberOfBookings;
}


router.route('/summary').get(async(req,res)=>{
    let doc = await bookingsModel.findById(req.query.id);
    console.log(doc)

    return res.render("bookingSummary",{data: doc})
})

router.route('/add').post(async(req, res) => {
    console.log(req.body)
    // let selectedRooms = req.body.select;
    let checkIn = req.body.checkIn;
    let checkOut = req.body.checkOut;
    let categories = req.body.categories;
    let numberOfBookings = await getAndUpdateNumberofBookings();

    console.log(numberOfBookings);
    let string1 = "";
    let string2 = numberOfBookings.toString();
    for(let i=1; i<=(5-string2.length); i++)string1+='0';
    let bookingId = string1+string2;

    let roomsId=[];
    console.log(categories);
    for(category in categories)
    {
        let qty = categories[category].qty;
        for(let i=0;i<qty;i++)
        {
            roomsId.push(categories[category].roomsId[i]);
        }
    }


    const newBooking = new bookingsModel({
        _id:bookingId,
        accountId:'1234',
        roomsBooked: roomsId,
        checkIn: checkIn,
        checkOut: checkOut,
        isBookingCompelete: false
    })
    console.log(newBooking)
    let response = await newBooking.save();
    console.log(response);
    res.send(response);
    // for(let i=0;i<selectedRooms.length;i++)
    // {
    //     let doc = await roomsModel.findById(selectedRooms[i]);
    //     doc.bookings.push({
    //         "bookingId": bookingId,
    //         "checkIn": checkIn,
    //         "checkOut": checkOut
    //     })
    //     const filter = { _id: selectedRooms[i] };
    //     const update = { "$set": {
    //     bookings: doc.bookings
    //     }
    //     }
    //     await roomsModel.findOneAndUpdate(filter, update);
    // }
    

});

router.route('/info').post(async(req, res) => {
try {
    let checkIn = req.body.checkIn;
    let checkOut = req.body.checkOut;
    checkIn = Date.parse(checkIn);
    checkOut = Date.parse(checkOut);
    let clash=0;
    let availibilityInfo = {};
    for(let i=1;i<=3;i++)  //for each room
    {
        clash=0;
        let j = i.toString();
        let doc = await roomsModel.findById(j);
        let numberofActiveBookings = doc.bookings.length;
        for(let j=0;j<numberofActiveBookings;j++)  //iterating through bookings of a room
        {
            if(!(checkOut<doc.bookings[j].checkIn||checkIn>doc.bookings[j].checkOut))
            {
                clash=1;
                break;
            }
        }
        if(clash==0)
        {
            categoryName = doc.categoryName;
            console.log(categoryName)
            if(availibilityInfo[categoryName] === undefined)
            {
                availibilityInfo[categoryName] = {
                    qty:1,
                    roomsId:[j]
                };
            }
            else
            {
                availibilityInfo[categoryName].qty++;
                availibilityInfo[categoryName].roomsId.push(j);
            }
        }
    }
    res.send(availibilityInfo);
    
} catch (error) {
    return res.status(400).send(new Error(error));
}
    
});

router.route('/totalamount').post(async(req, res) => {
    selectedCategories = req.body;
    let totalAmount = 0;
    for(const categoryName in selectedCategories)
    {
        const filter = { categoryName: categoryName };
        let doc = await roomsModel.findOne(filter);
        totalAmount += (doc.amount)*(selectedCategories[categoryName].qty);
    }
    let totalAmountObj={};
    totalAmountObj.totalAmount=totalAmount;
    res.send(totalAmountObj);
});


module.exports = router;

