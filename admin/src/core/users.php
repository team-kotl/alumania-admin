<?php
session_start();

if (isset($_SESSION['username'])) {
    require_once '..\database\database.php';

    $db = Database::getInstance();
    $conn = $db->getConnection();

    $sqlAlumni = "SELECT userid, email, firstname, middlename, lastname, empstatus, location FROM alumni";
    $resultAlumni = $conn->query($sqlAlumni);

    $sqlManagers = "
    SELECT 
        username,
        password
    FROM user
    WHERE userType = 'Manager';
    ";
    $resultManagers = $conn->query($sqlManagers);
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
                    <li id="alumniTab" class="active" selected-icon="../../res/alumni-blue.png" unselected-icon="../../res/alumni.png">
                        <img src="../../res/alumni-blue.png" alt="Alumni">
                        <p>Alumni</p>
                    </li>
                    <li id="managerTab" selected-icon="../../res/manager-blue.png" unselected-icon="../../res/manager.png">
                        <img src="../../res/manager.png" alt="Managers">
                        <p>Managers</p>
                    </li>
                </ul>
            </div>
            <div class="searchfilter">
                <div class="total-users">Total Users: </div>
                    <div class="search-box">
                        <input type="text" class="search-input" placeholder="Name, ID, Email">
                        <img src="../../res/search.png" class="search-icon" alt="Search">
                        <button class="filter-btn" onclick="toggleFilterDropdown()">
                            <img src="../../res/sort.png" class="filter-icon" alt="Filter">
                        </button>
                        <div class="filter-dropdown" id="filterDropdown">
                            <h3>Search Filters</h3>
                            <div class="filter-content">
                                <div class="filter-section">
                                    <h4>Status</h4>
                                    <ul>
                                        <li>Employed</li>
                                        <li>Unemployed</li>
                                        <li>Underemployed</li>
                                    </ul>
                                </div>
                                <div class="filter-section">
                                    <h4>Location</h4>
                                    <ul>
                                        <li>Domestic</li>
                                        <li>Foreign</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="add-manager-button-container hidden">
                            <button class="add-manager-button">
                            <img src="../../res/add.png" alt="Add Icon" class="add-manager-icon"/>Add Manager</button>
                        </div>
                    </div>
            </div>
            <div id="addManagerModal" class="modal hidden">
                <div class="modal-content">
                    <span class="close-btn">&times;</span>
                    <h2>Add New Manager</h2>
                    <form id="addManagerForm">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required>

                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required>
                    <button id="togglePassword" type="button">Show Password</button> 
                    <button type="submit" class="submit-button">Add Manager</button>
                    </form>
                </div>
            </div>



            <div class="user-panel" id="userPanel">
                
            </div>
        </div>

        <script>
            const alumniContent = `
                <div class="section-title">
                    <table>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Employment Status</th>
                                <th>Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php 
                            if ($resultAlumni && $resultAlumni->num_rows > 0) {
                                while ($row = $resultAlumni->fetch_assoc()) { ?>
                                    <tr>
                                        <td data-label="User ID"><?php echo htmlspecialchars($row['userid']); ?></td>
                                        <td data-label="Email"><?php echo htmlspecialchars($row['email']); ?></td>
                                        <td data-label="Name"><?php  echo htmlspecialchars($row['firstname'] . ' ' . $row['middlename'] . ' ' . $row['lastname']); ?></td>
                                        <td data-label="Employment Status"><?php echo htmlspecialchars($row['empstatus']); ?></td>
                                        <td data-label="Location"><?php echo htmlspecialchars($row['location']); ?></td>
                                    </tr>
                                <?php }
                            } else { ?>
                                <tr>
                                    <td colspan="5">No alumni found</td>
                                </tr>
                            <?php } ?>
                        </tbody>
                    </table>
                </div>
            `;

            const managerContent = `
                <div class="section-title">
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php 
                            if ($resultManagers && $resultManagers->num_rows > 0) {
                                while ($row = $resultManagers->fetch_assoc()) { ?>
                                    <tr>
                                        <td data-label="Username"><?php echo htmlspecialchars($row['username']); ?></td>
                                        <td data-label="Actions">
                                            <!-- Add any action buttons if needed -->
                                        </td>
                                    </tr>
                                <?php }
                            } else { ?>
                                <tr>
                                    <td colspan="3">No managers found</td>
                                </tr>
                            <?php } ?>
                        </tbody>
                    </table>
                </div>
            `;

            document.addEventListener('DOMContentLoaded', () => {
                const alumniTab = document.getElementById('alumniTab');
                const managerTab = document.getElementById('managerTab');
                const userPanel = document.getElementById('userPanel');
                const addManagerButtonContainer = document.querySelector('.add-manager-button-container');
                userPanel.innerHTML = alumniContent;

                alumniTab.addEventListener('click', () => {
                    userPanel.innerHTML = alumniContent; 
                    alumniTab.classList.add('active');
                    managerTab.classList.remove('active');
                    addManagerButtonContainer.classList.add('hidden');
                });

                managerTab.addEventListener('click', () => {
                    userPanel.innerHTML = managerContent; 
                    managerTab.classList.add('active');
                    alumniTab.classList.remove('active');
                    addManagerButtonContainer.classList.remove('hidden');
                });
            });
        </script>

        <script src="../js/users.js" defer></script>
    </body>
</html>
<?php } ?>