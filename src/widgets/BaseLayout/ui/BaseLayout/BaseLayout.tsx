import React from 'react'
import Header from '../Header'
import LeftMenu from '../LeftMenu'
import styles from './BaseLayout.module.css'

type BaseLayoutProps = Readonly<{
  children: React.ReactNode;
}>

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className={styles.container}>
      <Header profileId="123" />
      <LeftMenu />
      {children}
    </div>
  )
}

export default BaseLayout  