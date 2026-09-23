import React from 'react'
import LeftMenu from '../LeftMenu'
import styles from './BaseLayout.module.scss'

type BaseLayoutProps = Readonly<{
  children: React.ReactNode;
}>

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <main className={styles.container}>
      <LeftMenu />
      {children}
    </main>
  )
}

export default BaseLayout  