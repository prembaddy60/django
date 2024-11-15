// Import Firebase and Firebase Database from the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-storage.js";

// Firebase Configuration
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
const storage = getStorage(app);

// Elements
const userNameInput = document.getElementById('userNameInput');
const noteInput = document.getElementById('noteInput');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const imageUploadInput = document.getElementById('imageUploadInput');
const uploadImageBtn = document.getElementById('uploadImageBtn');
const imagePreview = document.getElementById('imagePreview');

// Save note to Firebase
saveNoteBtn.addEventListener('click', function() {
    const userName = userNameInput.value;
    const noteText = noteInput.value;

    if (userName && noteText) {
        // Create a reference to the notes node
        const newNoteRef = ref(database, 'notes/' + Date.now());

        // Save the note to Firebase Database
        set(newNoteRef, {
            user: userName,
            note: noteText,
            timestamp: Date.now()
        }).then(() => {
            alert("Note saved successfully!");
        }).catch((error) => {
            console.error("Error saving note:", error);
        });
    } else {
        alert("Please provide your name and a note.");
    }
});

// Image upload functionality
let uploadedImageURL = ""; // Variable to store the uploaded image URL

uploadImageBtn.addEventListener('click', function() {
    const file = imageUploadInput.files[0];
    if (file) {
        const storageReference = storageRef(storage, 'images/' + file.name);
        
        // Upload the image to Firebase Storage
        uploadBytes(storageReference, file).then((snapshot) => {
            console.log("Image uploaded successfully!");

            // Get the image URL after upload
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                uploadedImageURL = downloadURL;

                // Preview the uploaded image
                imagePreview.innerHTML = `<img src="${downloadURL}" alt="Uploaded Image" style="max-width: 300px;">`;
            }).catch((error) => {
                console.error("Error getting image URL:", error);
            });
        }).catch((error) => {
            console.error("Error uploading image:", error);
        });
    } else {
        alert("Please select an image to upload.");
    }
});
