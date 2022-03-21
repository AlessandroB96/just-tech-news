//upvote button to work. We'll need to add an event listener to the button and then make a fetch() request to the /api/posts/upvote endpoint.

//define function asyncrounously since it will make an asyncronous PUT request with fetch()
async function upvoteClickHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch('/api/posts/upvote', {
        method: 'PUT',
        body: JSON.stringify({
          post_id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
}

document.querySelector('.upvote-btn').addEventListener('click', upvoteClickHandler);