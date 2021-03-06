{
    // noty object for notification
    let noty_msg = new Noty({type : 'success',
                            timeout : 1000});

    // function to show notification
    function showNotification(msg){
        noty_msg.setText(msg,true);
        noty_msg.show();
    }

   

    // adding/creating new post
    let createPost = function(){
        let postForm = $("#posting-form");
        
        postForm.submit(function(event){
            event.preventDefault();

            $.ajax({
                type : 'post',
                url : '/posts/create_post',
                data : postForm.serialize(),            //serialize() sends data in json format
                success : function(data){
                    //console.log(data);

                    let newPost = newPostDOM(data.data.post);
                    
                    $('#post-list-container>ul').prepend(newPost); 
                    // function callback for deleting post
                    deletePostDOM($(` .post-del-btn`, newPost));  

                    // :: change funaction callback for toggling like on posts
                    new ToggleLike($(` .toggle-like-btn`, newPost));

                    let flashMsg = "new post created by your profile";
                    showNotification(flashMsg);    
                },
                error : function(error){
                    console.log(error.responseText);
                }
            })
        });
    }


    // method to create a post in DOM
    let newPostDOM = function(post){

        return $(`<li id="user-post-id-${post._id}">
        <p>
            ${ post.content } &nbsp;
            <!-- tag for deleting user's post -->
            
                <a class="post-del-btn" href="/posts/delete-post/${ post._id }">
                    <b>x</b>
                </a>
                                    
            <br/>
            
            <small>
                ${ post.userInfo.first_name }
                ${  post.userInfo.last_name }
            </small> 
            <!-- :: change -->
            <small>
                <a class="toggle-like-btn" data-likes="0" href="/like/toggle/?id=${post._id}&type=postModel">
                    <!--<button type="button" value="Like"></button>-->
                    <span>0 Likes</span> 
                </a>
            </small>        

        </p>
        
        
        <div class="post-comments">
            <form action="/posts/comment" method="POST">
                <input type="text" name="content" placeholder="Comment here....">
                <input type="hidden" name="post" value="${ post._id }">
                <input type="submit" value="Add Comment">
            </form>
        </div>
       
        
        
        <div class="comment-container">
            <ul class="comment-list">
                
            </ul>
        </div>
    </li>`)
    }


    // method to delete a post from DOM
    let deletePostDOM = function(deleteLink){

        $(deleteLink).click(function(event){
            event.preventDefault();

            $.ajax({
                type : 'get',
                url : $(deleteLink).prop('href'),
                success : function(data){
                    $(`#user-post-id-${data.data.post_id}`).remove();
                    let flashMsg = "post has been removed";
                    showNotification(flashMsg);
                },
                error : function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    // calling createPost
    createPost();


    // adding deletion functionality to earlier posts
    let addDeletion = function(){
        $('#post-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .post-del-btn', self);
            //console.log(deleteButton);
            deletePostDOM(deleteButton);

        });
    }    

    // calling addDeletion
    addDeletion();
    
}