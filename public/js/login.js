const loginFormHandler = async (event) => {
  event.preventDefault();
  const email = document.getElementById('log-in-email').value.trim();
  const password = document.getElementById('log-in-password').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  }
  console.log('hello');
};

document
  .getElementById('login-button')
  .addEventListener('click', loginFormHandler);
