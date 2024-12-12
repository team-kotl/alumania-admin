<!-- Author: Nikko Choy
     Description: This retrieves and returns a list of sponsors for a specific event, including their name, sponsorship type, and amount.
    It requires an eventid parameter; if not provided, it returns an error message. -->
<?php
require_once '..\database\database.php';
$db = \Database::getInstance()->getConnection();

header('Content-Type: application/json');

if (isset($_GET['eventid'])) {
    $eventid = $_GET['eventid'];
    
    // Query to get the event title and all sponsors for that event
    $stmt = $db->prepare("
        SELECT e.title, es.userid, es.type, es.amount, a.firstname, a.lastname 
        FROM eventsponsor es
        JOIN event e ON es.eventid = e.eventid
        JOIN alumni a ON es.userid = a.userid
        WHERE es.eventid = ?
    ");
    $stmt->bind_param("s", $eventid);
    $stmt->execute();
    $result = $stmt->get_result();

    $sponsors = [];
    
    while ($row = $result->fetch_assoc()) {
        $sponsors[] = [
            'title' => $row['title'],
            'userid' => $row['userid'],
            'type' => $row['type'],
            'amount' => "₱" . number_format($row['amount'], 2), 
            'name' => $row['firstname'] . ' ' . $row['lastname']
        ];
    }

    echo json_encode($sponsors);
} else {
    echo json_encode(['message' => 'Event ID is required.']);
}
?>