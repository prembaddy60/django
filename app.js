// Firebase SDK Import (Modular)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js';

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

// Canvas Animation Setup
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to fill the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'rgba(241, 196, 15, 0.7)';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1; // Shrink the particle
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

// Create particles when mouse moves
function createParticles(e) {
    const xPos = e.x;
    const yPos = e.y;
    for (let i = 0; i < 5; i++) {
        particles.push(new Particle(xPos, yPos));
    }
}

// Animate particles
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].size <= 0.2) {
            particles.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animateParticles);
}

// Event listener for mouse movement
canvas.addEventListener('mousemove', createParticles);

// Start the animation
animateParticles();

// Handle form submission and save to Firebase
document.getElementById('saveBtn').addEventListener('click', () => {
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;
    
    if (title && content) {
        // Save note to Firebase
        const notesRef = ref(database, 'notes/' + Date.now());
        set(notesRef, {
            title: title,
            content: content,
            timestamp: Date.now()
        })
        .then(() => {
            // Show success message
            const successMessage = document.getElementById('successMessage');
            successMessage.style.display = 'block';

            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 2000);

            // Append the note to the notes list
            const notesList = document.getElementById('notesList');
            const newNote = document.createElement('li');
            newNote.innerHTML = `
                <strong class="note-user">Anonymous</strong>
                <p>${title}</p>
                <p>${content}</p>
                <button class="delete-btn">Delete</button>
            `;
            notesList.appendChild(newNote);

            // Add delete functionality for each note
            const deleteBtn = newNote.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                notesList.removeChild(newNote);
            });

            // Reset input fields
            document.getElementById('noteTitle').value = '';
            document.getElementById('noteContent').value = '';
        })
        .catch((error) => {
            console.error("Error saving note:", error);
        });
    } else {
        alert("Please provide both a title and content for the note.");
    }
});
