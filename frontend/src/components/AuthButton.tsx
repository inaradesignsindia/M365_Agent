import { useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';

const AuthButton = () => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = accounts.length > 0;
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (isAuthenticated) {
      acquireTokenAndFetchUser();
    } else {
      setUser(null);
    }
  }, [isAuthenticated]);

  const acquireTokenAndFetchUser = async () => {
    try {
      const response = await instance.acquireTokenSilent(loginRequest);
      const accessToken = response.accessToken;

      // Call Netlify function
      const res = await fetch('/.netlify/functions/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      } else {
        console.error('Failed to fetch user');
      }
    } catch (error) {
      console.error('Error acquiring token or fetching user:', error);
    }
  };

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch(e => console.error(e));
  };

  const handleLogout = () => {
    instance.logoutPopup().catch(e => console.error(e));
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.displayName || accounts[0]?.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default AuthButton;