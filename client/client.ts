interface LoginResponse {
  message: string;
}

interface RegistrationResponse {
  success: boolean;
  message: string;
}

document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('loginButton') as HTMLButtonElement | null;
  loginButton?.addEventListener('click', async () => {

    const loginUsername = (document.getElementById('loginUsername') as HTMLInputElement).value;
    const loginPassword = (document.getElementById('loginPassword') as HTMLInputElement).value;

    try {
      const response = await fetch('http://localhost:4200/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginUsername, loginPassword }),
      });

      if (response.ok) {
        const result = await response.json() as LoginResponse;
        console.log('Login erfolgreich. Nachricht:', result.message);

      } else {
        console.error('Fehler beim Login:', response.statusText);
      }
    } catch (error) {
      console.error('Netzwerkfehler:', error);
    }
  });

  const registerButton = document.getElementById('registerButton') as HTMLButtonElement | null;
  registerButton?.addEventListener('click', () => {
    window.location.href = 'register.html';
  });
});

export {LoginResponse }
