<?php

require_once '..\database\database.php';


function getNextEventID($conn) {
    
    $sql = "SELECT eventid FROM event ORDER BY CAST(SUBSTRING(eventid, 2) AS UNSIGNED) DESC LIMIT 1";
    
    $result = $conn->query($sql);
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

    if (empty($eventTitle) || empty($description) || empty($location) || empty($category) || empty($schedule)) {
        exit; 
    }

    
    $db = Database::getInstance();
    $conn = $db->getConnection();

    
    $eventId = getNextEventID($conn);

    #replace with session
    $userId = 'U005'; 

    
    try {
        
        $sql = "INSERT INTO event (eventid, title, description, category, eventtime, eventdate, eventloc, userid)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        
        if ($stmt = $conn->prepare($sql)) {
            
            $stmt->bind_param("ssssssss", $eventId, $eventTitle, $description, $category, $eventTime, $eventDate, $location, $userId);

            
            if ($stmt->execute()) {
                
                echo "Event created successfully!";
            } else {
                echo "Failed to create event";
            }

            
            $stmt->close();
        }
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
    }

    // Close the connection
    $conn->close();
}
?>
