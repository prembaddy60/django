import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

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

// Save note to Firebase
const saveNoteBtn = document.getElementById('saveNoteBtn');
saveNoteBtn.addEventListener('click', () => {
    const noteText = document.getElementById('noteInput').value.trim();
    const userName = document.getElementById('userNameInput').value.trim();

    if (noteText !== "" && userName !== "") {
        const newNoteRef = push(ref(database, 'notes'));
        set(newNoteRef, {
            user: userName,
            note: noteText,
            timestamp: Date.now()
        }).then(() => {
            console.log("Note saved successfully!");
        }).catch((error) => {
            console.error("Error saving note:", error);
        });
    }
});
