<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
    <link rel="stylesheet" href="../../res/styles/create.css">
    <title>Alumania</title>
</head>

<body>
    <?php include 'navbar.php'; ?>

    <div class="content-container">
        <div class="header">
            <h1>Create</h1>
            <p>Create an Event or a Job oppurtunity</p>
        </div>

        <div class="main-content">
            <div class="image-container">
                <img src="../../res/event.png" alt="Event Picture" class="select-image" id="eventImage">
                <img src="../../res/job-listing.png" alt="Job Listing Picture" class="select-image" id="jobImage">
            </div>
            <div class="vertical-line"></div>

            <div class="right-panel" id="rightPanel">
                <p>Please select the type of post you want to create</p>

                <div class="file-upload" id="fileUploadSection" style="display: none;">
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                            <path fill="currentColor"
                                d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                                fill-rule="evenodd" clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <div class="text">
                        <span>Click to upload image</span>
                    </div>
                    <input type="file" id="file">
                </div>

                <div class="input" id="inputSectionEvent" style="display: none;">
                    <label for="eventTitle" class="text">Event Title</label>
                    <input type="text" placeholder="Insert title here" name="eventTitle" class="input">

                    <label for="description" class="text">Description</label>
                    <textarea placeholder="Insert description here" name="description"
                        class="input description-input-event" rows="4"></textarea>

                    <label for="location" class="text">Location</label>
                    <input type="text" placeholder="Insert location here" name="location" class="input">


                    <div class="input-container">
                        <div class="input-left">
                            <label for="category" class="text">Category</label>
                            <select name="category" class="input category-input" id="category">
                                <option value="" selected>Select Category</option>
                                <option value="reunion">Reunion</option>
                                <option value="community_service">Community Service</option>
                                <option value="seminar">Seminar</option>
                                <option value="family">Family</option>
                            </select>
                        </div>
                        <div class="input-right">
                            <label for="schedule" class="text">Schedule</label>
                            <input type="text" placeholder="Set date and time" name="schedule" class="input">
                        </div>
                    </div>
                </div>


                <div class="input" id="inputSectionJob" style="display: none;">
                    <label for="jobTitle" class="text">Job Title</label>
                    <input type="text" placeholder="Insert title here" name="jobTitle" class="input">

                    <label for="description" class="text">Description</label>
                    <textarea placeholder="Insert description here" name="description" class="input description-input"
                        rows="4"></textarea>


                    <label for="location" class="text">Location</label>
                    <input type="text" placeholder="Insert location here" name="location" class="input">

                    <label for="category" class="text">Category</label>
                    <input type="text" placeholder="Insert company name here" name="category" class="input">
                </div>

            </div>
        </div>
    </div>

    <script>
        const navbar = document.querySelector('.navbar');
        const navToggle = document.querySelector('.nav-toggle');
        const contentContainer = document.querySelector('.content-container');

        navToggle.addEventListener('click', () => {
            navbar.classList.toggle('collapsed');
            mainContent.classList.toggle('shifted');
        });
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

    </script>

</body>

</html>
</body>