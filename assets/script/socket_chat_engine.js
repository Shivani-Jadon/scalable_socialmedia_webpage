// this socket is for front-end/Subscribers
// Client-Server

class ChatEngine{

    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect("http://localhost:4000");

        // check user before extablishing connection
        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self = this;

        // on request to connect sockets
        this.socket.on('connect', function(){
            console.log("Connection has been established using Socket....");
        })

        // emit request to join
        // the client will join the room already created or a new room is created
        self.socket.emit('join_room', {
            user_email : self.userEmail,
            chatroom : 'Scafel'
        });

        // ON receiving acknowledgement the client is notified
        self.socket.on('user_joined', function(data){
            console.log("A new User joined the chat room ",data);
        })
    }
}