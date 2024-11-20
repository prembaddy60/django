// Firebase SDK imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

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

// Elements
const userNameInput = document.getElementById('userNameInput');
const noteInput = document.getElementById('noteInput');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const successMessage = document.getElementById('successMessage');

// Save note to Firebase and display success message
saveNoteBtn.addEventListener('click', function() {
    const userName = userNameInput.value;
    const noteText = noteInput.value;

    if (userName && noteText) {
        const newNoteRef = ref(database, 'notes/' + Date.now());

        // Save the note to Firebase Database
        set(newNoteRef, {
            user: userName,
            note: noteText,
            timestamp: Date.now()
        }).then(() => {
            // Show success message
            successMessage.style.display = 'block';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);

            // Reset the input fields
            userNameInput.value = '';
            noteInput.value = '';
        }).catch((error) => {
            console.error("Error saving note:", error);
        });
    } else {
        alert("Please provide your name and a note.");
    }
});

// Canvas background animation (adjust the canvas size dynamically)
const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function Particle(x, y, size, speedX, speedY, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
}

function createParticles(event) {
    const xPos = event.x;
    const yPos = event.y;
    const size = Math.random() * 3 + 1;
    const speedX = Math.random() * 2 - 1;
    const speedY = Math.random() * 2 - 1;
    const color = "rgba(241, 196, 15, 0.8)";
    particles.push(new Particle(xPos, yPos, size, speedX, speedY, color));
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.size -= 0.05;

        if (particle.size <= 0) {
            particles.splice(i, 1);
            i--;
        }

        ctx.fillStyle = particle.color;
        ctx.strokeStyle = particle.color;
        ctx.lineWidth = particle.size;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
}

canvas.addEventListener("mousemove", createParticles);
function animate() {
    animateParticles();
    requestAnimationFrame(animate);
}
animate();
