import { Stack, Text, Toggle, TextField, PrimaryButton } from '@fluentui/react'
import { useState, useEffect } from 'react'

const Settings = () => {
  const [clientId, setClientId] = useState('')
  const [tenantId, setTenantId] = useState('')

  useEffect(() => {
    const storedClientId = localStorage.getItem('clientId') || ''
    const storedTenantId = localStorage.getItem('tenantId') || ''
    setClientId(storedClientId)
    setTenantId(storedTenantId)
  }, [])

  const handleSave = () => {
    localStorage.setItem('clientId', clientId)
    localStorage.setItem('tenantId', tenantId)
    alert('Settings saved. Please reload the page for changes to take effect.')
  }

  return (
    <Stack tokens={{ childrenGap: 24 }}>
      <Text variant="xxLarge" styles={{ root: { fontWeight: 600 } }}>Settings</Text>
      <Text variant="large" styles={{ root: { color: '#605e5c' } }}>Configure system preferences and integrations</Text>

      <Stack tokens={{ childrenGap: 16 }}>
        <Text variant="xLarge" styles={{ root: { fontWeight: 600 } }}>General</Text>
        <TextField label="Organization Name" defaultValue="M365 Agent" styles={{ root: { maxWidth: 400 } }} />
        <Toggle label="Enable Notifications" defaultChecked />
        <Toggle label="Dark Mode" />
      </Stack>

      <Stack tokens={{ childrenGap: 16 }}>
        <Text variant="xLarge" styles={{ root: { fontWeight: 600 } }}>Azure AD Integration</Text>
        <Text variant="medium" styles={{ root: { color: '#605e5c' } }}>
          Configure your Azure Active Directory settings. Note: Changes require a page reload.
        </Text>
        <TextField
          label="Client ID"
          value={clientId}
          onChange={(_e, newValue) => setClientId(newValue || '')}
          styles={{ root: { maxWidth: 400 } }}
        />
        <TextField
          label="Tenant ID"
          value={tenantId}
          onChange={(_e, newValue) => setTenantId(newValue || '')}
          styles={{ root: { maxWidth: 400 } }}
        />
      </Stack>

      <PrimaryButton text="Save Changes" onClick={handleSave} />
    </Stack>
  )
}

export default Settings