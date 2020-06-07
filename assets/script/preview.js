{
    // adding event listner on file input to display preview of image before uploading
    let p = document.getElementById("avatar");
    p.addEventListener('change', function(event){
        var output = document.getElementById('preview-img');
        //console.log(output);
        output.src = URL.createObjectURL(event.target.files[0]);
        output.style.display = "block";
        output.onload = function() {
        URL.revokeObjectURL(output.src) // free memory
        }
    });
    
}