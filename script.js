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

// Get references to DOM elements
const emailGroup = document.getElementById('email-group');
const passwordGroup = document.getElementById('password-group');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const nextButton = document.getElementById('next-btn');
const signInButton = document.getElementById('sign-in-btn');

// Show password input group when "Next" button is clicked
nextButton.addEventListener('click', function () {
    const email = emailInput.value;
    if (email) {
        emailGroup.classList.add('hidden'); // Hide email input group
        passwordGroup.classList.remove('hidden'); // Show password input group
    } else {
        alert('Please enter your email');
    }
});

// Handle sign-in button click
signInButton.addEventListener('click', function () {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (email && password) {
        // Authenticate user with Firebase
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log('User signed in:', userCredential.user);
                // Redirect to the main index page
                window.location.href = 'index.html';
            })
            .catch((error) => {
                console.error('Error signing in:', error.message);
                alert(error.message);
            });
    } else {
        alert('Please enter email and password');
    }
});
