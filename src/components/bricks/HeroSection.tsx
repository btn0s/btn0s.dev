import { FC, PropsWithChildren } from 'react';

const HeroSection: FC<PropsWithChildren> = ({ children }) => {
  return <section className={'py-12 mt-12'}>{children}</section>;
};

export default HeroSection;
