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
        }).catch((error) => {
            console.error("Error saving note:", error);  // Log errors if any occur
        });
    }
});
