// this socket is for front-end
class ChatEngine{

    constructor(chatBoxId, userId){
        this.chatBox = $(`#${chatBoxId}`);
        this.userId = userId;

        this.socket = io.connect("http://localhost:4000");

        // check user before extablishing connection
        if(this.userId){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        // on request to connect sockets
        this.socket.on('connect', function(){
            console.log("Connection has been established using Socket....");
        })
    }
}