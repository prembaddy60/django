// Import necessary Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

// Firebase Configuration (Replace these values with your own Firebase credentials)
const firebaseConfig = {
    apiKey: "AIzaSyDZAnKjWmv3cWhwOXpL7UjRgOpwK6mQVi0",   // Your Firebase API Key
    authDomain: "django-eb349.firebaseapp.com",        // Your Firebase Auth Domain
    databaseURL: "https://django-eb349-default-rtdb.asia-southeast1.firebasedatabase.app",  // Your Firebase Database URL
    projectId: "django-eb349",                         // Your Firebase Project ID
    storageBucket: "django-eb349.appspot.com",         // Your Firebase Storage Bucket
    messagingSenderId: "271670409370",                 // Your Messaging Sender ID
    appId: "1:271670409370:web:51498b4b417669173f8723" // Your App ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// DOM Elements
const noteInput = document.getElementById('noteInput');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const successMessage = document.getElementById('successMessage');

// Save note to Firebase
saveNoteBtn.addEventListener('click', () => {
    const noteText = noteInput.value.trim();
    
    if (noteText !== "") {
        const notesRef = ref(database, 'notes');
        const newNoteRef = push(notesRef);  // Push a new note to Firebase

        set(newNoteRef, {
            note: noteText
        }).then(() => {
            console.log("Note saved successfully!");
            noteInput.value = "";  // Clear the input field after saving
            successMessage.style.display = 'block';  // Show success message
            setTimeout(() => successMessage.style.display = 'none', 3000);  // Hide success message after 3 seconds
        }).catch((error) => {
            console.error("Error saving note:", error);
        });
    }
});
