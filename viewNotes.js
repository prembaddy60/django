// viewNotes.js

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

// Firebase configuration (use your actual config)
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

// Credentials (modify as needed, but this is simple for the demo)
const validCredentials = {
    username: 'admin',
    password: 'Shan1312'
};

// Function to check login credentials
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check if credentials match
    if (username === validCredentials.username && password === validCredentials.password) {
        // Hide login form and show the main content
        document.getElementById("loginForm").style.display = 'none';
        document.getElementById("mainContent").style.display = 'block';

        // Fetch and display notes
        fetchNotes();
    } else {
        // Show error message if invalid credentials
        document.getElementById("errorMessage").style.display = 'block';
    }
}

// Function to fetch notes from Firebase
async function fetchNotes() {
    const notesList = document.getElementById('notesList');
    const loadingMessage = document.getElementById('loadingMessage');
    
    notesList.innerHTML = '';  // Clear existing notes
    loadingMessage.style.display = 'block';  // Show loading message

    const notesRef = ref(database, 'notes');
    try {
        const snapshot = await get(notesRef);
        loadingMessage.style.display = 'none';  // Hide loading message
        if (snapshot.exists()) {
            const notesData = snapshot.val();
            Object.keys(notesData).forEach(key => {
                const note = notesData[key].note;
                const user = notesData[key].user;
                const timestamp = notesData[key].timestamp;

                const date = new Date(timestamp);
                const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

                const li = document.createElement('li');
                li.innerHTML = `
                    <div class="note-user">${user}</div>
                    <div class="note-timestamp">${formattedDate}</div>
                    <div class="note-text">${note}</div>
                `;
                notesList.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.classList.add('no-notes');
            li.textContent = "No notes found.";
            notesList.appendChild(li);
        }
    } catch (error) {
        loadingMessage.style.display = 'none';  // Hide loading message on error
        console.error("Error fetching notes:", error);
    }
}
