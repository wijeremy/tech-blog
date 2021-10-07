const comment = async () => {
  const content = document.getElementById('content').value;
  const post_id = document.getElementById('post').getAttribute('data-id');
  const response = await fetch('/api/users/comment', {
    method: 'POST',
    body: JSON.stringify({ content, post_id }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    setTimeout(() => {
      document.location.reload();
    }, 300);
  } else {
    alert(response.statusText);
  }
};

document.getElementById('comment').addEventListener('click', comment);
