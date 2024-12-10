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

function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById('login-form'));

    fetch('src/core/login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        if(data == "Login Successful") {
            window.location.href = 'src/core/dashboard.php'; 
        } else {
            showNotification(data);
            document.querySelector("#username").value = '';
            document.querySelector("#password").value = '';
        }
    })
    .catch(error => {
        showNotification('An error occurred: ' + error.message);
    });
}

function showNotification(message) {
    
    const notification = document.createElement('div');
    notification.classList.add('notification');

    
    const messageText = document.createElement('span');
    messageText.textContent = message;
    
    
    notification.appendChild(messageText);
    
    
    document.getElementById('notificationContainer').appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}
