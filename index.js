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
const LocalStrategy = require("./config/passport_local_strategy");      // setting up local strategy
const JwtStrategy = require("./config/jwt_strategy");                   // seetting up jet strategy
const GoogleStrategy = require("./config/google_strategy_passport");

// for storing session cookie in database
const MongoStore = require('connect-mongo')(session);
// library for sass middleware
const sassMiddleware = require('node-sass-middleware');
// import connect-flash library used to store flash messages in session cookies
const flash = require('connect-flash');
const flashCustom_Mware = require('./controllers/flashMiddleware');

// setting up chat server to be used with socket.io for chat-engine
const chatServer = require('http').Server(app);
const chatSocket = require("./config/chatEngine_socket").chatSocketIO(chatServer);
chatServer.listen(4000);
console.log("Chat Server is running on port 4000");


// using sass middleware
app.use(sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}));


// middleware to read data from form
app.use(express.urlencoded());

// middleware to access cookie parser
app.use(cookie_parser());

// directing app to assets folder for static files
app.use(express.static('./assets'));
// directing path for uploads 
app.use('/upload',express.static(__dirname + '/upload'));

//loading layouts for ejs views
app.use(express_layout);

//extracting styles and scripts from subfiles into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);



//setting up views engine
app.set('view engine', 'ejs');
app.set('views', './views');


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

// use connect-flash to store messages in session cookies
app.use(flash());
// use custom middleware to display flash msgs at front-end
app.use(flashCustom_Mware.flash_session);

//loading router
app.use('/', require("./routes"));


// listening to the server at port
app.listen(port, function(err){
    if(err){
        console.log(`Error in starting server : ${err}`);
    }

    console.log(`Server started at port : ${port}`);
});