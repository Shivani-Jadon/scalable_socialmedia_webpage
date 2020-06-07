{
    console.log("comment");
    // noty object for notification
    let noty_msg = new Noty({type : 'success',
                            timeout : 1000});

    // function to show notification
    function showNotification(msg){
        noty_msg.setText(msg,true);
        noty_msg.show();
    }


    // adding/creating new post
    let createComment = function(postId){
        let commentForm = $(`#comment-form-${postId}`);
        
        commentForm.submit(function(event){
            event.preventDefault();

            $.ajax({
                type : 'post',
                url : '/posts/comment',
                data : commentForm.serialize(),            //serialize() sends data in json format
                success : function(data){
                    //console.log(data);

                    let newComment = newCommentDOM(data.data.comment);
                    let post_id = data.data.comment.post;

                    $(`#user-post-id-${post_id} .comment-container>ul`).prepend(newComment); 
                    // function callback for deleting comment
                    deleteComment($(` .comment-del-btn`, newComment));
                    let flashMsg = "new comment created by your profile";
                    showNotification(flashMsg);    
                },
                error : function(error){
                    console.log(error.responseText);
                }
            })
        });
    }


    // function to delete comment
    let deleteComment = function(deleteLink){
    
        $(deleteLink).click(function(event){
            event.preventDefault();

            $.ajax({
                type : 'get',
                url : $(deleteLink).prop('href'),
                success : function(data){
                    $(`#user-comment-${data.data.comment_id}`).remove();
                    let flashMsg = "comment has been removed";
                    showNotification(flashMsg);
                },
                error : function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    // method to create a comment in DOM
    let newCommentDOM = function(comment){

        return $(`<li id="user-comment-${ comment._id }">
            ${ comment.content }
            <a class="comment-del-btn" href="/posts/delete-comment/${ comment._id }" >
                <b>x</b>
            </a>    
            <br/>
            <small>
                ${ comment.user.first_name }
            </small>
        </li>`
        );
    }


    // commenting functionality to all posts
    let addComment = function(){

        $('#post-list-container>ul>li').each(function(){

            let self = $(this);
            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[3];
        
            // function call to add new comment to the post
            createComment(postId);
            
        });
        
    }

    // add new comment to posts
    addComment();

    // comment deletion functionality to earlier comments
    let deletePrevComment = function(){
        
        $('.comment-container>ul>li').each(function(){

            // iterating through elements of the list
            let self = $(this);
            console.log(self, count);
                           
            let deleteBtn = $(` .comment-del-btn`, self);
            //console.log(deleteBtn);
            deleteComment(deleteBtn);
                        
        });        
    }

    // calling function to delete previous comments 
    deletePrevComment();
    
}