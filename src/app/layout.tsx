import type { Metadata } from "next"
import './styles'
import BaseLayout from '@/widgets/BaseLayout'
import React from 'react'
import Header from '@/widgets/BaseLayout/ui/Header'

export const metadata: Metadata = {
  title: "YouTube Clone",
  description: "YouTube Clone pet project",
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
    <body>
    <Header profileId="123" />
    <BaseLayout>
      {children}
    </BaseLayout>
    </body>
    </html>
  );
}

export default RootLayout