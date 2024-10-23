<?php
// Include the database class
require_once '..\database\database.php';

// Function to generate the next event ID (e.g., E007)
function getNextEventID($conn) {
    // Query to get the last inserted event ID
    $sql = "SELECT eventid FROM event ORDER BY CAST(SUBSTRING(eventid, 2) AS UNSIGNED) DESC LIMIT 1";
    
    $result = $conn->query($sql);
    if ($result && $row = $result->fetch_assoc()) {
        // Extract the numeric part of the event ID
        $lastEventID = $row['eventid'];
        $numPart = (int) substr($lastEventID, 1); // Remove the "E" and cast to integer
        $nextNum = $numPart + 1; // Increment the number
    } else {
        // If no records, start with E001
        $nextNum = 1;
    }

    // Format the new event ID as "E" followed by the zero-padded number (e.g., E007)
    return 'E' . str_pad($nextNum, 3, '0', STR_PAD_LEFT);
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and retrieve form data
    $eventTitle = htmlspecialchars($_POST['eventTitle']);
    $description = htmlspecialchars($_POST['description']);
    $location = htmlspecialchars($_POST['location']);
    $category = $_POST['category'];
    $schedule = $_POST['schedule'];

    // Split datetime-local into date and time
    $eventDate = date('Y-m-d', strtotime($schedule));
    $eventTime = date('H:i:s', strtotime($schedule));

    if (empty($eventTitle) || empty($description) || empty($location) || empty($category) || empty($schedule)) {
        exit; // Stop execution if validation fails
    }

    // Get the database connection
    $db = Database::getInstance();
    $conn = $db->getConnection();

    // Get the next event ID using the function
    $eventId = getNextEventID($conn);

    // Add the current user ID (this should come from your session or authentication system)
    $userId = 'U005'; // Replace with the actual user ID

    // Insert into the database
    try {
        // Prepare an insert statement
        $sql = "INSERT INTO event (eventid, title, description, category, eventtime, eventdate, eventloc, userid)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        // Use prepared statements to avoid SQL injection
        if ($stmt = $conn->prepare($sql)) {
            // Bind variables to the prepared statement as parameters
            $stmt->bind_param("ssssssss", $eventId, $eventTitle, $description, $category, $eventTime, $eventDate, $location, $userId);

            // Execute the statement
            if ($stmt->execute()) {
                // Success message or redirect
                echo "Event created successfully!";
            } else {
                echo "Failed to create event";
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
