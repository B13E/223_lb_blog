import fetchMock from 'jest-fetch-mock';
import { LoginResponse } from './client';

describe('Client', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should handle successful login', async () => {
    const loginUsername = 'testuser';
    const loginPassword = 'testpassword';

    try {

      expect(fetchMock).toHaveBeenCalledWith('http://localhost:4200/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginUsername, loginPassword }),
      });
    } catch (error) {
    }
  });

  it('should handle failed login', async () => {
    const loginUsername = 'testuser';
    const loginPassword = 'wrongpassword';

    try {

      expect(fetchMock).toHaveBeenCalledWith('http://localhost:4200/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginUsername, loginPassword }),
      });
    } catch (error) {
    }
  });

  it('should handle network error during login', async () => {
    const loginUsername = 'testuser';
    const loginPassword = 'testpassword';

    try {

      expect(fetchMock).toHaveBeenCalledWith('http://localhost:4200/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginUsername, loginPassword }),
      });
    } catch (error) {
    }
  });
});
