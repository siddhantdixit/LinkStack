


$('#add_user').submit(function(event){
    alert("Data Inserted Successfully!");
})

$('#update_link').submit(function(event){
    event.preventDefault();

    var unindexed_array=$(this).serializeArray();
    var data={}

     $.map(unindexed_array,function(n,i){
       data[n['name']]=n['value']
     })

    console.log(data)

    var request={
        "url":`/dashboard/api/links/${data.id}`,
        "method":"PUT",
        "data":data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!")
    })
})

$ondelete=$(".table tbody td a.delete");
$ondelete.click(function(){
    var id=$(this).attr("data-id")

    var request={
        "url":`/dashboard/api/links/${id}`,
        "method":"DELETE"
    } 

    if(confirm("Do you really want to delete this record ?")){
        $.ajax(request).done(function(response){
            alert("Data Deleted Successfully!")
            location.reload()
        })  
    }
})


// Profile Pic Upload Css
$(document).ready(function() {
	
    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.profile-pic').attr('src', e.target.result);
            }
    
            reader.readAsDataURL(input.files[0]);
        }
    }
   
    $(".file-upload").on('change', function(){
        readURL(this);
    });
    
    $(".upload-button").on('click', function() {
       $(".file-upload").click();
    });
});