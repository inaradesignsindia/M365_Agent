import React, { useState } from 'react'
import { Stack, Nav, Persona, PersonaSize, IconButton, SearchBox, ContextualMenu, Text, Breadcrumb, DefaultButton } from '@fluentui/react'
import type { INavLink, INavLinkGroup, IContextualMenuItem, IBreadcrumbItem } from '@fluentui/react'
import { useMsal } from '@azure/msal-react'
import { useNavigate, useLocation } from 'react-router-dom'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { accounts, instance } = useMsal()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [userMenuVisible, setUserMenuVisible] = useState(false)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  const navLinkGroups: INavLinkGroup[] = [
    {
      name: 'Home',
      links: [
        {
          name: 'Dashboard',
          url: '/',
          key: 'dashboard',
          icon: 'Home',
        },
      ],
    },
    {
      name: 'Management',
      links: [
        {
          name: 'Users',
          url: '/users',
          key: 'users',
          icon: 'People',
        },
        {
          name: 'Groups',
          url: '/groups',
          key: 'groups',
          icon: 'Group',
        },
        {
          name: 'Teams',
          url: '/teams',
          key: 'teams',
          icon: 'TeamsLogo',
        },
        {
          name: 'Intune',
          url: '/intune',
          key: 'intune',
          icon: 'CellPhone',
        },
        {
          name: 'Defender',
          url: '/defender',
          key: 'defender',
          icon: 'Shield',
        },
      ],
    },
    {
      name: 'Reports & Settings',
      links: [
        {
          name: 'Reports',
          url: '/reports',
          key: 'reports',
          icon: 'ReportDocument',
        },
        {
          name: 'Service Health',
          url: '/service-health',
          key: 'service-health',
          icon: 'Health',
        },
        {
          name: 'Message Center',
          url: '/message-center',
          key: 'message-center',
          icon: 'Message',
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

  const handleNavClick = (_ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
    if (item) {
      navigate(item.url)
    }
  }

  const getBreadcrumbs = (): IBreadcrumbItem[] => {
    const path = location.pathname
    const items: IBreadcrumbItem[] = [{ text: 'Home', key: 'home', onClick: () => navigate('/') }]
    if (path === '/reports') items.push({ text: 'Reports', key: 'reports' })
    if (path === '/settings') items.push({ text: 'Settings', key: 'settings' })
    if (path === '/users') items.push({ text: 'Users', key: 'users' })
    if (path === '/groups') items.push({ text: 'Groups', key: 'groups' })
    if (path === '/teams') items.push({ text: 'Teams', key: 'teams' })
    if (path === '/intune') items.push({ text: 'Intune', key: 'intune' })
    if (path === '/defender') items.push({ text: 'Defender', key: 'defender' })
    if (path === '/service-health') items.push({ text: 'Service Health', key: 'service-health' })
    if (path === '/message-center') items.push({ text: 'Message Center', key: 'message-center' })
    return items
  }

  const userMenuItems: IContextualMenuItem[] = [
    {
      key: 'profile',
      text: 'Profile',
      iconProps: { iconName: 'Contact' },
      onClick: () => console.log('Profile clicked'),
    },
    {
      key: 'settings',
      text: 'Settings',
      iconProps: { iconName: 'Settings' },
      onClick: () => navigate('/settings'),
    },
    {
      key: 'divider',
      itemType: 1, // divider
    },
    {
      key: 'logout',
      text: 'Sign out',
      iconProps: { iconName: 'SignOut' },
      onClick: () => instance.logoutPopup().catch(e => console.error(e)),
    },
  ]

  return (
    <Stack styles={{ root: { height: '100vh', backgroundColor: '#f3f2f1' } }}>
      {/* Top Bar */}
      <Stack
        horizontal
        horizontalAlign="space-between"
        verticalAlign="center"
        styles={{
          root: {
            padding: '8px 16px',
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #edebe9',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          },
        }}
      >
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 16 }}>
          <IconButton
            iconProps={{ iconName: 'GlobalNavButton' }}
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            styles={{ root: { color: '#323130' } }}
          />
          <Text variant="large" styles={{ root: { fontWeight: 600, color: '#323130' } }}>
            Microsoft 365 Admin Center
          </Text>
        </Stack>
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
          <SearchBox placeholder="Search" styles={{ root: { width: 300 } }} />
          <IconButton
            iconProps={{ iconName: theme === 'light' ? 'Sunny' : 'ClearNight' }}
            onClick={() => {
              const newTheme = theme === 'light' ? 'dark' : 'light'
              setTheme(newTheme)
              localStorage.setItem('theme', newTheme)
              document.documentElement.classList.toggle('dark', newTheme === 'dark')
            }}
            styles={{ root: { color: '#323130' } }}
          />
          <IconButton iconProps={{ iconName: 'Help' }} styles={{ root: { color: '#323130' } }} />
          <IconButton iconProps={{ iconName: 'Ringer' }} styles={{ root: { color: '#323130' } }} />
          <div>
            <Persona
              text={accounts[0]?.name || 'User'}
              size={PersonaSize.size32}
              onClick={() => setUserMenuVisible(!userMenuVisible)}
              styles={{ root: { cursor: 'pointer' } }}
            />
            {userMenuVisible && (
              <ContextualMenu
                items={userMenuItems}
                target={document.querySelector('.ms-Persona')}
                onDismiss={() => setUserMenuVisible(false)}
              />
            )}
          </div>
        </Stack>
      </Stack>

      {/* Main Content */}
      <Stack horizontal styles={{ root: { height: 'calc(100vh - 60px)' } }}>
        {/* Sidebar */}
        <Stack
          styles={{
            root: {
              width: sidebarCollapsed ? 48 : 240,
              backgroundColor: '#ffffff',
              borderRight: '1px solid #edebe9',
              transition: 'width 0.3s',
              overflow: 'hidden',
            },
          }}
        >
          <Nav
            groups={navLinkGroups}
            onLinkClick={handleNavClick}
            styles={{
              root: { width: sidebarCollapsed ? 48 : 240 },
              groupContent: { marginBottom: 0 },
              link: { padding: '8px 16px' },
            }}
            selectedKey={location.pathname === '/' ? 'dashboard' : location.pathname.slice(1)}
          />
        </Stack>

        {/* Content Area */}
        <Stack grow styles={{ root: { backgroundColor: '#f3f2f1' } }}>
          <Stack styles={{ root: { padding: '16px 24px' } }}>
            <Breadcrumb items={getBreadcrumbs()} />
          </Stack>
          <Stack grow styles={{ root: { padding: '0 24px 24px', overflow: 'auto' } }}>
            {children}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Layout