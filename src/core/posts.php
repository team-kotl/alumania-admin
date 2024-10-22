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
    <script defer> setActiveNav("poststab", "postsicon", 5); </script>

    <main class="content-container">
        <div class="header">
            <h1>Posts</h1>
            <p>
                Delete or edit a post
            </p>
        </div>

        <div class="navigation">
            <ul id="ul-posts">
                <li>
                    <img src="../../res/experience-posts.png" alt="User experience">
                    <p>Experience</p>
                </li>
                <li>
                    <img src="../../res/calendar-posts.png" alt="Events">
                    <p>Events</p>
                </li>
                <li>
                    <img src="../../res/jlisting-posts.png" alt="Listing">
                    <p>Job Listing</p>
                </li>
            </ul>
        </div>


        <?php
        require_once '..\database\database.php';
        $db = \Database::getInstance()->getConnection();

        $event_hasResults = false;
        $job_hasResults = false;
        $job_query = "SELECT jobpid, title, location, description, companyname FROM jobpost";
        $event_query = "SELECT eventid, category, eventtime, eventdate, eventloc, eventphoto FROM event";
        $job_result = mysqli_query($db, $job_query);
        $event_result = mysqli_query($db, $event_query);
        $jobpostings = [];
        $eventpostings = [];


        if (mysqli_num_rows($job_result) > 0) {
            while ($row = mysqli_fetch_assoc($job_result)) {
                $jobpostings[] = [
                    "jobpid" => $row["jobpid"],
                    "title" => $row["title"],
                    "location" => $row["location"],
                    "description" => $row["description"],
                    "companyname" => $row["companyname"]
                ];
            }
            $job_hasResults = true;
        }

        if (mysqli_num_rows($event_result) > 0) {
            while ($row = mysqli_fetch_assoc($event_result)) {
                $eventpostings[] = [
                    "eventid" => $row["eventid"],
                    "category" => $row["category"],
                    "eventtime" => $row["eventtime"],
                    "eventdate" => $row["eventdate"],
                    "eventloc" => $row["eventloc"],
                    "eventphoto" => $row["eventphoto"]
                ];
            }
            $event_hasResults = true;
        }
        ?>

        <script>
            const jobs = <?php echo json_encode($jobpostings); ?>;
            const events = <?php echo json_encode($eventpostings); ?>;
        </script>

        <div id="card-jobs">
        </div>

        <div id="card-events">
        </div>

        <script src="../js/posts.js" defer>
        </script>
    </main>
</body>

</html>
</body>