// this socket is for front-end/Subscribers
// Client-Server

class ChatEngine{

    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        console.log(this.chatBox);
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
        });

        // send the message on clicking send button
        $('#chat-btn').click(function(){
            let msg = $('#chat-field').val();

            if(msg != ''){
                self.socket.emit('send_message', {
                    message : msg,
                    user_email : self.userEmail,
                    chatroom : 'Scafel' 
                });
            }
        });

        // ON receving message 
        self.socket.on('receive_message', function(data){
            console.log("Message received ", data.message);

            let new_msg = $('<li>');

            let messageType = 'reply-text';

            if(data.user_email == self.userEmail){
                messageType = 'user-text';
            }

            // appending message in the list
            new_msg.append($('<span>',{
                'html' : data.message
            }));

            // apppending email of message sender in the list
            new_msg.append($('<sub>',{
                'html' : data.user_email            
            }));

            new_msg.addClass(messageType);

            $('#message-list').append(new_msg);

        })
    }
}