// Firebase configuration and initialization
const firebaseConfig = {
    apiKey: "AIzaSyDZAnKjWmv3cWhwOXpL7UjRgOpwK6mQVi0",
    authDomain: "django-eb349.firebaseapp.com",
    databaseURL: "https://django-eb349-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "django-eb349",
    storageBucket: "django-eb349.appspot.com",
    messagingSenderId: "271670409370",
    appId: "1:271670409370:web:51498b4b417669173f8723"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const noteInput = document.getElementById('noteInput');
const userNameInput = document.getElementById('userNameInput');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const successMessage = document.getElementById('successMessage');

// Function to save the note to Firebase
saveNoteBtn.addEventListener('click', () => {
    const noteText = noteInput.value.trim();
    const userName = userNameInput.value.trim();

    if (noteText !== "" && userName !== "") {
        const newNoteRef = database.ref('notes').push();

        newNoteRef.set({
            user: userName,
            note: noteText,
            timestamp: Date.now()
        })
        .then(() => {
            successMessage.style.display = "block"; // Show success message
            successMessage.textContent = "Note saved successfully!";
            noteInput.value = "";                   // Clear input fields
            userNameInput.value = "";               // Clear input fields

            setTimeout(() => successMessage.style.display = "none", 3000); // Hide message after 3 seconds
        })
        .catch((error) => {
            console.error("Error saving note:", error);
        });
    } else {
        alert("Please enter both name and note.");
    }
});
