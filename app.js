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

// Elements
const userNameInput = document.getElementById('userNameInput');
const noteInput = document.getElementById('noteInput');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const successMessage = document.getElementById('successMessage');

// Save note to Firebase
saveNoteBtn.addEventListener('click', function() {
    const userName = userNameInput.value.trim();  // Trim to remove leading/trailing spaces
    const noteText = noteInput.value.trim();      // Trim to remove leading/trailing spaces

    if (userName && noteText) {
        const newNoteRef = ref(database, 'notes/' + Date.now());

        // Save the note to Firebase Database
        set(newNoteRef, {
            user: userName,
            note: noteText,
            timestamp: Date.now()
        }).then(() => {
            // Display success message with fade-in effect
            successMessage.classList.add('show');

            // Hide success message after 3 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 3000);

            // Reset the input fields
            userNameInput.value = '';
            noteInput.value = '';
        }).catch((error) => {
            // Display error message to the user
            alert("There was an error saving your note. Please try again.");
            console.error("Error saving note:", error);
        });
    } else {
        // Highlight the empty field
        if (!userName) {
            userNameInput.style.borderColor = 'red';  // Red border for missing name
        } else {
            userNameInput.style.borderColor = '';
        }

        if (!noteText) {
            noteInput.style.borderColor = 'red';      // Red border for missing note
        } else {
            noteInput.style.borderColor = '';
        }

        alert("Please provide both your name and a note.");
    }
});
