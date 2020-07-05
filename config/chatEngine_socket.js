// Socket for server

module.exports.chatSocketIO = function(serverSocket){
    let io = require('socket.io')(serverSocket);

    // request to send on connection request for sockets
    io.sockets.on('connection', function(socket){
        console.log("New Connection received from ",socket.id);

        // when this connection is disconnected/lost due to any reason such as page refresh
        socket.on('disconnect', function(){
            console.log("Connection Lost with Socket");
        }) 
    });
}