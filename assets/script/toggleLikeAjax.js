
    // creating class for Like toggler

    class ToggleLike{

        constructor(toggleElement){
            this.toggler = toggleElement;
            this.like_toggler();
        }

        // function sending ajax request for toggling like
        like_toggler()
        {
            $(this.toggler).click(function(event){
                event.preventDefault();
                let self = this;

                $.ajax({
                    type : 'post',
                    url : $(self).attr('href'),
                })
                .done(function(data){
                
                    let like_count = parseInt($(self).attr('data-likes'));
                    console.log(like_count);

                    // if the like is removed then decrease the count of toggler
                    if(data.data.deleted == true)
                    {
                        --like_count;
                    }
                    // if the like is added then increase the count of toggler
                    else{
                        ++like_count;
                    }
                        
                    // changing the attribute value and html for likes
                    $(self).attr('data-likes' ,like_count);
                    $(self).html(`${like_count} Likes`);
                    
                })
                .fail(function(errData){
                    console.log("Error in completing request");
                })
            })
        };

    }

