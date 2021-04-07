$('#login-form-elem').submit(async function(event){
    event.preventDefault();
    var jsonObject = getFormDataJson();
    var url = "http://localhost:8085/users/login";
    let response = await postData(url, jsonObject);
    if ($('#login-form-elem').hasClass('has-error')){
        //do nothing
    }
    else{
        if(response.isAuth!==null&&response.isAuth!==undefined&&response.isAuth){
            alert("Login Successful!");
            var myStorage = window.sessionStorage;
            myStorage.setItem('usertoken',response.id);
            myStorage.setItem('username',response.name);
            window.location.href = 'dashboard.html';
        }
        else{
            alert("Invalid Credentials. Try again.");
        }
    }
})
function getFormDataJson(){
    var jsonObject = new Object();
    var email = $('#user-email').val();
    var password = $('#user-password').val();
    jsonObject["email"] = email;
    jsonObject["password"] = password;
    return jsonObject;
}