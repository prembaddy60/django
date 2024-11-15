// Firebase Configuration (same as your app.js)
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

// Load notes from Firebase
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

                // Format date from timestamp (optional)
                const date = new Date(timestamp);
                const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

                const li = document.createElement('li');
                li.innerHTML = `<div class="note-user">${user}</div>
                               <div class="note-timestamp">${formattedDate}</div>
                               <div class="note-text">${note}</div>`;
                notesList.appendChild(li);  // Append each note to the list
            });
        } else {
            // Display a message if no notes are found
            const noNotesMessage = document.createElement('li');
            noNotesMessage.classList.add('no-notes');
            noNotesMessage.textContent = 'No notes available.';
            notesList.appendChild(noNotesMessage);
        }
    });
};



