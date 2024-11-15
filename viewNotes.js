// Firebase Configuration (same as in your app.js)
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

window.onload = function() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';  // Clear existing notes

    const notesRef = database.ref('notes');
    
    // Use 'on' for real-time updates
    notesRef.on('value', (snapshot) => {
        const notesData = snapshot.val();
        notesList.innerHTML = '';  // Clear list to avoid duplicates

        if (notesData) {
            Object.keys(notesData).forEach(key => {
                const note = notesData[key].note;
                const user = notesData[key].user;
                const timestamp = notesData[key].timestamp;

                // Format date from timestamp
                const date = new Date(timestamp);
                const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

                // Create list item with note data
                const li = document.createElement('li');
                li.innerHTML = `<div class="note-user"><strong>${user}</strong></div>
                               <div class="note-timestamp">${formattedDate}</div>
                               <div class="note-text">${note}</div>`;
                notesList.appendChild(li);  // Append each note to the list
            });
        } else {
            // Display a message if no notes are found
            notesList.innerHTML = "<li>No notes found.</li>";
        }
    });
};

