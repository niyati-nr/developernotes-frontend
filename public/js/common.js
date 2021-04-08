$(async function(){
    var myStorage = window.sessionStorage;
    if(myStorage.getItem('usertoken')===null||myStorage.getItem('usertoken')===undefined){
        renderRegisterBtn();
        renderLoginBtn();
    }
    else{
        renderWelcomeText();
        renderLogoutBtn();
    }
});
async function checkUserStatus(){
    const Url = "http://localhost:8085/users/profile";
    let response = await fetch(Url);
    let data = await response.json();
    return data;
}
function renderRegisterBtn(){
    let html = `
    <a class="dev-text nav-btn-right" id="registerBtn" href="./register.html" style="margin:0vw 4vw 0vw 4vw;">Sign Up</a>
    `;
    $('#nav-anchor-right').append(html);
}
function renderLoginBtn(){
    let html = `
    <a class="dev-text nav-btn-right" id="loginBtn" href="./login.html">Login</a>
    `;
    $('#nav-anchor-right').append(html);
}
function renderWelcomeText(){
    let html = `
    <a class="dev-text nav-btn-right" href="./dashboard.html" style="margin-left:4vw;">${window.sessionStorage.getItem('username')}</a>
    `;
    $('#nav-anchor-right').append(html);
}
function renderLogoutBtn(){
    let html = `
    <a class="dev-text nav-btn-right" id="logoutBtn" href="#" style="margin-left:4vw;">Logout</a>
    `;
    $('#nav-anchor-right').append(html);
}
function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}
$(document).on('click','#logoutBtn',function(){
    var sessionStore = window.sessionStorage;
    sessionStore.removeItem('usertoken');
    sessionStore.removeItem('username');
    window.location.href='../index.html';
})