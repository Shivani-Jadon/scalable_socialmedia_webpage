const { post } = require("../../controllers/userPosts");

{
    class ToggleLike{

        constructor(toggleElement){
            this.toggler = toggleElement;
            this.like_toggler();
        }

        like_toggler()
        {
            $(this.toggler).click(function(event){
                event.preventDefault();

                $.ajax({
                    type : post,
                    url : $(self).attr('href'),
                })
                .done(function(data){
                
                    let like_count = parseInt($(self).attr('data-likes'));
                    console.log(like_count);

                    if(data.data.deleted == true)
                    {
                        --like_count;
                    }else{
                        ++like_count;
                    }
                        
                    $(self).attr('data-likes' ,like_count);
                    $(self).html(`${like_count} Likes`);
                    
                })
                .fail(function(errData){
                    console.log("Error in comleting request");
                })
            })
        };

    }

}