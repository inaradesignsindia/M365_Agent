import { Stack, Text, DocumentCard, DocumentCardTitle, DocumentCardDetails, Icon } from '@fluentui/react'

const Dashboard = () => {
  return (
    <Stack tokens={{ childrenGap: 24 }}>
      <Text variant="xxLarge" styles={{ root: { fontWeight: 600 } }}>Dashboard</Text>
      <Text variant="large" styles={{ root: { color: '#605e5c' } }}>Welcome to Microsoft 365 Admin Center</Text>

      <Stack horizontal tokens={{ childrenGap: 20 }} wrap>
        <DocumentCard styles={{ root: { width: 320, minHeight: 120 } }}>
          <DocumentCardDetails>
            <Stack horizontal tokens={{ childrenGap: 12 }}>
              <Icon iconName="People" styles={{ root: { fontSize: 32, color: '#0078d4' } }} />
              <Stack>
                <Text variant="large" styles={{ root: { fontWeight: 600 } }}>1,234</Text>
                <Text styles={{ root: { color: '#605e5c' } }}>Active Users</Text>
              </Stack>
            </Stack>
          </DocumentCardDetails>
        </DocumentCard>

        <DocumentCard styles={{ root: { width: 320, minHeight: 120 } }}>
          <DocumentCardDetails>
            <Stack horizontal tokens={{ childrenGap: 12 }}>
              <Icon iconName="Group" styles={{ root: { fontSize: 32, color: '#0078d4' } }} />
              <Stack>
                <Text variant="large" styles={{ root: { fontWeight: 600 } }}>89</Text>
                <Text styles={{ root: { color: '#605e5c' } }}>Groups</Text>
              </Stack>
            </Stack>
          </DocumentCardDetails>
        </DocumentCard>

        <DocumentCard styles={{ root: { width: 320, minHeight: 120 } }}>
          <DocumentCardDetails>
            <Stack horizontal tokens={{ childrenGap: 12 }}>
              <Icon iconName="TeamsLogo" styles={{ root: { fontSize: 32, color: '#0078d4' } }} />
              <Stack>
                <Text variant="large" styles={{ root: { fontWeight: 600 } }}>45</Text>
                <Text styles={{ root: { color: '#605e5c' } }}>Teams</Text>
              </Stack>
            </Stack>
          </DocumentCardDetails>
        </DocumentCard>

        <DocumentCard styles={{ root: { width: 320, minHeight: 120 } }}>
          <DocumentCardDetails>
            <Stack horizontal tokens={{ childrenGap: 12 }}>
              <Icon iconName="ReportDocument" styles={{ root: { fontSize: 32, color: '#0078d4' } }} />
              <Stack>
                <Text variant="large" styles={{ root: { fontWeight: 600 } }}>12</Text>
                <Text styles={{ root: { color: '#605e5c' } }}>Reports</Text>
              </Stack>
            </Stack>
          </DocumentCardDetails>
        </DocumentCard>
      </Stack>

      <Stack tokens={{ childrenGap: 16 }}>
        <Text variant="xLarge" styles={{ root: { fontWeight: 600 } }}>Quick Actions</Text>
        <Stack horizontal tokens={{ childrenGap: 16 }} wrap>
          <DocumentCard styles={{ root: { width: 280, cursor: 'pointer' } }}>
            <DocumentCardTitle title="Add User" />
            <DocumentCardDetails>
              <Text>Create a new user account</Text>
            </DocumentCardDetails>
          </DocumentCard>

          <DocumentCard styles={{ root: { width: 280, cursor: 'pointer' } }}>
            <DocumentCardTitle title="Create Group" />
            <DocumentCardDetails>
              <Text>Set up a new security group</Text>
            </DocumentCardDetails>
          </DocumentCard>

          <DocumentCard styles={{ root: { width: 280, cursor: 'pointer' } }}>
            <DocumentCardTitle title="Generate Report" />
            <DocumentCardDetails>
              <Text>Run usage analytics report</Text>
            </DocumentCardDetails>
          </DocumentCard>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Dashboard