$(function(){
    var myStorage = window.sessionStorage;
    var userid = myStorage.getItem('usertoken');
    $('#user-welcome').text(`Welcome, ${myStorage.getItem('username')}`);
})
$(async function(){
    let postsList = await getPosts();
    renderPosts(postsList);
});
async function getPosts(){
    const Url = "http://localhost:8085/devpost/";
    let response = await fetch(Url);
    let data = await response.json();
    return data;
}
function renderPosts(blogPosts){
    for(var blogPostKey in blogPosts){
        var blogPost = blogPosts[blogPostKey];
        if(blogPost.bloguserid!==window.sessionStorage.getItem('usertoken')){
            continue;
        }
        var author = (blogPost.authorid==="anonymous")?"Anonymous":blogPost.author;
        var date = new Date(parseInt(blogPost.date)).toLocaleString('en-GB', {
            weekday: "short",
            year: "numeric",
            month: "2-digit",
            day: "numeric", 
            hour: 'numeric', 
            minute: 'numeric', 
            second: 'numeric',
            hour12: true 
        });
        let html = `
        <div class="col-sm-6">
            <div class="card text-white bg-dark mb-3 text-center" style="width: 80%; margin:40px;">
                <div class="card-body mb-3">
                    <h5 class="card-title"> ${blogPost.title}</h5>
                    <h6 class="card-subtitle mb-3 text-muted" style="padding-bottom:10px;border-bottom:2px solid grey;">${author}</h6>
                    <p class="card-text blog-card-text text-truncate text-nowrap">${blogPost.content}</p>
                    <a href="./view-post.html?blogpost=${blogPost._id}" class="btn btn-primary btn-sm">Read More</a>
                    <a href="./edit-post-form.html?blogpost=${blogPost._id}" class="btn btn-sm" id="editPostBtn" style="color:white;background-color:#8B008B;">Edit</a>     
                    <button class="btn btn-danger btn-sm" id="deletePostBtn" data-blogid="${blogPost._id}">Delete</button>               
                </div>
                <div class="card-footer">
                    <small class="text-muted">Last updated on ${date}</small>
                </div>
            </div>
        </div>
        `
        $('#user-blogs-section').prepend(html);
    }
}
$(document).on('click','#deletePostBtn',async function(){
    var blogpostId = $(this).data("blogid");
    var ans = confirm("Are you sure you want to delete this post?");
    if(ans){
        var url = `http://localhost:8085/devpost/${blogpostId}`;
        let response = await deleteData(url);
        console.log(response);
    }
    alert("Your blog has been deleted successfuly!");
    window.location.href = 'dashboard.html';
})
async function deleteData(url = '') {
    const response = await fetch(url, {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
    });
    return response.json();
  }
  $(document).on('click','#logoutBtn',function(){
    var sessionStore = window.sessionStorage;
    sessionStore.removeItem('usertoken');
    sessionStore.removeItem('username');
    window.location.href='../index.html';
})