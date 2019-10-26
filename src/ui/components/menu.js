import React, { useState } from 'react'
import {
  Icon,
  Menu,
  MenuLabel,
  MenuList,
  MenuListItem,
  NavigationView,
} from '@brightleaf/elements'
import classnames from 'classnames'

export const NavMenu = () => {
  const [toggle, setToggle] = useState(false)

  return (
    <NavigationView>
      <Menu>
        <MenuLabel>General</MenuLabel>
        <MenuList className="menu-list">
          <MenuListItem>
            <a>
              <Icon fas icon="box" /> Dashboard
            </a>
          </MenuListItem>
          <MenuListItem>
            <a>
              <Icon fas icon="address-card" /> Customers
            </a>
          </MenuListItem>
        </MenuList>
        <MenuLabel>Administration</MenuLabel>
        <MenuList>
          <MenuListItem>
            <a>
              <Icon fas icon="cog" />
              Team Settings
            </a>
          </MenuListItem>
          <MenuListItem>
            <a className="is-active">
              <Icon fas icon="child" />
              Manage Your Team
            </a>
          </MenuListItem>
          <MenuListItem>
            <a>
              <Icon fas icon="at" /> Invitations
            </a>
          </MenuListItem>
          <MenuListItem>
            <a>
              <Icon fas icon="cloud" /> Cloud Storage Settings
            </a>
          </MenuListItem>
          <MenuListItem>
            <a>
              <Icon fas icon="user" /> Authentication
            </a>
          </MenuListItem>
        </MenuList>
        <MenuLabel>Transactions</MenuLabel>
        <MenuList>
          <MenuListItem>
            <a>
              <Icon fas icon="credit-card" /> Payments
            </a>
          </MenuListItem>
          <MenuListItem>
            <a>
              <Icon fas icon="align-center" /> Transfers
            </a>
          </MenuListItem>
          <MenuListItem>
            <a>
              <Icon fas icon="briefcase" /> Balance
            </a>
          </MenuListItem>
        </MenuList>
      </Menu>
    </NavigationView>
  )
}

export default NavMenu
