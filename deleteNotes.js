// Import Firebase and Firebase Database from the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getDatabase, ref, remove, get } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

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
const database = getDatabase(app);

// Fetch notes from Firebase and display them with a delete button
window.onload = function() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';  // Clear the existing notes

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

                const li = document.createElement('li');
                li.innerHTML = `<div class="note-user">${user}</div>
                               <div class="note-timestamp">${formattedDate}</div>
                               <div class="note-text">${note}</div>
                               <button class="delete-btn" data-id="${key}">Delete</button>`;
                notesList.appendChild(li);

                // Add event listener for the delete button
                const deleteBtn = li.querySelector('.delete-btn');
                deleteBtn.addEventListener('click', () => deleteNoteFromFirebase(key));
            });
        } else {
            const noNotesMessage = document.createElement('li');
            noNotesMessage.classList.add('no-notes');
            noNotesMessage.textContent = "No notes available!";
            notesList.appendChild(noNotesMessage);
        }
    }).catch((error) => {
        console.error("Error fetching notes:", error);
    });
};

// Delete note from Firebase
function deleteNoteFromFirebase(noteId) {
    const noteRef = ref(database, 'notes/' + noteId);
    remove(noteRef)
        .then(() => {
            alert("Note deleted successfully");
            window.location.reload(); // Reload the page to update the list
        })
        .catch((error) => {
            console.error("Error deleting note:", error);
        });
}





