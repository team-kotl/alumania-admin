<link rel="shortcut icon" href="../../res/Alumania_logo.png" type="image/x-icon">
<link rel="stylesheet" href="../../res/styles/style.css">
<nav class="navbar">
    <div class="logo">
        <img src="../../res/Alumania_logo.png" alt="Logo">
        <span class="logo-text">ALUMANIA</span>
    </div>

    <button class="nav-toggle">
        <span></span>
    </button>

    <ul class="nav-links">
        <li>
            <a href="#" onclick="wipAlert()" id="dashtab">
                <img src="../../res/dashboard.png" alt="Dashboard" id="dashicon">
                <span>Dashboard</span>
            </a>
        </li>
        <li>
            <a href="create.php" class="active" id="createtab">
                <img src="../../res/create.png" alt="Create" id="createicon">
                <span>Create</span>
            </a>
        </li>
        <li>
            <a href="#" onclick="wipAlert()" id="userstab">
                <img src="../../res/users.png" alt="Users" id="usersicon">
                <span>Users</span>
            </a>
        </li>
        <li>
            <a href="#" onclick="wipAlert()" id="appltab">
                <img src="../../res/applications.png" alt="Applications" id="applicon">
                <span>Applications</span>
            </a>
        </li>
        <li>
            <a href="posts.php" id="poststab">
                <img src="../../res/posts.png" alt="Posts" id="postsicon">
                <span>Posts</span>
            </a>
        </li>
        <li>
            <a href="../../index.php" id="settingstab">
                <img src="../../res/settings.png" alt="Settings" id="settingsicon">
                <span>Logout</span>
            </a>
        </li>
    </ul>

    <div class="user-profile">
        <img src="../../res/avatar.png" alt="User profile">
        <div class="user-info">
            <div class="user-name">admin</div>
            <div class="user-role">Admin</div>
        </div>
    </div>
</nav>

<script src="../js/navbar.js"></script>