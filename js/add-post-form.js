(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                    form.classList.add('has-error');
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();
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
    jsonObject["author"] = author;
    jsonObject["categories"] = categories;
    jsonObject["content"] = content;
    return jsonObject;
}
async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
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