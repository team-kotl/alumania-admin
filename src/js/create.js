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
    // Create notification element
    const notification = document.createElement('div');
    notification.classList.add('notification');

    // Create message text
    const messageText = document.createElement('span');
    messageText.textContent = message;
    
    // Append message and close button to notification
    notification.appendChild(messageText);
    
    // Append notification to container
    document.getElementById('notificationContainer').appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Validate form input
function validateForm() {
    const eventTitle = document.querySelector('input[name="eventTitle"]');
    const description = document.querySelector('textarea[name="description"]');
    const location = document.querySelector('input[name="location"]');
    const category = document.querySelector('select[name="category"]');
    const schedule = document.querySelector('input[name="schedule"]');

    // Check if the fields are empty
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

    return true; // All checks passed
}

// Handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    if (!validateForm()) {
        return; // Validation failed, do not proceed
    }

    const formData = new FormData(document.getElementById('eventForm'));

    fetch('submit_event.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        showNotification(data); // Show the success message or any other response from the server
    })
    .catch(error => {
        showNotification('An error occurred: ' + error.message);
    });
}