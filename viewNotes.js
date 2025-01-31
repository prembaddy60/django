import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

// Firebase configuration
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

window.onload = function() {
    fetchNotes();
};

function fetchNotes() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';  // Clear the existing notes

    const notesRef = ref(database, 'notes');
    get(notesRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const notesData = snapshot.val();
                Object.keys(notesData).forEach(key => {
                    const noteData = notesData[key];
                    const noteText = noteData.note || 'No Note Text';
                    const user = noteData.user || 'Anonymous';
                    const timestamp = noteData.timestamp || Date.now();

                    // Format date from timestamp
                    const date = new Date(timestamp);
                    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

                    // Append note to the list
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <div class="note-user">${user}</div>
                        <div class="note-timestamp">${formattedDate}</div>
                        <div class="note-text">${noteText}</div>
                    `;
                    notesList.appendChild(li);
                });
            } else {
                displayNoNotesFound(notesList);
            }
        })
        .catch((error) => {
            console.error("Error fetching notes:", error);
            displayNoNotesFound(notesList);
        });
}

function displayNoNotesFound(container) {
    const li = document.createElement('li');
    li.classList.add('no-notes');
    li.textContent = "No notes found.";
    container.appendChild(li);
}
