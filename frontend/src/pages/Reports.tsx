import { Stack, Text, DetailsList, SelectionMode } from '@fluentui/react'
import type { IColumn } from '@fluentui/react'
import ReportBuilder from '../components/ReportBuilder'

const Reports = () => {
  const items = [
    { key: '1', name: 'User Activity Report', date: '2023-10-01', status: 'Completed' },
    { key: '2', name: 'Security Audit', date: '2023-10-02', status: 'In Progress' },
    { key: '3', name: 'Performance Metrics', date: '2023-10-03', status: 'Completed' },
  ]

  const columns: IColumn[] = [
    { key: 'name', name: 'Report Name', fieldName: 'name', minWidth: 100, maxWidth: 200 },
    { key: 'date', name: 'Date', fieldName: 'date', minWidth: 100, maxWidth: 150 },
    { key: 'status', name: 'Status', fieldName: 'status', minWidth: 100, maxWidth: 150 },
  ]

  return (
    <Stack tokens={{ childrenGap: 24 }}>
      <Text variant="xxLarge" styles={{ root: { fontWeight: 600 } }}>Reports</Text>
      <Text variant="large" styles={{ root: { color: '#605e5c' } }}>Generate and view analytics reports</Text>

      <Stack tokens={{ childrenGap: 16 }}>
        <Text variant="xLarge" styles={{ root: { fontWeight: 600 } }}>Report Builder</Text>
        <ReportBuilder />
      </Stack>

      <Stack tokens={{ childrenGap: 16 }}>
        <Text variant="xLarge" styles={{ root: { fontWeight: 600 } }}>Recent Reports</Text>
        <DetailsList
          items={items}
          columns={columns}
          selectionMode={SelectionMode.none}
          styles={{
            root: {
              '.ms-DetailsRow': {
                backgroundColor: '#ffffff',
                borderBottom: '1px solid #edebe9',
              },
              '.ms-DetailsHeader': {
                backgroundColor: '#f3f2f1',
                borderBottom: '1px solid #edebe9',
              },
            },
          }}
        />
      </Stack>
    </Stack>
  )
}

export default Reports