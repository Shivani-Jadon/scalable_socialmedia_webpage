const express = require('express');
const app = express();
const port = 8000;

//loading router
app.use('/', require("./routes/index"));

// listening to the server at port
app.listen(port, function(err){
    if(err){
        console.log(`Error in starting server : ${err}`);
    }

    console.log(`Server started at port : ${port}`);
});