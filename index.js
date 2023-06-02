const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const usersRouter = require('./server/routes/userRoutes');
const bookingsRouter = require('./server/routes/bookingRoutes');
const roomsRouter = require('./server/routes/roomRoutes');
const transactionsRouter = require('./server/routes/transactionRoutes');

const app = express();
mongoose.connect('mongodb+srv://umarkhan:ZrTH34t9PujHNWZa@cluster0.y1jtalv.mongodb.net/homestay?retryWrites=true&w=majority')
.then(
    ()=>{
        console.log('database connected');
    },
    (err)=>{
        console.log('database connection error:',err)
    }

);

app.set('view engine', 'ejs');
app.set('views',__dirname + '/views');


app.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));
app.use('/', usersRouter);
app.use('/bookings', bookingsRouter);
app.use('/rooms', roomsRouter);
app.use('/transactions', transactionsRouter);
app.use(express.static("public"))
let port = "3000"


// app.post("/",(req,res)=>{
//     console.log(req.body.phone)
//     return res.redirect("/")
// })
// app.get("/",(req,res)=>{

//     return res.render('login')
// })

// app.get("/",(req,res)=>{
//     res.set({
//         "Allow-access-Allow-Origin": '*'
//     })
//     return res.redirect('home.html');
// })


  app.listen(port, () => console.log("Server started on port 3000"));