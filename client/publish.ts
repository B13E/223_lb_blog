// Typdefinitionen für Post und PostResponse zur Verwendung in der Anwendung.
interface Post {
  username: string;
  content: string;
}

interface PostResponse {
  allpost: Post[];
}

// Dieser Event-Listener wird ausgelöst, sobald das gesamte Dokument geladen ist.
document.addEventListener('DOMContentLoaded', () => {
  // Referenz auf das Element, in dem die Beiträge angezeigt werden.
  const postWindow = document.getElementById('Feedwindow') as HTMLDivElement;

  // Asynchrone Funktion, um Beiträge vom Server zu laden.
  const showTweets = async (): Promise<void> => {
    try {
      // Sendet eine GET-Anfrage an den Server, um die Beiträge zu erhalten.
      const response = await fetch('http://localhost:4200/getPost', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Prüft, ob die Anfrage erfolgreich war.
      if (response.ok) {
        // Wandelt die Antwort in JSON um und extrahiert die Beiträge.
        const result = await response.json() as PostResponse;
        const { allpost } = result;

        // Für jeden Beitrag wird HTML generiert und zum postWindow hinzugefügt.
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

  // Aufruf der showTweets-Funktion beim Laden der Seite.
  showTweets();

  // Event-Listener für den Post-Button, um einen neuen Beitrag zu erstellen.
  document.getElementById('postButton')!.addEventListener('click', async (event) => {
    event.preventDefault();
    // Auslesen des Inhalts des Textfeldes und des gespeicherten JWT-Tokens.
    const postMessage = (document.getElementById('postTextarea') as HTMLTextAreaElement).value;
    const jwtToken = localStorage.getItem('Token') ?? '';

    // Versuch, den neuen Beitrag an den Server zu senden.
    try {
      const response = await fetch('http://localhost:4200/createPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Sendet den Beitrag und das JWT-Token im JSON-Format.
        body: JSON.stringify({ postMessage, jwtToken }),
      });
      // Prüft, ob die Anfrage erfolgreich war.
      if (response.ok) {
        console.log('Post erfolgreich gespeichert');
      } else {
        console.error('Fehler bei der Speicherung des Postes:', response.statusText);
      }
    } catch (error) {
      console.error('Netzwerkfehler:', error);
    }
  });

  // ... vorhandener Code ...

// Funktion zum Löschen eines Beitrags
async function deletePost(postId: string): Promise<void> {
  // Implementierung der Löschfunktion
}

// Funktion zum Bearbeiten eines Beitrags
async function editPost(postId: string, newContent: string): Promise<void> {
  // Implementierung der Bearbeitungsfunktion
}

// Hinzufügen von Event-Listenern für Bearbeiten- und Löschen-Buttons
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
