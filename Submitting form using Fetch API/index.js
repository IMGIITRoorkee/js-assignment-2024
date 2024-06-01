const submit = document.getElementById('submit');

async function submitData(event) {
    event.preventDefault(); 

    const user_email = document.getElementById('email').value;
    const user_password = document.getElementById('password').value;

    const emailRegex = /^[^\s@]+@(?:gmail|yahoo|reqres)\.(in|com)$/;
    const passwordRegex = /^([0-9A-Za-z]+)$/;

    try {
        if (!emailRegex.test(user_email)) {
            alert('Email is not valid. Please use a Gmail or Yahoo or reqres email.');
            return;
        }

        if (!passwordRegex.test(user_password)) {
            alert('Password cannot be empty');
            return;
        }

        const response = await fetch('https://reqres.in/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: user_email, password: user_password })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        document.getElementById('loginForm').reset();

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

submit.addEventListener('click', submitData);