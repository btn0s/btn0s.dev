'use client';

import { NextUIProvider } from '@nextui-org/react';
import { Theme } from '@radix-ui/themes';
import type { FC, PropsWithChildren } from 'react';

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
