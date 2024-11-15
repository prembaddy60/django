// Firebase Configuration (same as in app.js)
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
    notesList.innerHTML = '';  // Clear any existing notes before displaying new ones

    const notesRef = database.ref('notes');  // Reference to the 'notes' node in Firebase
    
    // Use 'on' to listen for changes in real-time
    notesRef.on('value', (snapshot) => {
        const notesData = snapshot.val();  // Get the data from Firebase
        notesList.innerHTML = '';  // Clear the list to prevent duplicate notes

        if (notesData) {
            // Iterate over each note in the data
            Object.keys(notesData).forEach(key => {
                const note = notesData[key].note;
                const user = notesData[key].user;
                const timestamp = notesData[key].timestamp;

                // Format the timestamp into a readable date format
                const date = new Date(timestamp);
                const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

                // Create a list item to display the note
                const li = document.createElement('li');
                li.innerHTML = `
                    <div class="note-user"><strong>${user}</strong></div>
                    <div class="note-timestamp">${formattedDate}</div>
                    <div class="note-text">${note}</div>
                `;
                notesList.appendChild(li);  // Append the note to the list
            });
        } else {
            // If no notes are available, display a message
            const noNotesLi = document.createElement('li');
            noNotesLi.classList.add('no-notes');
            noNotesLi.textContent = 'No notes found.';
            notesList.appendChild(noNotesLi);
        }
    });
};


