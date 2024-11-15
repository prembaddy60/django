// Import necessary Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js';
import { getDatabase, ref, get, remove } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js';

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
const app = initializeApp(firebaseConfig);

// Get a reference to the Firebase Realtime Database
const database = getDatabase(app);

// Load notes from Firebase and display them
window.onload = function() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';  // Clear the existing notes list

    const notesRef = ref(database, 'notes');
    get(notesRef).then((snapshot) => {
        const notesData = snapshot.val();
        if (notesData) {
            Object.keys(notesData).forEach(key => {
                const note = notesData[key].note;
                const user = notesData[key].user;
                const timestamp = notesData[key].timestamp;

                // Format date from timestamp (optional)
                const date = new Date(timestamp);
                const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

                // Create list item for each note with a delete button
                const li = document.createElement('li');
                li.innerHTML = `
                    <div class="note-user">${user}</div>
                    <div class="note-timestamp">${formattedDate}</div>
                    <div class="note-text">${note}</div>
                    <button class="deleteNoteBtn" data-id="${key}">Delete</button>
                `;
                notesList.appendChild(li);  // Append the note to the list
            });

            // Add delete functionality for each note
            const deleteBtns = document.querySelectorAll('.deleteNoteBtn');
            deleteBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const noteId = e.target.dataset.id;  // Get the note ID from the data-id attribute
                    deleteNote(noteId);  // Call the deleteNote function
                });
            });
        } else {
            const noNotesLi = document.createElement('li');
            noNotesLi.classList.add('no-notes');
            noNotesLi.innerText = "No notes found.";
            notesList.appendChild(noNotesLi);
        }
    });
};

// Function to delete note from Firebase
function deleteNote(noteId) {
    const noteRef = ref(database, 'notes/' + noteId);  // Reference the specific note
    remove(noteRef)  // Remove the note from Firebase
    .then(() => {
        document.getElementById('successMessage').style.display = 'block';  // Show success message
        setTimeout(() => {
            document.getElementById('successMessage').style.display = 'none';  // Hide message after 3 seconds
        }, 3000);

        // Reload the notes list after deletion
        window.onload();
    })
    .catch((error) => {
        console.error("Error deleting note: ", error);
    });
}
