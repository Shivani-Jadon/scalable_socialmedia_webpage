const express = require('express');
const app = express();
const cookie_parser = require('cookie-parser');
const port = 8000;
const express_layout = require('express-ejs-layouts');
const db = require("./config/mongoose");
// library for session cookies 
const session = require('express-session');
// importing passport for authentication
const passport = require('passport');
const LocalStrategy = require("./config/passport_local_strategy");
// for storing session cookie in database
const MongoStore = require('connect-mongo')(session);


// middleware to read data from form
app.use(express.urlencoded());

// middleware to access cookie parser
app.use(cookie_parser());

// directing app to assets folder for static files
app.use(express.static('./assets'));

//loading layouts for ejs views
app.use(express_layout);

//extracting styles and scripts from subfiles into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// middleware to session cookie
app.use(session({
    name : 'e-cookie',
    // change the secret key before production deployment
    secret : 'mywayofencryption',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 100)            //defining the maximum age of cookie
    },
    // the sesion cookie will be store in mongodb via connect-mongo
    store : new MongoStore(
        {
            mongooseConnection : db, 
            autoRemove : 'disabled'             
        },
        function(err){
            // either print error or success msg 
            console.log(err || "connect-mongodb setup successful")
        }
    )
}));

// middleware to use passport
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//loading router
app.use('/', require("./routes"));

//setting up views engine
app.set('view engine', 'ejs');
app.set('views', './views');

// listening to the server at port
app.listen(port, function(err){
    if(err){
        console.log(`Error in starting server : ${err}`);
    }

    console.log(`Server started at port : ${port}`);
});