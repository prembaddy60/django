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
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // Use the existing Firebase app
}

const database = firebase.database();

// DOM Elements
const noteInput = document.getElementById('noteInput');
const userNameInput = document.getElementById('userNameInput');
const saveNoteBtn = document.getElementById('saveNoteBtn');

// Save note to Firebase
saveNoteBtn.addEventListener('click', () => {
    const noteText = noteInput.value.trim();
    const userName = userNameInput.value.trim();

    if (noteText !== "" && userName !== "") {
        const newNoteRef = database.ref('notes').push();  // Push to 'notes' collection in Firebase

        newNoteRef.set({
            user: userName,
            note: noteText,
            timestamp: Date.now()
        }).then(() => {
            console.log("Note saved successfully!");
            noteInput.value = "";  // Clear the note input field after saving
            userNameInput.value = "";  // Clear the username input field
            loadNotes();  // Reload notes again to display them
        }).catch((error) => {
            console.error("Error saving note:", error);  // Log errors if any occur
        });
    }
});

// Load notes from Firebase
function loadNotes() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';  // Clear the existing notes

    const notesRef = database.ref('notes');
    notesRef.once('value', (snapshot) => {
        const notesData = snapshot.val();
        if (notesData) {
            Object.keys(notesData).forEach(key => {
                const note = notesData[key].note;
                const user = notesData[key].user;
                const timestamp = notesData[key].timestamp;

                // Format date from timestamp (optional)
                const date = new Date(timestamp);
                const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

                const li = document.createElement('li');
                li.innerHTML = `<strong>${user}</strong> (${formattedDate}): <br>${note}`;
                notesList.appendChild(li);  // Append each note to the list
            });
        } else {
            console.log("No notes found.");
        }
    });
}

// Initial load when the page is loaded
window.onload = function() {
    loadNotes();
};
