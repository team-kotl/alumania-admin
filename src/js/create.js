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