document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        city: document.getElementById('city').value
    };

    // Get existing user data from local storage or initialize an empty array
    let userData = JSON.parse(localStorage.getItem('userData')) || [];

    // Add new user data to the array
    userData.push(formData);

    // Save the updated user data back to local storage
    localStorage.setItem('userData', JSON.stringify(userData));

    alert('Registration successful!');
    window.location.href = 'display.html'; // Redirect to display page
});
