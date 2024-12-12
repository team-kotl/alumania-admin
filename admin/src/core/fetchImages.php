/** Author:
* This PHP script is designed to handle updating a manager's details (specifically the username and password) in a database.
**/
<?php
require_once '..\database\database.php';
$db = \Database::getInstance()->getConnection();

header('Content-Type: application/json');

if (isset($_GET['xpid'])) {
    $xpid = $_GET['xpid'];
    $stmt = $db->prepare("SELECT xpimage FROM experienceimage WHERE xpid = ?");
    $stmt->bind_param("s", $xpid);
    $stmt->execute();
    $result = $stmt->get_result();

    $images = [];
    while ($row = $result->fetch_assoc()) {
        $images[] = [
            'base64Image' => base64_encode($row['xpimage'])
        ];
    }
    echo json_encode($images);
} else {
    echo json_encode([]);
}
?>