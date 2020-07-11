import React from 'react'
import { MenuListItem, Icon } from '@brightleaf/elements'
import { useIdentityContext } from 'react-netlify-identity'

export const LoginLink = ({ children, className, isStatic }) => {
  const { isLoggedIn } = useIdentityContext()
  if (!isLoggedIn) {
    return null
  }
  return (
    <MenuListItem>
      <a href="/admin">
        <Icon fas name="tools" /> Admin{' '}
      </a>
    </MenuListItem>
  )
}

export default LoginLink
