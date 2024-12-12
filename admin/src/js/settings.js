/* Author: Cariel Joyce Maga and Freskie Encarnacion 
   Description: Handles logout and generate animations, manages popups 
   for logout and key generation, and includes functionality for copying 
   the admin key to the clipboard and clearing input fields*/
const logoutAnimation = document.getElementById("logout-animation");
const generateAnimation = document.getElementById("generate-animation");
const overlay = document.querySelector('.overlay');
const cancelBtn = document.querySelector('.cancel-btn');

document.querySelector(".logout").addEventListener("mouseenter", () => {
    logoutAnimation.setAttribute("loop", "true");
    logoutAnimation.play();
});

document.querySelector(".logout").addEventListener("mouseleave", () => {
    logoutAnimation.removeAttribute("loop");
});

document.querySelector(".generate").addEventListener("mouseenter", () => {
    generateAnimation.setAttribute("loop", "true");
    generateAnimation.play();
});

document.querySelector(".generate").addEventListener("mouseleave", () => {
    generateAnimation.removeAttribute("loop");
    generateAnimation.stop();
});


// POPUP
document.querySelector(".logout").addEventListener("click", () => togglePopup("popup-logout"));
document.querySelector(".generate").addEventListener("click", () => togglePopup("popup-generate"));
function togglePopup(popupId) {
    document.getElementById(popupId).classList.toggle("active");
}

function closeAndClearInput() {
    document.getElementById('generatedKey').value = '';
    togglePopup('popup-generate');
}


// COPY GENERATED ADMIN KEY
function copyToClipboard() {
    const input = document.querySelector('.text');
    input.select();
    navigator.clipboard.writeText(input.value).then(() => {
        alert('Admin key copied to clipboard!');
    }).catch(err => {
        console.error('Error copying text: ', err);
    });
}

// Cancel button
cancelBtn.addEventListener('click', () => {
    togglePopup('popup-logout');
  });

