import { Stack, Text, DocumentCard, DocumentCardTitle, DocumentCardDetails, Icon } from '@fluentui/react'

const ServiceHealth = () => {
  const services = [
    { name: 'Entra ID', status: 'Healthy', icon: 'CheckMark' },
    { name: 'Exchange Online', status: 'Advisory', icon: 'Warning' },
    { name: 'Microsoft Teams', status: 'Incident', icon: 'Error' },
    { name: 'Intune', status: 'Healthy', icon: 'CheckMark' },
  ]

  return (
    <Stack tokens={{ childrenGap: 20, padding: 20 }}>
      <Text variant="xLarge">Service Health</Text>
      <Stack tokens={{ childrenGap: 10 }}>
        {services.map(service => (
          <DocumentCard key={service.name} styles={{ root: { width: '100%' } }}>
            <DocumentCardDetails>
              <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
                <Icon iconName={service.icon} />
                <Text variant="large">{service.name}</Text>
                <Text>{service.status}</Text>
              </Stack>
            </DocumentCardDetails>
          </DocumentCard>
        ))}
      </Stack>
    </Stack>
  )
}

export default ServiceHealth