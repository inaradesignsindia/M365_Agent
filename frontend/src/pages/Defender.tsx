import { Stack, Text, DocumentCard, DocumentCardTitle, DocumentCardDetails } from '@fluentui/react'

const Defender = () => {
  return (
    <Stack tokens={{ childrenGap: 20, padding: 20 }}>
      <Text variant="xLarge">Microsoft Defender</Text>
      <Stack horizontal tokens={{ childrenGap: 20 }}>
        <DocumentCard styles={{ root: { width: 300 } }}>
          <DocumentCardTitle title="Secure Score" />
          <DocumentCardDetails>
            <Text variant="xxLarge">67%</Text>
          </DocumentCardDetails>
        </DocumentCard>
        <DocumentCard styles={{ root: { width: 300 } }}>
          <DocumentCardTitle title="Active Incidents" />
          <DocumentCardDetails>
            <Text variant="xxLarge">3</Text>
          </DocumentCardDetails>
        </DocumentCard>
        <DocumentCard styles={{ root: { width: 300 } }}>
          <DocumentCardTitle title="Devices at Risk" />
          <DocumentCardDetails>
            <Text variant="xxLarge">21</Text>
          </DocumentCardDetails>
        </DocumentCard>
      </Stack>
    </Stack>
  )
}

export default Defender