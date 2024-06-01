document.addEventListener('DOMContentLoaded', fetchData);

function fetchData() {
    fetch('https://reqres.in/api/users?page=1&per_page=6')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayDataInTable(data.data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function displayDataInTable(users) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = ''; 

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${user.avatar}" alt="Avatar"></td>
            <td>${user.first_name}</td>
            <td>${user.last_name}</td>
            <td>${user.email}</td>
        `;
        tableBody.appendChild(row);
    });
}