$('#register-form-elem').submit(async function(event){
    event.preventDefault();
    var jsonObject = getFormDataJson();
    var url = "http://localhost:8085/users/register";
    let response = await postData(url, jsonObject);
    if ($('#register-form-elem').hasClass('has-error')){
        //do nothing
    }
    else{
        if(response.success){
            alert("You have registered successfully!");
            window.location.href = 'login.html';
        }
        else{
            alert("An account with this e-mail address already exists.");
        }
    }
})
function getFormDataJson(){
    var jsonObject = new Object();
    var email = $('#user-email').val();
    var password = $('#user-password').val();
    var name = $('#user-name').val();
    jsonObject["email"] = email;
    jsonObject["password"] = password;
    jsonObject["name"] = name;
    return jsonObject;
}