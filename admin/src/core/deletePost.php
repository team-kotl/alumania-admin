/** Author:
* The script is used to delete records from the database that are related to a specific post type (experience, job, or event).
**/
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

    try {
        // Map post types to table names and their dependencies
        $dependencyMap = [
            'experience' => [
                'table' => 'experience',
                'idColumn' => 'xpid',
                'dependencies' => [
                    ['table' => 'experienceimage', 'idColumn' => 'xpid'],
                    ['table' => 'experiencelike', 'idColumn' => 'xpid'],
                ]
            ],
            'job' => [
                'table' => 'jobpost',
                'idColumn' => 'jobpid',
                'dependencies' => [
                    ['table' => 'interestedinjobpost', 'idColumn' => 'jobpid'],
                ]
            ],
            'event' => [
                'table' => 'event',
                'idColumn' => 'eventid',
                'dependencies' => [
                    ['table' => 'interestedinevent', 'idColumn' => 'eventid'],
                    ['table' => 'eventsponsor', 'idColumn' => 'eventid'],
                ]
            ],
        ];

        $config = $dependencyMap[$type] ?? null;

        if (!$config) {
            throw new Exception('Invalid post type.');
        }

        // Delete from dependent tables
        foreach ($config['dependencies'] as $dependency) {
            $query = "DELETE FROM {$dependency['table']} WHERE {$dependency['idColumn']} = ?";
            $stmt = $db->prepare($query);
            $stmt->bind_param('s', $id);
            $stmt->execute();
        }

        // Delete from the main table
        $mainQuery = "DELETE FROM {$config['table']} WHERE {$config['idColumn']} = ?";
        $stmt = $db->prepare($mainQuery);
        $stmt->bind_param('s', $id);
        $stmt->execute();


        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method.']);
}

?>