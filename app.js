// Firebase Configuration (same as your app.js)
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
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

const database = firebase.database();

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
        const newNoteRef = database.ref('notes').push();  // Push to 'notes' collection in Firebase

        newNoteRef.set({
            user: userName,
            note: noteText,
            timestamp: Date.now()
        }).then(() => {
            console.log("Note saved successfully!");

            // Clear the note input field and user name field
            noteInput.value = "";
            userNameInput.value = "";

            // Show success message
            successMessage.style.display = "block";

            // Hide the success message after 3 seconds
            setTimeout(() => {
                successMessage.style.display = "none";
            }, 3000);
        }).catch((error) => {
            console.error("Error saving note:", error);  // Log errors if any occur
        });
    } else {
        alert("Please enter a name and a note before saving!");
    }
});
