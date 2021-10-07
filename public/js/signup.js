const signUpFormHandler = async (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (name && email && password) {
    const response1 = await fetch('/api/users/create', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // if (response1.ok) {
    //   const response2 = await fetch('/api/users/login', {
    //     method: 'POST',
    //     body: JSON.stringify({ email, password }),
    //     headers: { 'Content-Type': 'application/json' },
    //   });
    //   if (response2.ok) {
    //     document.location.replace('/');
    //   } else {
    //     alert('Failed to log in');
    //   }
    // } else {
    //   alert('Failed to log in');
    // }
  }
  console.log('hello');
};

document
  .getElementById('sign-up-button')
  .addEventListener('click', signUpFormHandler);
