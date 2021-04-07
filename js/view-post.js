$(async function(){
    var blogpostId=GetURLParameter("blogpost");
    let post = await getPost(blogpostId);
    renderPost(post);
});
async function getPost(blogpostId){
    const Url = `http://localhost:8085/devpost/${blogpostId}`;
    let response = await fetch(Url);
    let data = await response.json();
    return data;
}
function renderPost(blogPost){
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
        var content = blogPost.content.replace(/\n/g, "<br />");
        let html = `
        <div class="row mb-3" style="border-bottom:2px solid white;">
            <h1 class="display-4" style="text-transform:uppercase;">${blogPost.title}</h1>
        </div>
        <div class="row">
            <p><small>Posted by <em>${blogPost.author}</em> on ${date}</small></p>
        </div>
        <div class="row mb-3">
            <p><small>Categories: <em>${blogPost.categories}</em></small></p>
        </div>
        <div class="row" style="padding:10px;background-color:rgba(255,255,255,0.10);">
            ${content}
        </div>
        `
        $('#read-post-section').prepend(html);
}