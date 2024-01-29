document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('loginNavigationButton') as HTMLButtonElement;
  loginButton.addEventListener('click', () => {
    const login = 'index.html';
    window.location.href = 'register.html';
  });

  const registrationForm = document.getElementById('registrationForm') as HTMLFormElement;
  registrationForm.addEventListener('submit', async (event: Event) => {
    event.preventDefault();
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    try {
      const response = await fetch('http://localhost:4200/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log('Registrierung erfolgreich.');
      } else {
        console.error('Fehler bei der Registrierung:', response.statusText);
      }
    } catch (error) {
      console.error('Netzwerkfehler:', error);
    }
  });
});
