$(function(){
    var sessionStore = window.sessionStorage;
    if(sessionStore.getItem('usertoken')!==null&&sessionStore.getItem('usertoken')!==undefined){
        $('#blog-author').attr("value",sessionStore.getItem("username"));
    }
    else{
        $('#blog-author').attr("value","Anonymous");
        $('#anonymous-author').prop('checked',true);
        $('#anonymous-author').prop('disabled',true);
    }
    $("#blog-author").prop('disabled', true);
    $("#blog-author").css({'background-color':'#989898',"font-weight":"bolder"});
});
$(document).on('change','#anonymous-author',function(){
    if($(this).is(":checked")){
        // alert('You will not be able to edit/delete a post that has been posted as anonymous.');
        $('#blog-author').attr("value","Anonymous");
    }
    else{
        $('#blog-author').attr("value",window.sessionStorage.getItem("username"));
    }
});
$('#add-post-form-elem').submit(async function(event){
    event.preventDefault();
    var jsonObject = getFormDataJson();
    var url = "http://localhost:8085/devpost/";
    let response = await postData(url, jsonObject);
    console.log(response);
    if ($('#add-post-form-elem').hasClass('has-error')){
        //do nothing
    }
    else{
        alert("Your blog has been published successfuly!");
        window.location.href = 'posts-page.html';
    }
})
function getFormDataJson(){
    var jsonObject = new Object();
    var title = $('#blog-title').val();
    var author = $('#blog-author').val();
    var categories = $('#blog-categories').val().split(",");
    var content = $("#blog-content").val();
    jsonObject["title"] = title;
    jsonObject["author"] = author
    jsonObject["categories"] = categories;
    jsonObject["content"] = content;
    jsonObject["bloguserid"] = window.sessionStorage.getItem('usertoken')
    if(author.toUpperCase()==='ANONYMOUS'){
        jsonObject["authorid"] = 'anonymous';
    }
    else{
        jsonObject["authorid"] = window.sessionStorage.getItem('usertoken');
    }
    return jsonObject;
}
