const express = require('express');
const app = express();
const port = 8000;
const express_layout = require('express-ejs-layouts');

//loading layouts for ejs views
app.use(express_layout);

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