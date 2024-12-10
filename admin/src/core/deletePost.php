<?php
require_once '..\database\database.php';
$db = \Database::getInstance()->getConnection();

header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');

// Parse the incoming request
$type = $_GET['type'] ?? null;
$id = $_GET['id'] ?? null;

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    echo json_encode(['error' => 'Invalid request method.']);
    exit;
}

if (!$type || !$id) {
    echo json_encode(['error' => 'Missing type or id parameter.']);
    exit;
}

try {
    if ($type === 'job') {
        $query = "DELETE FROM jobpost WHERE jobpid = ?";
        $relatedQuery = "DELETE FROM interestedinjobpost WHERE jobpid = ?";
    } elseif ($type === 'event') {
        $query = "DELETE FROM event WHERE eventid = ?";
        $relatedQuery = "DELETE FROM interestedinevent WHERE eventid = ?";
    } else {
        echo json_encode(['error' => 'Invalid type parameter.']);
        exit;
    }

    // Delete related records first
    $stmt = $db->prepare($relatedQuery);
    if (!$stmt) {
        echo json_encode(['error' => 'Failed to prepare related delete query: ' . $db->error]);
        exit;
    }
    $stmt->bind_param("s", $id);
    $stmt->execute();

    // Delete the main record
    $stmt = $db->prepare($query);
    if (!$stmt) {
        echo json_encode(['error' => 'Failed to prepare delete query: ' . $db->error]);
        exit;
    }
    $stmt->bind_param("s", $id);
    $stmt->execute();

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['error' => 'Unexpected error: ' . $e->getMessage()]);
}

?>