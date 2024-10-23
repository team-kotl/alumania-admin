<?php

require_once '..\database\database.php';


function getNextJobID($conn) {
    
    $sql = "SELECT jobpid FROM jobpost ORDER BY CAST(SUBSTRING(jobpid, 2) AS UNSIGNED) DESC LIMIT 1";
    
    $result = $conn->query($sql);
    if ($result && $row = $result->fetch_assoc()) {
        
        $lastJobID = $row['jobpid'];
        $numPart = (int) substr($lastJobID, 2); 
        $nextNum = $numPart + 1; 
    } else {
        
        $nextNum = 1;
    }

    
    return 'JP' . str_pad($nextNum, 3, '0', STR_PAD_LEFT);
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $jobTitle = htmlspecialchars($_POST['jobTitle']);
    $description = htmlspecialchars($_POST['description']);
    $location = htmlspecialchars($_POST['location']);
    $company = htmlspecialchars($_POST['category']); 

    
    $db = Database::getInstance();
    $conn = $db->getConnection();

    
    $jobId = getNextJobID($conn);

    #replace with session
    $userId = 'U005'; 

    // Insert into the database
    try {
        
        $sql = "INSERT INTO jobpost (jobpid, title, location, description, companyname, publishtimestamp, userid)
                VALUES (?, ?, ?, ?, ?, NOW(), ?)";

        
        if ($stmt = $conn->prepare($sql)) {
            // Bind variables to the prepared statement as parameters
            $stmt->bind_param("ssssss", $jobId, $jobTitle, $location, $description, $company, $userId);

            
            if ($stmt->execute()) {
                // Success notification
                echo "Job post created successfully!";
            } else {
                echo "Failed to create job post." . $stmt->error;
            }

            // Close the statement
            $stmt->close();
            
        }
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
    }

    // Close the connection
    $conn->close();
}
?>
