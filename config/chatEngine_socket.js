// Socket for server/Observer
// Server to client

module.exports.chatSocketIO = function(serverSocket){
    let io = require('socket.io')(serverSocket);

    // request to send on connection request for sockets
    io.sockets.on('connection', function(socket){
        console.log("New Connection received from ",socket.id);

        // ON is fired when an event is received
        // EMIT is fired when an event is sent/acknowledged
        // when this connection is disconnected/lost due to any reason such as page refresh
        socket.on('disconnect', function(){
            console.log("Connection Lost with Socket");
        }) 

        // ON receiving room joining request from client
        socket.on('join_room', function(data){
            console.log("Joining request received ", data);

            // creating or joining chatroom
            socket.join(data.chatroom);

            // EMIT acknowledgement from server to user that user has joined the chatroom
            io.in(data.chatroom).emit('user_joined', data);
        });
    });
}