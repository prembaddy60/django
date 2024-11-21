<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dynamic Login</title>
  <link rel="stylesheet" href="styles2.css">
  <script type="module" src="script.js"></script>
</head>
<body>
  <div class="container">
    <div class="logo">
      <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google Logo">
    </div>
    <div class="login-box">
      <h1>Sign in</h1>
      <p class="subtitle">to continue to your application</p>

      <div class="input-group">
        <input type="text" id="dynamicInput" placeholder=" " required>
        <label for="dynamicInput" id="dynamicLabel">Email or phone</label>
      </div>
      <p class="forgot-email hidden"><a href="#">Forgot email?</a></p>
      <div class="buttons">
        <a href="#" class="create-account hidden" id="createAccount">Create account</a>
        <button class="next" id="loginBtn">Next</button>
      </div>
    </div>
    <div class="footer">
      <p>Not your computer? Use Guest mode to sign in privately.</p>
      <p><a href="#">Learn more</a></p>
    </div>
  </div>
</body>
</html>

