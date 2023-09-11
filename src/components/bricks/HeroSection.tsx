import { FC, PropsWithChildren } from 'react';

const HeroSection: FC<PropsWithChildren> = ({ children }) => {
  return <section className={'mt-12 py-12'}>{children}</section>;
};

export default HeroSection;
