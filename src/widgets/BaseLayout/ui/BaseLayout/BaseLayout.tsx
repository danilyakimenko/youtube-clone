import React from 'react'
import LeftMenu from '../LeftMenu'
import styles from './BaseLayout.module.scss'
import Header from '@/widgets/BaseLayout/ui/Header'
import { withUserInfo } from '@/shared/hoc/withUserInfo'

type BaseLayoutProps = Readonly<{
  children: React.ReactNode;
}> & {
  userId?: string
}

const BaseLayout = ({ userId, children }: BaseLayoutProps) => {
  return (
    <main className={`${styles.main} container`}>
      <Header userId={userId} />
      <LeftMenu />
      {children}
    </main>
  )
}

export default withUserInfo(BaseLayout)