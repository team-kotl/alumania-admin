<?php 
session_start();
if(isset($_SESSION['username'])) { ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../res/styles/applicant.css">
    <title>Alumania</title>
</head>

<body>
    <div id="notificationContainer"></div>
    <?php include 'navbar.php'; ?>

    <?php
        require_once '..\database\database.php';
        $db = \Database::getInstance()->getConnection();

        function getApplicants($db): array
        {
            $applicants = [];
            $applicant_query = "SELECT a.applicantid, a.username, 
            a.password, a.email, a.firstname, a.middlename, a.lastname, 
            a.course, a.empstatus, a.location, a.company From applicant a;";
            $applicant_result = mysqli_query($db, $applicant_query);

            if(mysqli_num_rows($applicant_result) <= 0) {
                echo "<h1>No data found.</h1>";
            } else { 
                while ($rowapplicant = mysqli_fetch_assoc($applicant_result)) {
                    $applicants[] = [
                        "applicantid" => $rowapplicant["applicantid"],
                        "username" => $rowapplicant["username"],
                        "password" => $rowapplicant["password"],
                        "email" => $rowapplicant["email"],
                        "firstname" => $rowapplicant["firstname"],
                        "middlename" => $rowapplicant["middlename"],
                        "lastname" => $rowapplicant["lastname"],
                        "course" => $rowapplicant["course"],
                        "empstatus" => $rowapplicant["empstatus"],
                        "location" => $rowapplicant["location"],
                        "company" => $rowapplicant["company"]
                    ];
                }
            }

            return $applicants;
        }
        $newapplicants = getApplicants($db);

        function getNextUserID($db) {
    
            $query = "SELECT userid FROM alumni ORDER BY CAST(SUBSTRING(userid, 2) AS UNSIGNED) DESC LIMIT 1";
            
            $result = $db->query($query);
            if ($result && $row = $result->fetch_assoc()) {
                
                $lastUserID = $row['userid'];
                $numPart = (int) substr($lastUserID, 1); 
                $nextNum = $numPart + 1; 
            } else {
                $nextNum = 1;
            }
        
            
            return 'U' . str_pad($nextNum, 3, '0', STR_PAD_LEFT);
        }
        $nextUserid = getNextUserID($db);
        $usertype = "Alumni";

        function handleApplicant($db)
        {
            if ($_SERVER['REQUEST_METHOD']==='POST'){
                $applicantid = $_POST['applicantid'];
                $email = htmlspecialchars($_POST['email']);
                $firstname = htmlspecialchars($_POST['firstname']);
                $middlename = htmlspecialchars($_POST['middlename']);
                $lastname = htmlspecialchars($_POST['lastname']);
                $course = htmlspecialchars($_POST['course']);
                $empstatus = htmlspecialchars($_POST['empstatus']);
                $location = htmlspecialchars($_POST['location']);
                $company = htmlspecialchars($_POST['company']);
                $action =$_POST['action'];

                if ($action === 'accept') {
                    $query = "INSERT INTO alumni (userid, email, firstname, middlename, 
                    lastname, course, 
                    empstatus, location, company, displaypic, banned)
                    VALUES (?,?,?,?,?,?,?,?,?,NULL,0)";

                    if ($stmt = $db->prepare($query)) { 
                                
                        $stmt->bind_param("sssssssss", $nextUserid, $email, $firstname, 
                        $middlename, $lastname, $course, $empstatus, $location, $company);

                        if ($stmt->execute()) {
                            echo "Event created successfully!";
                        } else {
                            echo "Failed to create event";
                        }
                        $stmt->close();
                    }
                }
            }
        }
    ?>

    <div class="content-container">
        <div class="header">
            <h1>Applications</h1>
            <p>Validate Applications</p>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Applicant ID</th>
                    <th>Applicant Name</th>
                    <th>Course</th>
                    <th>Location</th>
                    <th>Diploma</th>
                    <th>Reject/Accept</th>
                </tr>
            </thead>
            <tbody id="applicantTable">
                
            
            </tbody>
        </table>
    </div>
    <script>
        let applicants = <?php echo json_encode($newapplicants); ?>;

        function displayApplicants(applicants) {
            const tableBody = document.getElementById("applicantTable");
            tableBody.innerHTML = ''; // Clear existing content

            for (let i = 0; i < applicants.length; i++) {
                const applicant = applicants[i];
                const row = document.createElement('tr');
                row.setAttribute('data-applicantid', applicant.applicantid);

                row.innerHTML = `
                    <td>${applicant.applicantid}</td>
                    <td>${applicant.firstname} ${applicant.lastname}</td>
                    <td>${applicant.course}</td>
                    <td>${applicant.location}</td>
                    <td><button>View photo</button></td>
                    <td><button>X</button><button>Y</button></td>
                `;

                tableBody.appendChild(row);
            }
        }

        // Initial display of applicants
        displayApplicants(applicants);

        // Periodic check for updates
        setInterval(() => {
            
            let newApplicants = <?php echo json_encode($newapplicants); ?>;

            // Refresh table only if there's new data
            if (newApplicants.length > applicants.length) {
                applicants = newApplicants; // Update the local data
                displayApplicants(applicants);
            }
        }, 10000);
    </script>

</body>

</html>
<?php } else { ?>
    <h1 style='margin:auto;'>Access Forbidden</h1>
    <p>Please log in to your account.</p>
<?php } ?>