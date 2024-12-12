/** Author:
* This PHP script retrieves an applicant's diploma image from a database then send it to the admin.
**/
<?php
require_once '..\database\database.php';
$db = \Database::getInstance()->getConnection();

if (isset($_GET['applicantid'])) {
    $applicantId = intval($_GET['applicantid']); // Sanitize input
    $query = "SELECT diploma FROM applicant WHERE applicantid = ?";
    $stmt = $db->prepare($query);
    $stmt->bind_param("i", $applicantId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        header("Content-Type: image/jpeg");
        echo $row['diploma'];
    } else {
        http_response_code(404);
        echo "Diploma not found.";
    }
} else {
    http_response_code(400);
    echo "Invalid request.";
}

?>