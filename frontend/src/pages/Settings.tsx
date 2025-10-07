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
    <Stack tokens={{ childrenGap: 20, padding: 20 }}>
      <Text variant="xLarge">Settings</Text>
      <TextField label="Organization Name" defaultValue="M365 Agent" />
      <TextField label="Azure AD Client ID" value={clientId} onChange={(_e, newValue) => setClientId(newValue || '')} />
      <TextField label="Azure AD Tenant ID" value={tenantId} onChange={(_e, newValue) => setTenantId(newValue || '')} />
      <Toggle label="Enable Notifications" defaultChecked />
      <Toggle label="Dark Mode" />
      <PrimaryButton text="Save Changes" onClick={handleSave} />
    </Stack>
  )
}

export default Settings