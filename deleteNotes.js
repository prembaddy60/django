// Firebase Configuration (Update with your own Firebase credentials)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js';
import { getDatabase, ref, get, remove } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js';

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

window.onload = function() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';  // Clear existing notes

    const notesRef = ref(database, 'notes');
    get(notesRef).then(snapshot => {
        if (snapshot.exists()) {
            const notesData = snapshot.val();
            Object.keys(notesData).forEach(key => {
                const note = notesData[key].note;
                const user = notesData[key].user;

                const li = document.createElement('li');
                li.innerHTML = `
                    <div><strong>User: </strong>${user}</div>
                    <div><strong>Note: </strong>${note}</div>
                    <button class="delete-btn" onclick="deleteNote('${key}')">🗑️ Delete Note</button>
                `;
                notesList.appendChild(li);
            });
        } else {
            notesList.innerHTML = '<li class="no-notes">No notes found. 📝</li>';
        }
    }).catch(error => {
        console.error("Error fetching notes: ", error);
    });
};

// Delete a note from Firebase
function deleteNote(noteId) {
    const noteRef = ref(database, 'notes/' + noteId);
    remove(noteRef)
        .then(() => {
            alert('Note deleted successfully! 🗑️');
            location.reload(); // Reload the page to update the list
        })
        .catch(error => {
            console.error("Error deleting note: ", error);
        });
}







