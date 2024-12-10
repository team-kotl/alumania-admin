<?php
require_once '..\database\database.php';
$db = \Database::getInstance()->getConnection();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $id = $input['id'] ?? null;
    $type = $input['type'] ?? null;

    if (!$id || !$type) {
        echo json_encode(['success' => false, 'error' => 'Invalid input.']);
        exit;
    }

    // Map post types to table names
    $tableMap = [
        'job' => 'jobpost',
        'event' => 'event',
        'experience' => 'experience',
    ];

    $table = $tableMap[$type] ?? null;

    if (!$table) {
        echo json_encode(['success' => false, 'error' => 'Invalid post type.']);
        exit;
    }

    // Delete query
    $query = "DELETE FROM $table WHERE " . ($type === 'experience' ? 'xpid' : ($type === 'job' ? 'jobpid' : 'eventid')) . " = ?";
    $stmt = $db->prepare($query);
    $stmt->bind_param('s', $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $stmt->error]);
    }

    $stmt->close();
    $db->close();
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method.']);
}

?>