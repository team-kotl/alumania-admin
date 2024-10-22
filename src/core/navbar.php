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
            <a href="#" onclick="wipAlert()">
                <img src="../../res/dashboard.png" alt="Dashboard">
                <span>Dashboard</span>
            </a>
        </li>
        <li>
            <a href="create.php" class="active">
                <img src="../../res/create-blue.png" alt="Create">
                <span>Create</span>
            </a>
        </li>
        <li>
            <a href="#" onclick="wipAlert()">
                <img src="../../res/account_circle.png" alt="Users">
                <span>Users</span>
            </a>
        </li>
        <li>
            <a href="#" onclick="wipAlert()">
                <img src="../../res/applications.png" alt="Applications">
                <span>Applications</span>
            </a>
        </li>
        <li>
            <a href="posts.php">
                <img src="../../res/folder.png" alt="Posts">
                <span>Posts</span>
            </a>
        </li>
        <li>
            <a href="#" onclick="wipAlert()">
                <img src="../../res/settings.png" alt="Settings">
                <span>Settings</span>
            </a>
        </li>
    </ul>

    <div class="user-profile">
        <img src="../../res/avatar.png" alt="User profile">
        <div class="user-info">
            <div class="user-name">Freskkie Earl</div>
            <div class="user-role">Admin</div>
        </div>
    </div>
</nav>

<script>
    function wipAlert() {
        alert('This section is currently being worked on :)');
    }
</script>