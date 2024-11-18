// Import Firebase and Firebase Database from the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

// Firebase Configuration
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
const userNameInput = document.getElementById('userNameInput');
const noteInput = document.getElementById('noteInput');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const successMessage = document.getElementById('successMessage');

// Save note to Firebase
saveNoteBtn.addEventListener('click', function () {
    const userName = userNameInput.value.trim();
    const noteText = noteInput.value.trim();

    if (userName && noteText) {
        const newNoteRef = ref(database, 'notes/' + Date.now());

        // Save note to Firebase
        set(newNoteRef, {
            user: userName,
            note: noteText,
            timestamp: Date.now()
        }).then(() => {
            // Trigger animation on the button
            saveNoteBtn.classList.add('clicked');

            // Show success message with animation
            successMessage.classList.add('show');

            // Hide success message after 3 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 3000);

            // Reset input fields
            userNameInput.value = '';
            noteInput.value = '';

            // Remove animation class
            setTimeout(() => {
                saveNoteBtn.classList.remove('clicked');
            }, 500);
        }).catch((error) => {
            console.error("Error saving note:", error);
            alert("An error occurred while saving the note. Please try again.");
        });
    } else {
        alert("Please provide both your name and a note.");
    }
});
