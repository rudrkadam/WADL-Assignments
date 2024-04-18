document.addEventListener('DOMContentLoaded', function () {
  const userData = JSON.parse(localStorage.getItem('userData')) || [];

  const tableBody = document.querySelector('#userTable tbody');
  userData.forEach(function (user) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td>${user.city}</td>
    `;
    tableBody.appendChild(row);
  });
});
