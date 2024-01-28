import fetchMock from 'jest-fetch-mock';

describe('Client', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should handle successful login', async () => {
    const loginUsername = 'testuser';
    const loginPassword = 'testpassword';
    const mockResponse: LoginResponse = {
      token: 'testtoken',
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

    try {
      const result = await login(loginUsername, loginPassword);

      expect(result).toEqual('testtoken');
      expect(fetchMock).toHaveBeenCalledWith('http://localhost:4200/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginUsername, loginPassword }),
      });
    } catch (error) {
      // Fügen Sie ggf. hier Überprüfungen hinzu, falls die Funktion eine Ausnahme auslöst.
    }
  });

  it('should handle failed login', async () => {
    const loginUsername = 'testuser';
    const loginPassword = 'wrongpassword';

    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 401 });

    try {
      await login(loginUsername, loginPassword);
    } catch (error) {
      expect(error).toEqual('Unauthorized');
      expect(fetchMock).toHaveBeenCalledWith('http://localhost:4200/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginUsername, loginPassword }),
      });
    }
  });

  it('should handle network error during login', async () => {
    const loginUsername = 'testuser';
    const loginPassword = 'testpassword';

    fetchMock.mockRejectOnce(new Error('Network Error'));

    try {
      await login(loginUsername, loginPassword);
    } catch (error) {
      expect(error.message).toEqual('Network Error');
      expect(fetchMock).toHaveBeenCalledWith('http://localhost:4200/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginUsername, loginPassword }),
      });
    }
  });
});
function login(loginUsername: string, loginPassword: string) {
    throw new Error('Function not implemented.');
}

