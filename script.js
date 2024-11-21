// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZAnKjWmv3cWhwOXpL7UjRgOpwK6mQVi0",
    authDomain: "django-eb349.firebaseapp.com",
    databaseURL: "https://django-eb349-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "django-eb349",
    storageBucket: "django-eb349.appspot.com",
    messagingSenderId: "271670409370",
    appId: "1:271670409370:web:51498b4b417669173f8723"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get the necessary Firebase authentication methods
const auth = firebase.auth();

// This function is triggered when the user clicks the 'Next' button
function handleNext() {
    var emailInput = document.getElementById("email");
    var emailGroup = document.getElementById("email-group");
    var passwordGroup = document.getElementById("password-group");

    // Check if the email input is not empty
    if (emailInput.value) {
        // Hide the email input field and show the password input field
        emailGroup.classList.add("hidden");
        passwordGroup.classList.remove("hidden");
        passwordGroup.querySelector("input").focus(); // Focus the password field
    } else {
        // If the email field is empty, show an alert
        alert("Please enter your email address");
    }
}

// This function is triggered when the user clicks the 'Sign In' button after entering the password
function handleSignIn() {
    var emailInput = document.getElementById("email").value;
    var passwordInput = document.getElementById("password").value;

    // Ensure email and password are filled out
    if (emailInput && passwordInput) {
        // Firebase sign-in using email and password
        auth.signInWithEmailAndPassword(emailInput, passwordInput)
            .then((userCredential) => {
                // Successfully signed in
                alert("Signed in successfully!");
                window.location.href = "index.html"; // Redirect to the main page
            })
            .catch((error) => {
                // If there is an error, show the error message
                var errorCode = error.code;
                var errorMessage = error.message;
                alert("Error: " + errorMessage);
            });
    } else {
        alert("Please fill in both fields");
    }
}

// Add event listeners for Enter key press to trigger Next and Sign In actions
document.getElementById("email").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        handleNext(); // Trigger 'Next' when Enter is pressed on the email field
    }
});

document.getElementById("password").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        handleSignIn(); // Trigger 'Sign In' when Enter is pressed on the password field
    }
});



