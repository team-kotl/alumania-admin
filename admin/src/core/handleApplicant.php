<?php
session_start();
require_once '..\database\database.php';
$db = \Database::getInstance()->getConnection();

// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

header('Content-Type: application/json');

try {
    function getNextUserID($db) {
        $query = "SELECT CAST(SUBSTRING(userid, 3) AS UNSIGNED) AS count FROM user ORDER BY count DESC LIMIT 1";
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

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $applicantid = $_POST['applicantid'] ?? null;
        $action = $_POST['action'] ?? null;

        if (!$applicantid || !$action) {
            echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
            exit;
        }

        if ($action === 'accept') {
            // Query to fetch applicant details
            $fetchQuery = "SELECT username, password, email, firstname, 
                           middlename, lastname, course, empstatus, location, company, diploma  
                           FROM applicant WHERE applicantid = ?";
            $fetchStmt = $db->prepare($fetchQuery);
            $fetchStmt->bind_param('s', $applicantid);
            $fetchStmt->execute();
            $result = $fetchStmt->get_result();

            if ($result->num_rows > 0) {
                // Fetch the applicant details
                $applicant = $result->fetch_assoc();
                $username = $applicant['username'];
                $password = $applicant['password'];
                $usertype = 'alumni';
                $email = $applicant['email'];
                $firstname = $applicant['firstname'];
                $middlename = $applicant['middlename'];
                $lastname = $applicant['lastname'];
                $course = $applicant['course'];
                $empstatus = $applicant['empstatus'];
                $location = $applicant['location'];
                $company = $applicant['company'];
                $diploma = $applicant['diploma'];

                // Generate the next user ID
                $nextUserid = getNextUserID($db);

                //Insert first the applicant to user table to insert in alumni table
                $userquery = "INSERT INTO user (userid, username, password, usertype)
                              VALUES (?, ?, ?, ?)";
                $userstmt = $db->prepare($userquery);
                $userstmt->bind_param("ssss", $nextUserid, $username, $password, $usertype);
                $userstmt->execute();

                // Insert into the alumni table
                $alumniquery = "INSERT INTO alumni (userid, email, firstname, middlename, 
                          lastname, course, empstatus, location, company, displaypic, diploma, private)
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, ?, 0)";
                $alumnistmt = $db->prepare($alumniquery);
                $alumnistmt->bind_param(
                    "ssssssssss", $nextUserid, $email, $firstname, $middlename, $lastname, $course,
                    $empstatus, $location, $company, $diploma
                );

                // Send the binary data for `diploma`
                if ($diploma !== null) {
                    $alumnistmt->send_long_data(9, $diploma); 
                }

                if ($alumnistmt->execute()) {
                    // Remove the applicant from the applicant table
                    $deleteQuery = "DELETE FROM applicant WHERE applicantid = ?";
                    $deleteStmt = $db->prepare($deleteQuery);
                    $deleteStmt->bind_param('s', $applicantid);
                    $deleteStmt->execute();

                    echo json_encode(['status' => 'success', 'message' => 'The applicant was approved']);
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'Failed to insert into alumni table']);
                }
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Applicant not found']);
            }
        } elseif ($action === 'reject') {
            $query = "DELETE FROM applicant WHERE applicantid = ?";
            $stmt = $db->prepare($query);
            $stmt->bind_param('s', $applicantid);
            $stmt->execute();

            echo json_encode(['status' => 'success', 'message' => 'The applicant was rejected']);
        }
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
