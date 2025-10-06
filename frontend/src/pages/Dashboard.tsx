import { Stack, Text, PrimaryButton, DocumentCard, DocumentCardTitle, DocumentCardDetails } from '@fluentui/react'

const Dashboard = () => {
  return (
    <Stack tokens={{ childrenGap: 20, padding: 20 }}>
      <Text variant="xLarge">Dashboard</Text>
      <Stack horizontal tokens={{ childrenGap: 20 }}>
        <DocumentCard styles={{ root: { width: 300 } }}>
          <DocumentCardTitle title="Users" />
          <DocumentCardDetails>
            <Text>Manage users and permissions</Text>
          </DocumentCardDetails>
        </DocumentCard>
        <DocumentCard styles={{ root: { width: 300 } }}>
          <DocumentCardTitle title="Reports" />
          <DocumentCardDetails>
            <Text>View analytics and reports</Text>
          </DocumentCardDetails>
        </DocumentCard>
        <DocumentCard styles={{ root: { width: 300 } }}>
          <DocumentCardTitle title="Settings" />
          <DocumentCardDetails>
            <Text>Configure system settings</Text>
          </DocumentCardDetails>
        </DocumentCard>
      </Stack>
      <PrimaryButton text="Get Started" />
    </Stack>
  )
}

export default Dashboard