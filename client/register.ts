// TypeScript-Version des obigen JavaScript-Codes.

// Event-Listener, der darauf wartet, dass das gesamte Dokument geladen ist.
document.addEventListener('DOMContentLoaded', () => {
  // Holt das Login-Navigationsbutton-Element und stellt sicher, dass es als HTMLButtonElement behandelt wird.
  const loginButton = document.getElementById('loginNavigationButton') as HTMLButtonElement;
  // Fügt dem Login-Button einen Click-Event-Listener hinzu.
  loginButton.addEventListener('click', () => {
    const login = 'index.html';
    // Ändert die aktuelle URL auf die Login-Seite, wenn der Button angeklickt wird.
    window.location.href = 'register.html';
  });

  // Holt das Registrierungsformularelement und stellt sicher, dass es als HTMLFormElement behandelt wird.
  const registrationForm = document.getElementById('registrationForm') as HTMLFormElement;
  // Fügt dem Registrierungsformular einen Submit-Event-Listener hinzu.
  registrationForm.addEventListener('submit', async (event: Event) => {
    // Verhindert das standardmäßige Verhalten des Formulars (Neuladen der Seite).
    event.preventDefault();
    // Liest die Benutzername-, Passwort- und E-Mail-Eingaben aus dem Formular aus.
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    // Versucht, einen HTTP-POST-Request an den Server zu senden.
    try {
      const response = await fetch('http://localhost:4200/register', {
        method: 'POST', // Verwendet POST-Methode.
        headers: {
          'Content-Type': 'application/json', // Setzt den Content-Type des Requests auf 'application/json'.
        },
        body: JSON.stringify({ username, password, }), // Sendet die Benutzerdaten im JSON-Format.
      });

      // Überprüft, ob die Antwort vom Server positiv ist.
      if (response.ok) {
        console.log('Registrierung erfolgreich.');
      } else {
        // Gibt einen Fehler aus, wenn die Registrierung fehlschlägt.
        console.error('Fehler bei der Registrierung:', response.statusText);
      }
    } catch (error) {
      // Fängt Netzwerkfehler und gibt sie auf der Konsole aus.
      console.error('Netzwerkfehler:', error);
    }
  });
});
