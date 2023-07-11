// ?external imports
const express=require("express");
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const path=require("path");
const cookieParser = require("cookie-parser"); 


// ? internal import

const {notFoundHandler,errorHandler}=require("./middlware/common/errorhandle");

const loginRouter=require("./router/loginRouter");
const usersRouter=require("./router/usersRouter");
const inboxRouter=require("./router/inboxRouter");



const app=express();

dotenv.config();

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true });

mongoose.connection.on("connected", function () {
  console.log("mongoose connection open"); 
});  

// ? if connection error
mongoose.connection.on("error", function (err) {
  console.log("mongoose connection error");
});
// ? request parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// ? use view engine
app.set("view engine","ejs");

// ? set static folder
app.use(express.static(path.join(__dirname,"public")));
app.use(cookieParser(process.env.CO0KIE_SECRET));

// ?  set Routers
app.use('/',loginRouter)
app.use('/users',usersRouter)
app.use('/inbox', inboxRouter) 



// ?Error part
// ?404 not found
app.use(notFoundHandler)
// ?Common handler
app.use(errorHandler)
// ?Port 
const port = process.env.port;
app.listen(port, () => {
  console.log(`server is running on ${port}`); 
});
