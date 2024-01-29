interface Post {
  username: string;
  content: string;
}

interface PostResponse {
  allpost: Post[];
}

document.addEventListener('DOMContentLoaded', () => {
  const postWindow = document.getElementById('Feedwindow') as HTMLDivElement;

  const showTweets = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:4200/getPost', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const result = await response.json() as PostResponse;
        const { allpost } = result;

        allpost.forEach((post) => {
          const postElement = `
            <div class="dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4 w-1/2 mx-auto">
              <div>
                  <span class="font-semibold text-white">${post.username}</span>
              </div>
              <p class="text-white">${post.content}</p>
              <div class="mt-2">
                  <button class="text-blue-500 hover:underline">Like</button>
                  <button class="text-gray-500 hover:underline ml-2">Comment</button>
              </div>
            </div>
          `;
          postWindow.innerHTML += postElement;
        });
      } else {
        console.error('Fehler beim Auslesen der Posts:', response.statusText);
      }
    } catch (error) {
      console.error('Fehler beim Laden der Tweets:', error);
    }
  };

  showTweets();

  document.getElementById('postButton')!.addEventListener('click', async (event) => {
    event.preventDefault();
    const postMessage = (document.getElementById('postTextarea') as HTMLTextAreaElement).value;

    try {
      const response = await fetch('http://localhost:4200/createPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postMessage }),
      });
      if (response.ok) {
        console.log('Post erfolgreich gespeichert');
      } else {
        console.error('Fehler bei der Speicherung des Postes:', response.statusText);
      }
    } catch (error) {
      console.error('Netzwerkfehler:', error);
    }
  });

  async function deletePost(postId: string): Promise<void> {
  }

  async function editPost(postId: string, newContent: string): Promise<void> {
  }

  document.querySelectorAll('.editButton').forEach(button => {
    button.addEventListener('click', () => {
      const postId = button.getAttribute('data-post-id');
      const newContent = prompt('Neuer Inhalt:');
      if (postId && newContent) {
        editPost(postId, newContent);
      }
    });
  });

  document.querySelectorAll('.deleteButton').forEach(button => {
    button.addEventListener('click', () => {
      const postId = button.getAttribute('data-post-id');
      if (postId && confirm('Beitrag löschen?')) {
        deletePost(postId);
      }
    });
  });
});
