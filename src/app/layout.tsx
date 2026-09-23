import type { Metadata } from "next"
import './styles/index'
import BaseLayout from '@/widgets/BaseLayout'
import React from 'react'


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
    <BaseLayout>
      {children}
    </BaseLayout>
    </body>
    </html>
  );
}

export default RootLayout