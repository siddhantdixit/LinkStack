// Importing required modules and libraries
const express = require("express"); // Express framework for building web applications
const morgan = require("morgan"); // HTTP request logger middleware for Node.js
const axios = require("axios"); // HTTP client for making requests to external APIs
var cookieParser = require('cookie-parser'); // Middleware to parse cookies in the request object
var _ = require('lodash'); // Utility library for various JavaScript functions
const { LOGIN_MAXAGE, VERIFICATION_MAXAGE } = require("./config"); // Importing constants LOGIN_MAXAGE and VERIFICATION_MAXAGE from the config file
require("dotenv").config(); // Loading environment variables from the .env file

// Importing GridFS for storing large files in MongoDB
const Grid = require("gridfs-stream");
const upload = require('./middleware/upload'); // Custom middleware for handling file uploads

// Importing database models
const Account = require('./models/account'); // Model for user accounts
const Profile = require('./models/profile'); // Model for user profiles
const { sendEmailVerificationLink } = require('./utils/emailController'); // Function to send email verification links

// Importing required libraries for database connection
const mongoose = require("mongoose"); // MongoDB object modeling tool
const jwt = require("jsonwebtoken"); // JSON Web Token library for creating and verifying tokens

const app = express(); // Creating an instance of the Express application

// Middleware setup
app.use(morgan("dev")); // Logging HTTP requests to the console in development mode
app.use(express.static('public')); // Serving static files from the 'public' directory
app.use(express.urlencoded({ extended: false })); // Parsing URL-encoded data in the request body
app.use(express.json()); // Parsing JSON data in the request body
app.use(cookieParser()); // Parsing cookies in the request headers
app.set("view engine", "ejs"); // Setting EJS as the view engine for rendering dynamic templates
app.set("view engine", "pug"); // Setting Pug as the view engine (Note: This line is redundant as it overwrites the previous view engine setting)
app.set("json spaces", 2); // Formatting JSON responses with an indentation of 2 spaces

// Connecting to MongoDB
mongoose.connect(process.env.MONGODBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('Connected to MongoDB.....');
    // Starting the Express server after successfully connecting to MongoDB
    app.listen(process.env.PORT || 80, () => {
      console.log(`Listening at.... http://localhost:${process.env.PORT || 80}`);
    });
  })
  .catch((err) => console.log(err));




let gfs;

const conn = mongoose.connection;
conn.once("open", function () {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("photos");
});

/*

app.get("/", async (req, res) => {
  // res.send(req.headers);
  let api_url = `${req.headers['x-forwarded-proto']||'http'}://${req.headers.host}/api/info`;
  try {
    let startDate = new Date();
    const response = await axios.get(api_url);
    let endDate = new Date();
  
    let mypage = ``;
    mypage+=`---- START TIME = ${startDate.toISOString()} <br>`;
    mypage+=`---- END TIME= ${endDate.toISOString()} <br>`;
    mypage+=`RESPONSE TIME = ${endDate - startDate} <br><br><br>`;
  
  
    mypage+=`Path /api/info <br><br>`;
    mypage+=`Data <br><br>`;
    mypage+=`${response.data}`;
    res.send(mypage);
  } catch (error) {
    console.log(error);
    res.send(error);
  }

});

*/
app.use('/dashboard',require('./server/routes/router'));

app.get("/", (req, res) => {
  res.redirect('/login');
});


const autoLogin = (req,res) => {
  try{
    const token = req.cookies.jwt;
    if(token)
    {
      return jwt.verify(token, process.env.JWTLOGINSECRET);
    }
    else
    {
      return false;
    }
  }catch(error)
  {
    return false;
  }
}

const signVerificationToken = (token) => {
  try{
    if(token)
    {
      return jwt.verify(token, process.env.JWTVERIFICATIONSECRET);
    }
    else
    {
      return false;
    }
  }catch(error)
  {
    return false;
  }
}

const createLoginToken = (id) => {
  return jwt.sign({ id }, process.env.JWTLOGINSECRET , {
    expiresIn: LOGIN_MAXAGE,
  });
};

const createVerificationToken = (id) => {
  return jwt.sign({ id }, process.env.JWTVERIFICATIONSECRET, {
    expiresIn: VERIFICATION_MAXAGE,
  });
};


app.get("/login",(req,res)=>{

  if(autoLogin(req,res))
  {
    console.log("Logged IN");
    res.redirect('/dashboard');
  }
  else
  {
    console.log("Not Logged In");
    res.clearCookie("jwt");
    res.render('login');
  }
});

app.post("/login",async (req,res)=>{
  console.log(req.body);
  if(req.cookies.jwt)
  {
    res.send("Logout from existing account");
    return;
  }

  const {username,password,rememberme} = req.body;
  if(!username || !password)
  {
    res.send("Enter Username and Password");
    return;
  }
  
  try {
    const user = await Account.login(username,password);
    if(user)
    {
      // res.send(user);
      // Vaid Username and Password
      const LToken = createLoginToken(user._id);
      if(rememberme)
      {
        // Set Login Cookie to 5 Days
        res.cookie("jwt", LToken, { httpOnly: true, maxAge: LOGIN_MAXAGE * 1000 });
      }
      else
      {
        // Set Login Cookie to session only
        res.cookie("jwt", LToken, { httpOnly: true});
      }
      res.send({code:'007',msg:"Logged in Successfully"});
    }

  } catch (error) {
    console.log(error.message);
    res.send("Invalid Username or Password");
  }


});



app.get("/signup",(req,res)=>{

  res.render('signup');
});


app.post("/signup",async (req,res)=>{
  const {username,password,email} = req.body;

  if(!username || !password || !email)
  {
    res.status(404);
    res.send("Enter Username , Password, Email");
    return;
  }

  try
  {
    let curdat = new Date();
    let mydt = curdat.toLocaleString("en-US",{timeZone: 'Asia/Kolkata'});

    const user = await Account.create({
      username:username,
      password:password,
      email:email,
      createdDate:mydt
    });
    const profile = await Profile.create({userid:user._id});
    if(user)
    {
      console.log("Account Created Successfully ... ");
      // console.log(user_id);
      // res.send(user_id);
      const VToken = createVerificationToken(user._id);

      sendEmailVerificationLink(username,email,VToken,req, (response) => {
        console.log("==== app.js ======");
        console.log(response);
        if (response == 200) {
          // res.send("Verification Email Successfully Sent!");
          res.send({code:'010',msg:"Signup Successfull & Verification Email Successfully Sent!"});
        } else {
          // Account Created Successfully But Failed to Send Verification Email
          // res.sendStatus(404);
          res.send({code:'011',msg:"Signup Successfull but failed to send verification email"});
        }
      });

    }
    else
    {
      console.log("Something Went Wrong!");
      res.sendStatus(404);
    }
  }catch(error)
  {
    console.log(error);

    let outmsg = [];

    if (error.code && error.code === 11000) 
    {
      if('username' in error.keyPattern)
      {
        outmsg.push('Username is Already In Use');
      }

      if('email' in error.keyPattern)
      {
        outmsg.push('Email is Already In Use');
      }
    }

    if(error.errors)
    {
      if(error.errors['username'])
      {
        console.log(error.errors['username'].message);
        outmsg.push(error.errors['username'].message);
      }

      if(error.errors['email'])
      {
        console.log(error.errors['email'].message);
        outmsg.push(error.errors['email'].message);
      }

      if(error.errors['password'])
      {
        console.log(error.errors['password'].message);
        outmsg.push(error.errors['password'].message);
      }
    }
    res.status(404);
    res.send({"msg":"Please enter valid information","errors":outmsg});
  }
});


app.get("/forgot-password",(req,res)=>{
  if(_.isEmpty(req.query) == false)
  {
    // With Parameters

    console.log("With Parameters");
    console.log(req.query);
  }
  else
  {
    // Without Parameters

    console.log("No Parameters");
    console.log("EMPTY");
  }
});


app.get("/api/public/profile/photo/:photoId",async (req,res)=>{
  try {
      let check = mongoose.isValidObjectId(req.params.photoId);
      if(check)
      {
        const file = await gfs.files.findOne(mongoose.Types.ObjectId(req.params.photoId));
        if(file)
        {
          const readStream = gfs.createReadStream(file.filename);
          readStream.pipe(res);
        }
        else
        {
          res.status(404);
          res.send("No Profile Pic Found");
        }
      }
      else { res.send("Invalid")}
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send("Something Went Wrong Try Again Later");
  }
});

app.post("/reset-password",(req,res)=>{


});

app.get("/verify",async (req,res)=>{
  const {token} = req.query;
  if(token)
  {
    console.log(token);
    const decodedToken = signVerificationToken(token);
    console.log(decodedToken);
    if(decodedToken)
    {
      console.log("Successfull. . . ");
      const user = await Account.findOne({_id:decodedToken.id});
      console.log(user);
      if(user)
      {
        if(user.status == 'active')
        {
          res.send("User Already Verified");
        }
        else
        {
          const transction = await Account.updateOne({_id:decodedToken.id},{status:'active'});
          console.log(transction);
          if(transction.acknowledged)
          {
            res.send("Account Verified Successfully");
          }
          else
          {
            res.sendStatus(404);
          }
        }
      }
      else
      {
        res.sendStatus(404);
      }
    }
    else
    {
      console.log("Invalid Token");
      res.sendStatus(404);
    }
  }
  else
  {
    res.send("Invalid Verification URL");
  }
});


/*
app.get("/dashboard", async (req, res) => {

  if(!req.cookies.jwt)
  {
    //JWT Token Not Present
    res.redirect("/login");
    return;
  }

  const decodedToken = autoLogin(req,res);
  if(decodedToken)
  {
    console.log(decodedToken);
    const user = await Account.findOne({_id:decodedToken.id});
    console.log(user);
    if(user)
    {
      if(user.status=='verification')
      {
        // Email Not Verified
        res.send("Welcome to Project Linked List | Email under Verification | Not Active");
      }
      else
      {
        //Active
        res.send("Welcome to Project Linked List | Account Active");
      }
    }
    else
    {
      res.sendStatus(404);
    }
  }
  else
  {
    // Invalid Token
    res.redirect("/login");
  }

});
*/

app.get("/logout", async(req,res)=>{
  res.clearCookie('jwt');
  res.redirect("/login");
});


//User Public Page
app.get('/:username',(req,res,next)=>{

  console.log("============ USER SEARCH =========="); 
  const {username} = req.params;

  //Finding User in Database
  Account.findOne({username:username})
    .then(async (data)=>{
      if(!data)
      {
        //Usernot found
        next();
      }
      else
      {
        //Userfound. Now get his profile to search
        await Profile.updateOne({userid:data._id},{$inc: {totalViews:1}});

        Profile.findOne({userid:data._id})
          .then((profile_data)=>{
            // res.send(profile_data);
            res.render('userpage/index.ejs',{ profile:profile_data,myusername:data.username,myemail:data.email});
          })
          .catch((err)=>{
            next();
          })
      }
    })
    .catch((err)=>{
      next();
    })
});

app.use((req,res)=>{
  // res.send("We coudnout found anything!");
  res.status(404);
  res.render("404page");
});
