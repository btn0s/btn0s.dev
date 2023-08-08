import { FC, PropsWithChildren } from 'react'

const Main: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className={'max-w-[1080px] mx-auto flex flex-col gap-8 px-6 py-12'}>
      {children}
    </main>
  )
}

export default Main
