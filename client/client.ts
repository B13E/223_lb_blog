// Typdefinitionen für die erwarteten Antwortstrukturen.
interface LoginResponse {
  token: string;
}

interface RegistrationResponse {
  success: boolean;
  message: string;
}

// Diese Funktion wird aufgerufen, sobald das DOM vollständig geladen ist.
document.addEventListener('DOMContentLoaded', () => {
  // Event-Listener für den Login-Button
  const loginButton = document.getElementById('loginButton') as HTMLButtonElement | null;
  loginButton?.addEventListener('click', async () => {
    // Der restliche Code für den Login-Button

    // Lese den Benutzernamen und das Passwort aus den Eingabefeldern aus.
    const loginUsername = (document.getElementById('loginUsername') as HTMLInputElement).value;
    const loginPassword = (document.getElementById('loginPassword') as HTMLInputElement).value;

    try {
      // Sende eine POST-Anfrage an den Server für den Login.
      const response = await fetch('http://localhost:4200/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginUsername, loginPassword }),
      });

      if (response.ok) {
        // Wenn die Anfrage erfolgreich ist, verarbeite die Antwort.
        const result = await response.json() as LoginResponse;
        console.log('Login erfolgreich. Token:', result.token);

        // Speichere das Token im lokalen Speicher und leite den Benutzer zur 'publish.html'-Seite weiter.
        localStorage.setItem('Token', result.token);
        window.location.href = 'publish.html';
      } else {
        // Wenn die Anfrage fehlschlägt, zeige eine Fehlermeldung an.
        console.error('Fehler beim Login:', response.statusText);
      }
    } catch (error) {
      // Behandele Netzwerkfehler.
      console.error('Netzwerkfehler:', error);
    }
  });

  // Event-Listener für den Registrieren-Button
  const registerButton = document.getElementById('registerButton') as HTMLButtonElement | null;
  registerButton?.addEventListener('click', () => {
    // Leite den Benutzer zur 'register.html'-Seite weiter, wenn der Registrieren-Button angeklickt wird.
    window.location.href = 'register.html';
  });
});
