const editButtons = document.getElementsByClassName('btn-primary');

for (let i = 0; i < editButtons.length; i++) {
  const id = editButtons[i].getAttribute('data-edit');
  editButtons[i].addEventListener('click', async (e) => {
    e.preventDefault();
    const route = '../api/users/post/' + id;
    const response = await fetch(route, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      console.log('success');
      setTimeout(() => {
        document.location.reload();
      }, 300);
    } else {
      alert(response.statusText);
    }
    console.log(route);
  });
}
