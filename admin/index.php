<?php
session_start();
if (!isset($_SESSION["username"])) {
  ?>
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />
    <link rel="shortcut icon" href="res/Alumania_logo.png" type="image/x-icon">
    <link rel="stylesheet" href="res/styles/login.css" />
    <title>Alumania</title>
  </head>

  <body>
    <div id="notificationContainer"></div>
    <div class="login-container">
      <div id="login-img">
        <img src="res/login_image.jpg" alt="Alumania" />
      </div>
      <div class="form-container">
        <div class="welcome-img">
          <img src="res/welcome_back.png" alt="welcome back" />
        </div>

        <div id="user-fields">

          <form action="src/core/login.php" method="POST" id="login-form" onsubmit="handleSubmit(event)">

            <div class="input-field">
              <input type="text" name="username" required id="username"/>
              <label>Username</label>
            </div>

            <div class="input-field">
              <input type="password" name="password" required id="password" />
              <label>Password</label>
              <img src="res/show_pass.png" alt="show" id="showicon" />
            </div>

            <button type="submit">Login</button>

          </form>

        </div>

      </div>

    </div>

    <script src="src/js/login.js"></script>
  </body>

  </html>
<?php } else {
  header("Location: src/core/dashboard.php");
}
?>