<?php
session_start();

if (isset($_SESSION['username'])) {
    // Include the Database class
    require_once '..\database\database.php';

    // Get the database connection
    $db = Database::getInstance();
    $conn = $db->getConnection();

    // Query to fetch user data
    $sql = "SELECT userid, email, firstname, middlename, lastname, empstatus, location FROM alumni";
    $result = $conn->query($sql);

    ?>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../../res/styles/users.css">
        <title>Alumania - User List</title>
    </head>

    <body>
        <div id="notificationContainer"></div>
        <?php include 'navbar.php'; ?>

        <h1>All Users</h1>
        <table border="1" cellspacing="0" cellpadding="10">
            <thead>
                <tr>
                    <th>User ID</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Middle Name</th>
                    <th>Last Name</th>
                    <th>Employment Status</th>
                    <th>Location</th>
                </tr>
            </thead>
            <tbody>
    <?php 
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) { ?>
            <tr>
                <td data-label="User ID"><?php echo htmlspecialchars($row['userid']); ?></td>
                <td data-label="Email"><?php echo htmlspecialchars($row['email']); ?></td>
                <td data-label="First Name"><?php echo htmlspecialchars($row['firstname']); ?></td>
                <td data-label="Middle Name"><?php echo htmlspecialchars($row['middlename']); ?></td>
                <td data-label="Last Name"><?php echo htmlspecialchars($row['lastname']); ?></td>
                <td data-label="Employment Status"><?php echo htmlspecialchars($row['empstatus']); ?></td>
                <td data-label="Location"><?php echo htmlspecialchars($row['location']); ?></td>
            </tr>
        <?php }
    } else { ?>
        <tr>
            <td colspan="7">No users found</td>
        </tr>
    <?php } ?>
</tbody>

        </table>

        <script defer> setActiveNav("userstab", "usersicon", 2); </script>
    </body>

    </html>
    <?php 
} else { ?>
    <h1 style='margin:auto;'>Access Forbidden</h1>
    <p>Please log in to your account.</p>
<?php } ?>