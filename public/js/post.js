const newPost = async () => {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const response = await fetch('/api/users/post', {
    method: 'POST',
    body: JSON.stringify({ title, content }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

document.getElementById('post').addEventListener('click', newPost);
