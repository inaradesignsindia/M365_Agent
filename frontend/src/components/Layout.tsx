import { Stack, Nav, Persona, PersonaSize, DefaultButton, Text } from '@fluentui/react'
import type { INavLink, INavLinkGroup } from '@fluentui/react'
import { useMsal } from '@azure/msal-react'
import { Outlet, useNavigate } from 'react-router-dom'

const Layout = () => {
  const { accounts, instance } = useMsal()
  const navigate = useNavigate()

  const navLinkGroups: INavLinkGroup[] = [
    {
      links: [
        {
          name: 'Dashboard',
          url: '/',
          key: 'dashboard',
          icon: 'Home',
        },
        {
          name: 'Reports',
          url: '/reports',
          key: 'reports',
          icon: 'ReportDocument',
        },
        {
          name: 'Settings',
          url: '/settings',
          key: 'settings',
          icon: 'Settings',
        },
      ],
    },
  ]

  const handleNavClick = (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
    if (item) {
      navigate(item.url)
    }
  }

  return (
    <Stack styles={{ root: { height: '100vh' } }}>
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center" styles={{ root: { padding: '10px 20px', borderBottom: '1px solid #e1e1e1' } }}>
        <Text variant="large">M365 Admin Center</Text>
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
          <Persona
            text={accounts[0]?.name || 'User'}
            size={PersonaSize.size32}
          />
          <DefaultButton
            text="Logout"
            onClick={() => instance.logoutPopup().catch(e => console.error(e))}
          />
        </Stack>
      </Stack>
      <Stack horizontal styles={{ root: { height: 'calc(100vh - 44px)' } }}>
        <Nav
          groups={navLinkGroups}
          onLinkClick={handleNavClick}
          styles={{ root: { width: 200, borderRight: '1px solid #e1e1e1' } }}
        />
        <Stack grow styles={{ root: { padding: 0, overflow: 'auto' } }}>
          <Outlet />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Layout