const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const contentContainer = document.querySelector('.content-container');

navToggle.addEventListener('click', () => {
    navbar.classList.toggle('collapsed');
});

function wipAlert() {
    alert('This section is currently being worked on :)');
}

function setActiveNav(tabId, iconId, tabNo) {
    const navBarItem = document.getElementById(tabId);
    const navBarIcon = document.getElementById(iconId);
    navBarItem.classList.add("active-tab");
    const itemText = navBarIcon.nextElementSibling.style.color = '#0066ff';
    switch (tabNo) {
        case 1:
            navBarIcon.src = "../../res/dashboard-blue.png";
            break;
        case 2:
            navBarIcon.src = "../../res/create-blue.png";
            break;
        case 3:
            navBarIcon.src = "../../res/users-blue.png";
            break;
        case 4:
            navBarIcon.src = "../../res/applications-blue.png";
            break;
        case 5:
            navBarIcon.src = "../../res/posts-blue.png";
            break;
        case 6:
            navBarIcon.src = "../../res/settings-blue.png";
            break;
    }
}