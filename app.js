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
saveNoteBtn.addEventListener('click', function(e) {
    const userName = userNameInput.value;
    const noteText = noteInput.value;

    if (userName && noteText) {
        const newNoteRef = ref(database, 'notes/' + Date.now());

        // Save the note to Firebase Database
        set(newNoteRef, {
            user: userName,
            note: noteText,
            timestamp: Date.now()
        }).then(() => {
            // Trigger ripple effect
            triggerRippleEffect(e);

            // Display success message
            successMessage.style.display = 'block';
            successMessage.style.color = 'yellow'; // Change message text color to yellow

            // Hide success message after 3 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);

            // Reset the input fields
            userNameInput.value = '';
            noteInput.value = '';
        }).catch((error) => {
            console.error("Error saving note:", error);
        });
    } else {
        alert("Please provide your name and a note.");
    }
});

// Function to trigger the ripple effect
function triggerRippleEffect(e) {
    // Create the ripple element
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    // Append the ripple to the button
    saveNoteBtn.appendChild(ripple);

    // Get the button's dimensions and position
    const rect = saveNoteBtn.getBoundingClientRect();
    const size = Math.max(saveNoteBtn.offsetWidth, saveNoteBtn.offsetHeight); // Get the larger dimension (width or height)

    // Position the ripple at the click location
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    // Remove the ripple after the animation ends
    setTimeout(() => {
        ripple.remove();
    }, 600);  // Match this time with the ripple animation duration
}
