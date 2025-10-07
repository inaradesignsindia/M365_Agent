import { Stack, Text, DetailsList, PrimaryButton } from '@fluentui/react'
import type { IColumn } from '@fluentui/react'

const Users = () => {
  const users = [
    { displayName: 'John Doe', upn: 'johndoe@contoso.com', status: 'Enabled', created: '2024-08-12' },
    { displayName: 'Jane Smith', upn: 'janesmith@contoso.com', status: 'Enabled', created: '2024-07-25' },
    { displayName: 'Guest User', upn: 'guest_123@external.com', status: 'Blocked', created: '2024-09-01' },
  ]

  const columns: IColumn[] = [
    { key: 'displayName', name: 'Display Name', fieldName: 'displayName', minWidth: 150 },
    { key: 'upn', name: 'User Principal Name', fieldName: 'upn', minWidth: 200 },
    { key: 'status', name: 'Status', fieldName: 'status', minWidth: 100 },
    { key: 'created', name: 'Created', fieldName: 'created', minWidth: 100 },
  ]

  return (
    <Stack tokens={{ childrenGap: 20, padding: 20 }}>
      <Stack horizontal horizontalAlign="space-between">
        <div>
          <Text variant="xLarge">All Users</Text>
          <Text>Manage users and permissions</Text>
        </div>
        <PrimaryButton text="New User" />
      </Stack>
      <DetailsList items={users} columns={columns} />
    </Stack>
  )
}

export default Users