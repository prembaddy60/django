// Import the necessary Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getDatabase, ref, push, set, get, child } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

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
const notesList = document.getElementById('notesList');

// Save note to Firebase
saveNoteBtn.addEventListener('click', () => {
    const noteText = noteInput.value.trim();
    
    console.log("Note Text to Save:", noteText);  // Debugging: Log the note text

    if (noteText !== "") {
        const notesRef = ref(database, 'notes');  // Reference to 'notes' in Firebase
        const newNoteRef = push(notesRef);  // Push to 'notes' collection in Firebase

        set(newNoteRef, {
            note: noteText
        }).then(() => {
            console.log("Note saved successfully!");
            noteInput.value = "";  // Clear the input field after saving
            loadNotes();  // Reload notes again to display them
        }).catch((error) => {
            console.error("Error saving note:", error);  // Log errors if any occur
        });
    }
});

// Load notes from Firebase
function loadNotes() {
    notesList.innerHTML = '';  // Clear the existing notes

    const notesRef = ref(database, 'notes');
    get(notesRef).then((snapshot) => {
        const notesData = snapshot.val();
        console.log("Loaded Notes:", notesData);

        if (notesData) {
            Object.keys(notesData).forEach(key => {
                const note = notesData[key].note;
                const li = document.createElement('li');
                li.textContent = note;
                notesList.appendChild(li);  // Append each note to the list
            });
        } else {
            console.log("No notes found.");
        }
    }).catch((error) => {
        console.error("Error loading notes:", error);  // Log errors if any occur
    });
}

// Initial load when the page is loaded
window.onload = function() {
    loadNotes();
};
