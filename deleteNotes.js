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
    firebase.app(); // Use the existing Firebase app
}

const database = firebase.database();

// Fetch and display notes with delete buttons
window.onload = function() {
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

                // Format date from timestamp
                const date = new Date(timestamp);
                const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

                const li = document.createElement('li');
                li.innerHTML = `<div class="note-user">${user}</div>
                               <div class="note-timestamp">${formattedDate}</div>
                               <div class="note-text">${note}</div>
                               <button class="delete-btn" data-id="${key}">Delete</button>`;
                notesList.appendChild(li);  // Append each note to the list
            });

            // Attach delete event listeners
            const deleteButtons = document.querySelectorAll('.delete-btn');
            deleteButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const noteId = this.getAttribute('data-id');
                    deleteNote(noteId);
                });
            });
        } else {
            notesList.innerHTML = "<li>No notes found.</li>";
        }
    });
};

// Function to delete note
function deleteNote(noteId) {
    const noteRef = database.ref('notes/' + noteId);
    noteRef.remove()
        .then(() => {
            console.log("Note deleted successfully");
            // Reload notes after deletion
            window.location.reload();
        })
        .catch((error) => {
            console.error("Error deleting note:", error);
        });
}




