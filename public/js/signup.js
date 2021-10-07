const signUpFormHandler = async (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (name && email && password) {
    fetch('/api/users/create', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (response.ok) {
          fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
          })
            .then((response) => {
              if (response.ok) {
                document.location.replace('/');
              } else {
                alert('Failed to log in');
              }
            })
            .catch((err) => window.alert(err));
        } else {
          window.alert('Something went wrong in user creation, try again');
        }
      })

      .catch((err) => window.alert(err));
  }
};

document
  .getElementById('sign-up-button')
  .addEventListener('click', signUpFormHandler);
