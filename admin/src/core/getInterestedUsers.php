<?php
// Author: Nikko Andrei Choy
// This retrieve and return information about interested for a specific event or job post
require_once '..\database\database.php';
$db = \Database::getInstance()->getConnection();

$type = $_GET['type']; // 'job' or 'event'
$id = $_GET['id']; // jobpid or eventid

$response = [];

try {
    $query = "";
    if ($type === 'job') {
        $query = "
            SELECT a.userid, a.firstname, a.lastname, a.course, a.displaypic
            FROM interestedinjobpost ijp
            JOIN alumni a ON ijp.userid = a.userid
            WHERE ijp.jobpid = ?";
    } elseif ($type === 'event') {
        $query = "
            SELECT a.userid, a.firstname, a.lastname, a.course, a.displaypic
            FROM interestedinevent ie
            JOIN alumni a ON ie.userid = a.userid
            WHERE ie.eventid = ?";
    }

    if ($query) {
        $stmt = $db->prepare($query);
        $stmt->bind_param("s", $id);
        $stmt->execute();
        $result = $stmt->get_result();

        while ($row = $result->fetch_assoc()) {
            $response[] = [
                'userid' => $row['userid'],
                'name' => $row['firstname'] . ' ' . $row['lastname'],
                'course' => $row['course'],
                'profilePic' => $row['displaypic'] ? 'data:image/jpeg;base64,' . base64_encode($row['displaypic']) : null,
            ];
        }
    }

    echo json_encode($response);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch interested users.']);
}

?>