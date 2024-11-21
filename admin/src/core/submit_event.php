<?php

session_start();
require_once '..\database\database.php';
#to get last id
function getNextEventID($db) {
    
    $query = "SELECT eventid FROM event ORDER BY CAST(SUBSTRING(eventid, 2) AS UNSIGNED) DESC LIMIT 1";
    
    $result = $db->query($query);
    if ($result && $row = $result->fetch_assoc()) {
        
        $lastEventID = $row['eventid'];
        $numPart = (int) substr($lastEventID, 1); 
        $nextNum = $numPart + 1; 
    } else {
        
        $nextNum = 1;
    }

    
    return 'E' . str_pad($nextNum, 3, '0', STR_PAD_LEFT);
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $eventTitle = htmlspecialchars($_POST['eventTitle']);
    $description = htmlspecialchars($_POST['description']);
    $location = htmlspecialchars($_POST['location']);
    $category = $_POST['category'];
    $schedule = $_POST['schedule'];

    $eventDate = date('Y-m-d', strtotime($schedule));
    $eventTime = date('H:i:s', strtotime($schedule));

    // Connect to database
    $db = \Database::getInstance()->getConnection();
    if ($db->connect_error) {
        die("Connection failed: " . $db->connect_error);
    }

    $eventId = getNextEventID($db);
    $userId = '7777';

    try {
        // Check if the file is uploaded
        if (isset($_FILES["eventImage"]) && $_FILES["eventImage"]["error"] === UPLOAD_ERR_OK) {
            $fileTmpPath = $_FILES["eventImage"]["tmp_name"];
            $imageData = file_get_contents($fileTmpPath);
            $check = getimagesize($fileTmpPath);
            if ($check === false) {
                throw new Exception("Uploaded file is not a valid image.");
            }

            $imageFileType = strtolower(pathinfo($_FILES["eventImage"]["name"], PATHINFO_EXTENSION));
            $allowedFileTypes = ['jpg', 'jpeg', 'png', 'gif'];
            if (!in_array($imageFileType, $allowedFileTypes)) {
                throw new Exception("Only JPG, JPEG, PNG, and GIF files are allowed.");
            }

            $query = "INSERT INTO event (eventid, title, description, category, eventtime, eventdate, eventloc, publishtimestamp, eventphoto, userid)
                      VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?)";
            if ($stmt = $db->prepare($query)) {
                $stmt->bind_param("ssssssbs", $eventId, $eventTitle, $description, $category, $eventTime, $eventDate, $location, $imageData, $userId);
                if ($stmt->execute()) {
                    echo "Event created successfully!";
                } else {
                    throw new Exception("Failed to create event: " . $stmt->error);
                }
                $stmt->close();
            }
        } else {
            throw new Exception("No image file uploaded or an error occurred during upload.");
        }
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
    }

    $db->close();
}
