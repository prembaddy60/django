// Import necessary Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

// Firebase Configuration (use the same credentials as your app)
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
const notesList = document.getElementById('notesList');

// Function to load and display notes
function loadNotes() {
    const notesRef = ref(database, 'notes');
    
    get(notesRef).then((snapshot) => {
        if (snapshot.exists()) {
            const notesData = snapshot.val();
            Object.keys(notesData).forEach(key => {
                const note = notesData[key].note;
                const li = document.createElement('li');
                li.textContent = note;
                notesList.appendChild(li); // Add each note as a list item
            });
        } else {
            console.log("No notes found.");
        }
    }).catch((error) => {
        console.error("Error loading notes:", error);
    });
}

// Call the loadNotes function when the page is loaded
window.onload = function() {
    loadNotes();
};
