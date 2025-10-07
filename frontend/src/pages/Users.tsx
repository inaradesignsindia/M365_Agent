import { Stack, Text } from '@fluentui/react'

const Users = () => {
  return (
    <Stack tokens={{ childrenGap: 20, padding: 20 }}>
      <Text variant="xLarge">Users</Text>
      <Text>Manage users and permissions</Text>
    </Stack>
  )
}

export default Users