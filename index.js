const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors")
const bodyParser = require('body-parser');
const dotenv = require("dotenv")
dotenv.config()
const usersRouter = require('./server/routes/userRoutes');
const bookingsRouter = require('./server/routes/bookingRoutes');
const roomsRouter = require('./server/routes/roomRoutes');
const transactionsRouter = require('./server/routes/transactionRoutes');

const app = express();
mongoose.connect(process.env.url)
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

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));
app.use('/users', usersRouter);
app.use('/bookings', bookingsRouter);
app.use('/rooms', roomsRouter);
app.use('/payments', transactionsRouter);


let port = "3000"

app.get("/",(req,res)=>{
     return res.render("home")
})


  app.listen(port, () => console.log("Server started on port 3000"));