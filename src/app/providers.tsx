'use client'

import { NextUIProvider } from '@nextui-org/react'
import type { FC, PropsWithChildren } from 'react'

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>
}

export default Providers
