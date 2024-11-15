// Save note to Firebase
saveNoteBtn.addEventListener('click', () => {
    const noteText = noteInput.value.trim();
    const userName = userNameInput.value.trim();

    if (noteText !== "" && userName !== "") {
        const newNoteRef = database.ref('notes').push();  // Push to 'notes' collection in Firebase

        // Use Promise properly to handle asynchronous Firebase operation
        newNoteRef.set({
            user: userName,
            note: noteText,
            timestamp: Date.now()
        })
        .then(() => {
            console.log("Note saved successfully!");
            // Clear the note input field and user name field
            noteInput.value = "";
            userNameInput.value = "";

            // Show success message
            successMessage.style.display = "block";

            // Hide the success message after 3 seconds
            setTimeout(() => {
                successMessage.style.display = "none";
            }, 3000);
        })
        .catch((error) => {
            console.error("Error saving note:", error);
        });
    } else {
        alert("Please enter both a note and a user name.");
    }
});
