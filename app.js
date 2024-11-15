// Import necessary Firebase modules (using Firebase v9 modular SDK)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

// Firebase Configuration (replace with your own Firebase credentials)
const firebaseConfig = {
    apiKey: "AIzaSyDZAnKjWmv3cWhwOXpL7UjRgOpwK6mQVi0",
    authDomain: "django-eb349.firebaseapp.com",
    databaseURL: "https://django-eb349-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "django-eb349",
    storageBucket: "django-eb349.appspot.com",
    messagingSenderId: "271670409370",
    appId: "1:271670409370:web:51498b4b417669173f8723"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Get a reference to the Firebase Realtime Database
const database = getDatabase(app);

// DOM Elements
const noteInput = document.getElementById('noteInput');
const userNameInput = document.getElementById('userNameInput');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const successMessage = document.getElementById('successMessage');

// Save note to Firebase
saveNoteBtn.addEventListener('click', () => {
    const noteText = noteInput.value.trim();
    const userName = userNameInput.value.trim();

    if (noteText !== "" && userName !== "") {
        const newNoteRef = ref(database, 'notes/' + Date.now()); // Create a reference for a new note

        // Save the note to Firebase Realtime Database using the new method
        set(newNoteRef, {
            user: userName,
            note: noteText,
            timestamp: Date.now()
        })
        .then(() => {
            console.log("Note saved successfully!");

            // Clear input fields
            noteInput.value = "";
            userNameInput.value = "";

            // Show success message
            successMessage.style.display = "block";

            // Hide success message after 3 seconds
            setTimeout(() => {
                successMessage.style.display = "none";
            }, 3000);
        })
        .catch((error) => {
            console.error("Error saving note:", error);
        });
    }
});
