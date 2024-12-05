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
    <script defer> setActiveNav("appltab", "applicon", 4); </script>

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

        
    ?>

    <div class="content-container">
        <div class="header">
            <h1>Applications</h1>
            <p>Validate Applications</p>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Applicant Name</th>
                    <th>Course</th>
                    <th>Location</th>
                    <th>Diploma</th>
                    <th>Accept/Reject</th>
                </tr>
            </thead>
            <tbody id="applicantTable">
            </tbody>
        </table>
        <div id="photoPopup" class="popup-container" style="display: none;">
            <div class="popup-content">
                <span class="close-popup" onclick="closePopup()">&times;</span>
                <img id="photoPreview" src="" alt="Diploma Photo">
            </div>
        </div>
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
                        <td>${applicant.firstname} ${applicant.lastname}</td>
                        <td>${applicant.course}</td>
                        <td>${applicant.location}</td>
                        <td><button class = "view-photo-btn">View photo</button></td>
                        <td>
                            <button class="status-icon accept" onclick="handleAction('${applicant.applicantid}', 'accept')"></button>
                            <button class="status-icon reject" onclick="handleAction('${applicant.applicantid}', 'reject')"></button>
                        </td>
                    `;

                    tableBody.appendChild(row);
                }
            }

            function handleAction(applicantid, action) {
                // Prepare data to send
                const requestData = new URLSearchParams({
                    applicantid: applicantid,
                    action: action
                });

                // Send request to the same file (applicant.php)
                fetch('handleApplicant.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded' // Specify urlencoded content type
                    },
                    body: requestData.toString()
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === 'success') {
                            // Remove the row from the table on success
                            // const row = document.querySelector(`tr[data-applicantid="${applicantid}"]`);
                            // row.remove();
                            alert(data.message);
                        } else {
                            alert('Failed to perform action: ' + data.message);
                        }
                    })
                    .catch(error => console.error('Error:', error));
            }

            // Initial display of applicants
            displayApplicants(applicants);

            document.addEventListener('click', function (event) {
                if (event.target && event.target.matches('button.view-photo-btn')) {
                    const applicantId = event.target.closest('tr').dataset.applicantid;
                    const photoPopup = document.getElementById('photoPopup');
                    const photoPreview = document.getElementById('photoPreview');

                    // Fetch the photo
                    photoPreview.src = ''; // Clear existing photo
                    fetch(`getDiploma.php?applicantid=${applicantId}`)
                        .then(response => {
                            if (!response.ok) throw new Error('Photo not found');
                            return response.blob();
                        })
                        .then(blob => {
                            photoPreview.src = URL.createObjectURL(blob);
                            photoPopup.style.display = 'flex'; // Show popup
                        })
                        .catch(error => {
                            alert('Error: ' + error.message);
                        });
                }
            });

            function closePopup() {
                document.getElementById('photoPopup').style.display = 'none';
            }

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