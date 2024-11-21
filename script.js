document.getElementById('nextButton').addEventListener('click', function () {
    const emailInput = document.getElementById('email');
    const emailGroup = document.getElementById('emailGroup');
    const passwordGroup = document.getElementById('passwordGroup');

    if (emailInput.value.trim() === "") {
        alert("Please enter your email or phone.");
        return;
    }

    // Hide email input and show password input
    emailGroup.style.display = "none";
    passwordGroup.style.display = "block";

    // Change the button text to "Sign in"
    this.textContent = "Sign in";

    // Replace the "Next" button functionality to submit the form
    this.addEventListener('click', function () {
        const passwordInput = document.getElementById('password');
        if (passwordInput.value.trim() === "") {
            alert("Please enter your password.");
        } else {
            alert("Logging in...");
            // Form submission logic can go here.
        }
    });
});
