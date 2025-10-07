import { Stack, Text, DocumentCard, DocumentCardTitle, DocumentCardDetails } from '@fluentui/react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const Intune = () => {
  const data = {
    labels: ['Windows', 'iOS', 'Android', 'macOS'],
    datasets: [{
      data: [1200, 450, 350, 150],
      backgroundColor: ['#3b82f6', '#a855f7', '#10b981', '#64748b'],
    }]
  }

  return (
    <Stack tokens={{ childrenGap: 20, padding: 20 }}>
      <Text variant="xLarge">Intune Device Management</Text>
      <Stack horizontal tokens={{ childrenGap: 20 }}>
        <DocumentCard styles={{ root: { width: 400 } }}>
          <DocumentCardTitle title="Device Enrollment by Platform" />
          <DocumentCardDetails>
            <Doughnut data={data} />
          </DocumentCardDetails>
        </DocumentCard>
        <DocumentCard styles={{ root: { width: 400 } }}>
          <DocumentCardTitle title="Compliance Status" />
          <DocumentCardDetails>
            <Stack>
              <Text>Compliant: 1978</Text>
              <Text>In Grace Period: 15</Text>
              <Text>Non-Compliant: 57</Text>
            </Stack>
          </DocumentCardDetails>
        </DocumentCard>
      </Stack>
    </Stack>
  )
}

export default Intune