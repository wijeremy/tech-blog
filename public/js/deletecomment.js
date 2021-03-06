const deleteButtons = document.getElementsByClassName('btn-danger');

for (let i = 0; i < deleteButtons.length; i++) {
  const id = deleteButtons[i].getAttribute('data-delete');
  deleteButtons[i].addEventListener('click', async (e) => {
    e.preventDefault();
    const route = '../api/users/comment/' + id;
    const response = await fetch(route, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      setTimeout(() => {
        document.location.reload();
      }, 300);
    } else {
      alert(response.statusText);
    }
    console.log(route);
  });
}
