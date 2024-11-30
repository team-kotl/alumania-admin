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
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../res/styles/users.css">
    <title>Alumania</title>
</head>

<body>
    <div id="notificationContainer"></div>
    <?php include 'navbar.php'; ?>
    <script defer> setActiveNav("userstab", "usersicon", 3); </script>


    <div class="content-container">
        <div class="header">
            <h1>Users</h1>
            <p>View and Manage User Accounts</p>
        </div>

        <div class="navigation">
            <ul id="ul-users">
                <li>
                    <img src="../../res/alumni-blue.png" alt="Alumni">
                    <p>Alumni</p>
                </li>
                <li>
                    <img src="../../res/manager.png" alt="Managers">
                    <p>Managers</p>
                </li>
            </ul>
        </div>

    <div class="searchfilter">
      <div class="total-users">Total Users: </div> 
      <div class="search-box">
        <input type="text" class="search-input" placeholder="Name, ID, Email, Username">
        <button class="options-btn">≡</button>
      </div>
    </div>

    <div class="section-title">
            <table>
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
        </div>
    <?php } else { ?>
            <h1>Access Forbidden</h1>
            <p>Please log in to your account.</p>
    <?php } ?>
</body>
</html>