import { Stack, Text } from '@fluentui/react'

const MessageCenter = () => {
  return (
    <Stack tokens={{ childrenGap: 20, padding: 20 }}>
      <Text variant="xLarge">Message Center</Text>
      <Text>View important messages and announcements from Microsoft.</Text>
    </Stack>
  )
}

export default MessageCenter