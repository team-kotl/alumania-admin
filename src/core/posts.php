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
    $jobpostings = getDefaultJobs($db);
    $eventpostings = getDefaultEvents($db);

    function getDefaultEvents($db): array {
        $events = [];
        $event_query = "SELECT 
            e.eventid, e.title, e.description, e.category,
            e.eventloc, e.eventtime, e.eventdate, e.eventphoto,
            (SELECT COUNT(*) FROM interestedinevent ie WHERE ie.eventid = e.eventid) AS interested
            FROM event e ORDER BY e.eventdate DESC, e.eventtime DESC;";
        $event_result = mysqli_query($db, $event_query); 

        if (mysqli_num_rows($event_result) > 0) {
            while ($rowevent = mysqli_fetch_assoc($event_result)) {
                $events[] = [
                    "eventid" => $rowevent["eventid"],
                    "title" => $rowevent["title"],
                    "description" => $rowevent["description"],
                    "category" => $rowevent["category"],
                    "eventtime" => $rowevent["eventtime"],
                    "eventdate" => $rowevent["eventdate"],
                    "eventloc" => $rowevent["eventloc"],
                    "eventphoto" => base64_encode($rowevent["eventphoto"]),
                    "interested" => $rowevent["interested"]
                ];
            }
        }

        return $events;
    }

    function getDefaultJobs($db) {
        $jobs = [];
        $job_query = "SELECT 
            jp.jobpid, jp.title, jp.location, jp.description, jp.publishtimestamp,
            jp.companyname, (SELECT COUNT(*) FROM interestedinjobpost ijp 
            WHERE ijp.jobpid = jp.jobpid) AS interested FROM jobpost jp
            ORDER BY jp.publishtimestamp DESC;";
        $job_result = mysqli_query($db, $job_query);
        if (mysqli_num_rows($job_result) > 0) {
            while ($rowjob = mysqli_fetch_assoc($job_result)) {
                $jobs[] = [
                    "jobpid" => $rowjob["jobpid"],
                    "title" => $rowjob["title"],
                    "location" => $rowjob["location"],
                    "description" => $rowjob["description"],
                    "publishtimestamp" => $rowjob["publishtimestamp"],
                    "companyname" => $rowjob["companyname"],
                    "interested" => $rowjob["interested"]
                ];
            }
        }
        return $jobs;
    }
    ?>

    <main class="content-container">
        <div class="header">
            <h1>Posts</h1>
            <p>
                Delete or edit a post
            </p>
        </div>

        <div id="searchContainer" class="search-container">
            <div class="event-search-bar">
                <input type="text" class="event-search-input" placeholder="Event Name">
                <button class="search-button">
                    <img src="../../res/search.png" alt="Search">
                </button>
            </div>

            <div class="event-category-dropdown">
                <button class="event-category-button" onclick="eventCategory()">
                    Category
                    <img src="../../res/arrow.png" alt="Dropdown Arrow" class="event-dropdown-arrow">
                </button>
                <div class="event-dropdown-content" id="categoryDropdown">
                    <button onclick="eventCategory()">Seminar</button>
                    <button onclick="eventCategory()">Thanksgiving</button>
                    <button onclick="eventCategory()">Festival</button>
                    <button onclick="eventCategory()">Reunion</button>
                </div>
            </div>

            <button class="event-sort-button">
                <img src="../../res/sort.png" alt="Sort">
            </button>
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
        let currentEvents = JSON.parse(JSON.stringify(events));
        let currentJobs = JSON.parse(JSON.stringify(jobs));

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
                    <div class="job-interest-count">
                        <img src="../../res/star.png" alt="star">
                            <span>${jobsData[i].interested} interested</span>
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
                    <img src="../../res/event_placeholder.jpg">
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
                            <span>${eventsData[i].interested} interested</span>
                    </div>
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