<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
    <link rel="stylesheet" href="../../res/styles/posts.css">
    <title>Alumania</title>
</head>

<body>
    <?php include 'navbar.php'; ?>

    <?php
    require_once '..\database\database.php';
    $db = \Database::getInstance()->getConnection();

    $event_hasResults = false;
    $job_hasResults = false;
    $job_query = "SELECT jobpid, title, location, description, companyname FROM jobpost";
    $event_query = "SELECT eventid, title, description, category, eventtime, eventdate, eventloc, eventphoto FROM event";
    $job_result = mysqli_query($db, $job_query);
    $event_result = mysqli_query($db, $event_query);
    $jobpostings = [];
    $eventpostings = [];

    if (mysqli_num_rows($job_result) > 0) {
        while ($rowjob = mysqli_fetch_assoc($job_result)) {
            $jobpostings[] = [
                "jobpid" => $rowjob["jobpid"],
                "title" => $rowjob["title"],
                "location" => $rowjob["location"],
                "description" => $rowjob["description"],
                "companyname" => $rowjob["companyname"]
            ];
        }
        $job_hasResults = true;
    }

    if (mysqli_num_rows($event_result) > 0) {
        while ($rowevent = mysqli_fetch_assoc($event_result)) {
            $eventpostings[] = [
                "eventid" => $rowevent["eventid"],
                "title" => $rowevent["title"],
                "description" => $rowevent["description"],
                "category" => $rowevent["category"],
                "eventtime" => $rowevent["eventtime"],
                "eventdate" => $rowevent["eventdate"],
                "eventloc" => $rowevent["eventloc"]
            ];
        }
        $event_hasResults = true;
    }
    ?>

    <main class="content-container">
        <div class="header">
            <h1>Posts</h1>
            <p>
                Delete or edit a post
            </p>
        </div>

        <div class="navigation">
            <ul id="ul-posts">
                <li onclick="wipAlert()">
                    <img src="../../res/experience-posts.png" alt="User experience">
                    <p>Experience</p>
                </li>
                <li onclick="displayEvents(events)">
                    <img src="../../res/calendar-posts.png" alt="Events">
                    <p>Events</p>
                </li>
                <li onclick="displayJobs(jobs)">
                    <img src="../../res/jlisting-posts.png" alt="Listing">
                    <p>Job Listing</p>
                </li>
            </ul>
        </div>

        <div id="card-jobs">
        </div>

        <div id="card-events">
        </div>
    </main>

    <script src="../js/posts.js"></script>

    <script>
        let jobs = <?php echo json_encode($jobpostings); ?>;
        let events = <?php echo json_encode($eventpostings); ?>;

        function wipAlert() {
            alert('This section is currently being worked on :)');
        }

        function displayJobs(jobsData) {
            setActiveTab(2);
            document.getElementById("card-events").innerHTML = '';
            const container = document.getElementById("card-jobs");
            container.innerHTML = ''; // Clear existing content

            for (let i = 0; i < jobsData.length; i++) {
                const cardContainer = document.createElement('div');
                cardContainer.id = jobsData[i].jobpid;
                cardContainer.classList.add("joblisting");
                cardContainer.innerHTML = `
                    <div class="listing-title">
                        <h3>${jobsData[i].title}</h3>
                    </div>
                    <div class="listing-com-loc">
                        <p>${jobsData[i].companyname}</p>
                        <p>${jobsData[i].location}</p>
                    </div>
                    <div class="listing-summary">
                        <p>${jobsData[i].description}</p>
                    </div>
                    <div class="listing-button">
                        <button class="listing-bdesign" onclick="">View Interested</button>
                    </div>
                    <div class="listing-more">
                        <a href="#"><img src="../../res/more-options.png" alt="More Options"></a>
                    </div>
                    <div class="listing-exit">
                        <a href="#"><img src="../../res/close-posts.png" alt="Close Listing"></a>
                    </div>
                `;
                container.appendChild(cardContainer);
            }
        }

        function displayEvents(eventsData) {
            setActiveTab(1);
            document.getElementById("card-jobs").innerHTML = '';
            const container = document.getElementById("card-events");
            container.innerHTML = ''; // Clear existing content

            for (let i = 0; i < eventsData.length; i++) {
                const cardContainer = document.createElement('div');
                cardContainer.id = eventsData[i].eventid;
                cardContainer.classList.add("event-card");
                cardContainer.innerHTML = `
                <div class="event-card-image">
                    <img src="data:image/jpeg;base64,${eventsData[i].eventphoto}">
                        <div class="more-options">
                            <img src="../../res/eventbutton.png">
                        </div>
                </div>
                <div class="event-card-content">
                    <h2 class="event-title">${eventsData[i].title}</h2>
                    <div class="event-details">
                        <div class="event-date">${eventsData[i].eventdate}</div>
                        <div class="event-time">${eventsData[i].eventtime}</div>
                    </div>
                    <div class="event-location">${eventsData[i].eventloc}</div>
                    <div class="event-interest-count">
                        <img src="../../res/star.png" alt="star">
                            <span>0 interested</span>
                    </div>
                    <button class="event-view-button">View interested</button>
                </div>
                `;
                container.appendChild(cardContainer);
            }
        }

        document.addEventListener('DOMContentLoaded', function () {
            if (typeof setActiveNav === 'function') {
                setActiveNav("poststab", "postsicon", 5);
            }
            displayEvents(events); // Display jobs by default
        });
    </script>
</body>

</html>
</body>