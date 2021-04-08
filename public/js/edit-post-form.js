var blogpost_id=GetURLParameter("blogpost");
$(async function(){
    var blogpostId=GetURLParameter("blogpost");
    let post = await getPost(blogpostId);
    if(post.bloguserid!==window.sessionStorage.getItem('usertoken')){
        alert("Invalid Access! Redirecting to dashboard.");
        window.location.href="dashboard.html";
    }
    else{
        renderValues(post);
    }
})
$(document).on('change','#anonymous-author',function(){
    if($(this).is(":checked")){
        $('#blog-author').attr("value","Anonymous");
    }
    else{
        $('#blog-author').attr("value",window.sessionStorage.getItem("username"));
    }
});
async function getPost(blogpostId){
    const Url = `http://localhost:8085/devpost/${blogpostId}`;
    let response = await fetch(Url);
    let data = await response.json();
    return data;
}
function renderValues(blogPost){
    if(blogPost.author.toUpperCase()==="ANONYMOUS"){
        $('#anonymous-author').prop('checked', true);
    }
    $('#blog-title').attr('value',blogPost.title);
    $('#blog-author').attr('value',blogPost.author);
    $('#blog-categories').attr('value',blogPost.categories);
    $('#blog-content').val(blogPost.content);
}
$('#edit-post-form-elem').submit(async function(event){
    event.preventDefault();
    var jsonObject = getFormDataJson();
    var url = `http://localhost:8085/devpost/${blogpost_id}`;
    let response = await updateData(url, jsonObject);
    console.log(response);
    if ($('#edit-post-form-elem').hasClass('has-error')){
        //do nothing
    }
    else{
        alert("Your blog has been updated successfuly!");
        window.location.href = `view-post.html?blogpost=${blogpost_id}`;
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
async function updateData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });
    return response.json();
  }