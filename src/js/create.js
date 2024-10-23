const originalEventImageSrc = '../../res/event.png';
const originalJobImageSrc = '../../res/job-listing.png';
const fileUploadSection = document.getElementById('fileUploadSection');
const inputSectionEvent = document.getElementById('inputSectionEvent');
const inputSectionJob = document.getElementById('inputSectionJob');
const fileInput = document.getElementById('file');

document.getElementById('eventImage').addEventListener('click', function () {

    fileUploadSection.style.display = 'flex';
    inputSectionEvent.style.display = 'flex';

    document.getElementById('rightPanel').innerHTML = '';
    document.getElementById('rightPanel').appendChild(fileUploadSection);
    document.getElementById('rightPanel').appendChild(inputSectionEvent);

    this.src = '../../res/event-blue.png';
    document.getElementById('jobImage').src = originalJobImageSrc;
});

document.getElementById('jobImage').addEventListener('click', function () {

    inputSectionJob.style.display = 'flex';

    document.getElementById('rightPanel').innerHTML = '';
    document.getElementById('rightPanel').appendChild(inputSectionJob);

    this.src = '../../res/job-listing-blue.png';
    document.getElementById('eventImage').src = originalEventImageSrc;
});

fileUploadSection.addEventListener('click', function () {
    fileInput.click();
});

fileInput.addEventListener('change', function (event) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
        console.log("File selected:", selectedFile.name);
    }
});

function showNotification(message) {
    
    const notification = document.createElement('div');
    notification.classList.add('notification');

    
    const messageText = document.createElement('span');
    messageText.textContent = message;
    
    
    notification.appendChild(messageText);
    
    
    document.getElementById('notificationContainer').appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 5000);
}


function validateForm() {
    const eventTitle = document.querySelector('input[name="eventTitle"]');
    const description = document.querySelector('textarea[name="description"]');
    const location = document.querySelector('input[name="location"]');
    const category = document.querySelector('select[name="category"]');
    const schedule = document.querySelector('input[name="schedule"]');

    
    if (!eventTitle.value.trim()) {
        showNotification('Event Title cannot be empty.');
        return false;
    }
    if (!description.value.trim()) {
        showNotification('Description cannot be empty.');
        return false;
    }
    if (!location.value.trim()) {
        showNotification('Location cannot be empty.');
        return false;
    }
    if (!category.value) {
        showNotification('Please select a Category.');
        return false;
    }
    if (!schedule.value.trim()) {
        showNotification('Schedule cannot be empty.');
        return false;
    }

    return true; 
}


function handleSubmit(event) {
    event.preventDefault(); 

    if (!validateForm()) {
        return; 
    }

    const formData = new FormData(document.getElementById('eventForm'));

    fetch('submit_event.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        showNotification(data); 
        setTimeout(() => {
            window.location.href = 'create.php'; 
        }, 3500); 
    })
    .catch(error => {
        showNotification('An error occurred: ' + error.message);
    });
}

// Job Post Form Submit
document.getElementById('jobpostForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent normal form submission
    
    // Perform input validation
    const jobTitle = document.querySelector('input[name="jobTitle"]').value;
    const description = document.querySelector('textarea[name="description"]').value;
    const location = document.querySelector('input[name="location"]').value;
    const company = document.querySelector('input[name="category"]').value;

    if (!jobTitle || !description || !location || !company) {
        showNotification("All fields are required.");
        return;
    }

     // Create a FormData object to send the form data via AJAX
     const formData = new FormData(document.getElementById('jobpostForm'));

     // Send the AJAX request
     fetch('submit_jobpost.php', {
         method: 'POST',
         body: formData
     })
     .then(response => response.text())
     .then(data => {
         // Handle the response from PHP
         showNotification(data);
         setTimeout(() => {
            window.location.href = 'create.php'; 
        }, 3000); 
     })
     .catch(error => {
         console.error('Error:', error);
     });
});
