{
    // noty object for notification
    let noty_msg = new Noty({type : 'success',
                            timeout : 1000});

    // function to show notification
    function showNotification(msg){
        noty_msg.setText(msg,true);
        noty_msg.show();
    }

    // adding deletion functionality to earlier posts
    let addDeletion = function(){

        $.ajax({
            type : 'get',
            url : '/posts/user_posts',
            success : function(data){
                //console.log(data.data.posts);
                let all_posts = data.data.posts;
                for (let post of all_posts){ 
                    
                    let prevPost = newPostDOM(post);
                    console.log(prevPost);
                    deletePostDOM($(` .post-del-btn`, prevPost));  
                }
            },
            error : function(error){
                console.log(error.responseText);
            }
        })
    }

    // calling deletion 
    addDeletion();

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
    
}