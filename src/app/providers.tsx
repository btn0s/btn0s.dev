'use client';

import type { FC, PropsWithChildren } from 'react';

import { NextUIProvider } from '@nextui-org/react';
import { Theme } from '@radix-ui/themes';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Theme
      accentColor="teal"
      panelBackground="solid"
      radius="large"
      scaling="95%"
    >
      <NextUIProvider>{children}</NextUIProvider>
    </Theme>
  );
};

export default Providers;
