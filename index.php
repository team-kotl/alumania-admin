<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://fonts.googleapis.com/css?family=Poppins"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="res/styles/login.css" />
    <title>Alumania</title>
  </head>
  <body>
    <div class="login-container">
      <div id="login-img">
        <img src="res/login_image.jpg" alt="Alumania" />
      </div>
      <div class="form-container">
        <div class="welcome-img">
          <img src="res/welcome_back.png" alt="welcome back" />
        </div>

        <?php if (isset($_GET['error'])): ?>
        <div class="error-message">
          <?php echo htmlspecialchars($_GET['error']); ?>
        </div>
        <?php endif; ?>

        <div id="user-fields">

          <form action="src/core/login.php" method="POST">

            <div class="input-field">
              <input type="text" name="username" required />
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