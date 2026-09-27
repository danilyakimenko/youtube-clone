import React from 'react'
import BaseLayout from '@/widgets/BaseLayout'
import { AuthUserDto } from '@/shared/types/typesFromBackend'
import { withUserInfo } from '@/shared/hoc/withUserInfo'

function PublicLayout({
  children,
  user,
}: {
  children: React.ReactNode
  user?: AuthUserDto
}) {
  return (
    <BaseLayout userId={user?.id}>
      {children}
    </BaseLayout>)

}

export default withUserInfo(PublicLayout)