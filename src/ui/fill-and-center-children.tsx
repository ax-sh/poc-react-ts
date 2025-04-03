import type { PropsWithChildren } from 'react'
import clsx from 'clsx'

export function FillAndCenterChildren({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <section className={clsx('h-full w-full grid place-content-center', className)}>
      {children}
    </section>
  )
}
