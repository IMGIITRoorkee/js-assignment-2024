document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('Name').value.trim();
        const age = document.getElementById('Age').value.trim();
        const gender = document.querySelector('input[name="gender"]:checked');
        const email = document.getElementById('Email').value.trim();
        const education = document.getElementById('Education').value;
        const city = document.getElementById('City').value.trim();
        const phone = document.getElementById('Phone').value.trim();
        const password = document.getElementById('Password').value;
        const confirmPassword = document.getElementById('ConfirmPassword').value;

        const usernameRegex = /^[^0-9]+[A-Za-z]+$/;
        const ageRegex = /^\d+$/;
        const phoneRegex = /^\+91\d{10}$/;
        const emailRegex = /^[^\s@]+@(?:gmail|yahoo)\.com$/;

        if (!usernameRegex.test(username)) {
            showError('Enter a valid name!');
            return;
        }

        else if (!age || !ageRegex.test(age)) {
            showError('Age must be a valid number');
            return;
        }

        else if (!gender) {
            showError('Gender is required');
            return;
        }

        else if (!email || !emailRegex.test(email)) {
            showError('Email is not valid. Please use a Gmail or Yahoo email.');
            return;
        }

        else if (!city || city.length === 0) {
            showError('City is required');
            return;
        }

        else if (!phone || !phoneRegex.test(phone)) {
            showError('Phone number must be a valid Indian number starting with +91');
            return;
        }

        else if (!password) {
            showError("Password can't be empty");
            return;
        }

        else if (password !== confirmPassword) {
            showError('Passwords do not match');
            return;
        }

        form.reset();
        alert('Form submitted successfully!');
    });

    function showError(message) {
        alert(message);
    }
});
