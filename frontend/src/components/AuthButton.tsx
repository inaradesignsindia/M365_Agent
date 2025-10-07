import { useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';
import { Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton, TextField } from '@fluentui/react';

const AuthButton = () => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = accounts.length > 0;
  console.log('AuthButton - isAuthenticated:', isAuthenticated, 'accounts:', accounts);
  const [user, setUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientId, setClientId] = useState('');
  const [tenantId, setTenantId] = useState('');

  useEffect(() => {
    console.log('AuthButton useEffect - isAuthenticated:', isAuthenticated);
    if (isAuthenticated) {
      acquireTokenAndFetchUser();
    } else {
      setUser(null);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setClientId(localStorage.getItem('clientId') || '');
    setTenantId(localStorage.getItem('tenantId') || '');
  }, []);

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

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSave = () => {
    localStorage.setItem('clientId', clientId);
    localStorage.setItem('tenantId', tenantId);
    console.log('Settings saved - Client ID:', clientId, 'Tenant ID:', tenantId);
    setIsModalOpen(false);
    // Reload page to apply new MSAL config
    window.location.reload();
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.displayName || accounts[0]?.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleOpenModal}>Settings</button>
        </div>
      )}
      <Dialog
        hidden={!isModalOpen}
        onDismiss={handleCloseModal}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Azure AD Settings',
          subText: 'Configure Client ID and Tenant ID',
        }}
        modalProps={{
          isBlocking: false,
        }}
      >
        <TextField
          label="Client ID"
          value={clientId}
          onChange={(_e, newValue) => setClientId(newValue || '')}
        />
        <TextField
          label="Tenant ID"
          value={tenantId}
          onChange={(_e, newValue) => setTenantId(newValue || '')}
        />
        <DialogFooter>
          <PrimaryButton onClick={handleSave} text="Save" />
          <DefaultButton onClick={handleCloseModal} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default AuthButton;
