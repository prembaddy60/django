// This listens for form submission (i.e., when user clicks "Next")
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent form from submitting

    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');
    var email = emailInput.value;
    var password = passwordInput ? passwordInput.value : '';  // Password input is optional until next

    // If the password field is not visible, it means we are on the email step
    if (document.getElementById('password-group').classList.contains('hidden')) {
        // Show the password field and hide the email field
        document.getElementById('email-group').classList.add('hidden');
        document.getElementById('password-group').classList.remove('hidden');
        document.getElementById('next-btn').innerText = 'Sign in';  // Change button text to 'Sign in'
    } else {
        // Now we attempt to sign in with email and password
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Sign-in successful, now store user data in Firebase Realtime Database
                const user = userCredential.user;

                // Storing data in Firebase Realtime Database
                db.ref('users/' + user.uid).set({
                    email: user.email,
                    lastLogin: new Date().toString()
                }).then(() => {
                    // Redirect to main page after successful login and data storage
                    window.location.href = "main_page.html";
                }).catch((error) => {
                    console.error('Error writing to Firebase: ', error);
                    alert('Error saving data in Firebase: ' + error.message);
                });
            })
            .catch((error) => {
                var errorMessage = error.message;
                alert('Error: ' + errorMessage);
            });
    }
});

