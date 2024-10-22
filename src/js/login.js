let showicon = document.getElementById("showicon");
let password = document.getElementById("password");

showicon.onclick = function () {
    if (password.type == "password") {
        password.type = "text";
        showicon.src = "res/hide_pass.png";
    } else {
        password.type = "password";
        showicon.src = "res/show_pass.png";
    }
};