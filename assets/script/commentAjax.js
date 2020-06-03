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


    // commenting functionality to all posts
    let addComment = function(){

        $.ajax({
            type : 'get',
            url : '/posts/user_posts',
            success : function(data){
                //console.log(data.data.posts);
                let all_posts = data.data.posts;
                for (let post of all_posts){
                    //console.log(post._id);
                    createComment(post._id);
                }
            }
        })
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
                    console.log(data);

                    let newComment = newCommentDOM(data.data.comment);
                    let post_id = data.data.comment.post;
                    console.log(data.data.comment.post);

                    $(`#user-post-id-${post_id} .comment-container>ul`).prepend(newComment); 
                    // // function callback for deleting post
                    // //deletePostDOM($(` .post-del-btn`, newComment));  
                    let flashMsg = "new comment created by your profile";
                    showNotification(flashMsg);    
                },
                error : function(error){
                    console.log(error.responseText);
                }
            })
        });
    }


    // method to create a post in DOM
    let newCommentDOM = function(comment){

        return $(`<li id="user-comment-${ comment._id }">
            ${ comment.content }
            <a href="/posts/delete-comment/${ comment._id }" >
                <b>x</b>
            </a>    
            <br/>
            <small>
                ${ comment.user.first_name }
            </small>
        </li>`
        );
    }


    addComment();
}