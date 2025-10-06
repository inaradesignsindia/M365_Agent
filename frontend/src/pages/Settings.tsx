import { Stack, Text, Toggle, TextField, PrimaryButton } from '@fluentui/react'

const Settings = () => {
  return (
    <Stack tokens={{ childrenGap: 20, padding: 20 }}>
      <Text variant="xLarge">Settings</Text>
      <TextField label="Organization Name" defaultValue="M365 Agent" />
      <Toggle label="Enable Notifications" defaultChecked />
      <Toggle label="Dark Mode" />
      <PrimaryButton text="Save Changes" />
    </Stack>
  )
}

export default Settings