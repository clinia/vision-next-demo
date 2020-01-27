import * as React from 'react'

import Header from './header'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <Header />
      <div className="content">{children}</div>
    </div>
  )
}

export default Layout
