// Firebase Configuration
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
    firebase.app();
}

const database = firebase.database();

// Fetch and display notes
window.onload = function() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = ''; // Clear any existing notes

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
                li.innerHTML = `
                    <div class="note-user">${user}</div>
                    <div class="note-timestamp">${formattedDate}</div>
                    <div class="note-text">${note}</div>
                    <button class="deleteNoteBtn" data-id="${key}">Delete</button>
                `;
                notesList.appendChild(li);

                // Add event listener to the delete button
                const deleteBtn = li.querySelector('.deleteNoteBtn');
                deleteBtn.addEventListener('click', function() {
                    const noteId = deleteBtn.getAttribute('data-id');
                    deleteNote(noteId);
                });
            });
        } else {
            console.log("No notes found.");
        }
    });
};

// Delete note from Firebase
function deleteNote(noteId) {
    const noteRef = database.ref('notes/' + noteId);
    noteRef.remove()
        .then(() => {
            console.log('Note deleted successfully!');
            document.getElementById('successMessage').style.display = 'block';
            // Optionally hide the success message after 3 seconds
            setTimeout(() => {
                document.getElementById('successMessage').style.display = 'none';
            }, 3000);

            // Remove the note from the UI
            const noteItem = document.querySelector(`button[data-id="${noteId}"]`).parentElement;
            noteItem.remove();
        })
        .catch((error) => {
            console.error('Error deleting note:', error);
        });
}
