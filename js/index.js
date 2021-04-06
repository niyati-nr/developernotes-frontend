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
        /*let html = `
        <div class="col-sm-6">
            <div class="card border-light bg-light mb-3 text-center" style="width: 80%; margin:40px;">
                <div class="card-header">
                    ${blogPost.title}
                </div>
                <div class="card-body">
                    <h6 class="card-subtitle mb-3 text-muted">${date}</h6>
                    <p class="card-text blog-card-text  text-truncate text-nowrap">${blogPost.content}</p>
                    <a href="#" class="btn btn-primary">Read More</a>
                </div>
            </div>
        </div>`;*/
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