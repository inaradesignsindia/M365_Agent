import { Stack, Text, DocumentCard, DocumentCardTitle, DocumentCardDetails, Icon, DetailsList } from '@fluentui/react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import type { IColumn } from '@fluentui/react'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const Dashboard = () => {
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Successful Sign-ins',
      data: [1200, 1500, 1300, 1600, 1800, 1750, 1900],
      borderColor: '#0078d4',
      backgroundColor: 'rgba(0, 120, 212, 0.1)',
    }]
  }

  const activities = [
    { action: 'Password Reset', user: 'admin@contoso.com', target: 'jane.doe@contoso.com', timestamp: '2 minutes ago' },
    { action: 'Policy Assignment', user: 'policy.admin@contoso.com', target: '"All Staff" Group', timestamp: '1 hour ago' },
    { action: 'Device Enrollment', user: 'system', target: 'DESKTOP-ABC123', timestamp: '3 hours ago' },
  ]

  const columns: IColumn[] = [
    { key: 'action', name: 'Action', fieldName: 'action', minWidth: 100 },
    { key: 'user', name: 'User', fieldName: 'user', minWidth: 150 },
    { key: 'target', name: 'Target', fieldName: 'target', minWidth: 150 },
    { key: 'timestamp', name: 'Timestamp', fieldName: 'timestamp', minWidth: 100 },
  ]

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

      <Stack tokens={{ childrenGap: 16 }}>
        <Text variant="xLarge" styles={{ root: { fontWeight: 600 } }}>User Sign-ins (Last 7 Days)</Text>
        <div style={{ height: '300px' }}>
          <Line data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      </Stack>

      <Stack tokens={{ childrenGap: 16 }}>
        <Text variant="xLarge" styles={{ root: { fontWeight: 600 } }}>Recent Admin Actions</Text>
        <DetailsList items={activities} columns={columns} />
      </Stack>
    </Stack>
  )
}

export default Dashboard