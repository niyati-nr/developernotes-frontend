$(async function(){
    var myStorage = window.sessionStorage;
    if(myStorage.getItem('usertoken')===null||myStorage.getItem('usertoken')===undefined){
        renderRegisterBtn();
        renderLoginBtn();
    }
    else{
        renderUserBtn();
        renderLogoutBtn();
    }
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
    var count=0;
    var blogKeys = Object.keys(blogPosts).reverse();
    for(var i=0;i<blogKeys.length;i++){
        if(count===4){
            break;
        }
        var blogPost = blogPosts[blogKeys[i]];
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
                    <h6 class="card-subtitle mb-3 text-muted" style="padding-bottom:10px;border-bottom:2px solid grey;">${blogPost.author}</h6>
                    <p class="card-text blog-card-text text-truncate text-nowrap">${blogPost.content}</p>
                    <a href="./views/view-post.html?blogpost=${blogPost._id}" class="btn btn-secondary btn-sm">Read More</a>                
                </div>
                <div class="card-footer">
                    <small class="text-muted">Last updated on ${date}</small>
                </div>
            </div>
        </div>
        `
        $('#blog-posts-home-section').append(html);
        count++;
    }
}
async function checkUserStatus(){
    const Url = "http://localhost:8085/users/profile";
    let response = await fetch(Url,{
        method:'GET',
        mode: 'cors',
        cache: 'default',
        headers: {
            'Content-Type': 'application/json',
            'Accept':'*/*',
            'Accept-Encoding':['gzip','deflate','br'],
            'Connection':'keep-alive'
          }
    });
    console.log(response);
    let data = await response.json();
    return data;
}
function renderRegisterBtn(){
    let html = `
    <a class="dev-text nav-btn-right" id="registerBtn" href="./views/register.html" style="margin:0vw 4vw 0vw 4vw;">Sign Up</a>
    `;
    $('#nav-anchor-right').append(html);
}
function renderLoginBtn(){
    let html = `
    <a class="dev-text nav-btn-right" id="loginBtn" href="./views/login.html">Login</a>
    `;
    $('#nav-anchor-right').append(html);
}
function renderUserBtn(){
    let html = `
    <a class="dev-text nav-btn-right" id="userBtn" href="./views/dashboard.html" style="margin-left:4vw;">${window.sessionStorage.getItem('username')}</a>
    `;
    $('#nav-anchor-right').append(html);
}
function renderLogoutBtn(){
    let html = `
    <a class="dev-text nav-btn-right" id="logoutBtn" href="index.html" style="margin-left:4vw;">Logout</a>
    `;
    $('#nav-anchor-right').append(html);
}
$(document).on('click','#logoutBtn',function(){
    var sessionStore = window.sessionStorage;
    sessionStore.removeItem('usertoken');
    sessionStore.removeItem('username');
    window.location.href='index.html';
})