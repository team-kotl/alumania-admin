<?php

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

    
    $db = \Database::getInstance()->getConnection();

    
    $eventId = getNextEventID($db);

    #replace with session
    $userId = 'U005'; 

    
    try {
        
        $query = "INSERT INTO event (eventid, title, description, category, eventtime, eventdate, eventloc, userid)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        
        if ($stmt = $db->prepare($query)) {
            
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
    
    $db->close();
}
?>
