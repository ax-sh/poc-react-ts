import type { PropsWithChildren } from 'react'
import clsx from 'clsx'

export function FillAndCenterChildren(
  { children, className }: PropsWithChildren<{ className?: string }>,
) {
  return (
    <section
      className={clsx('h-full w-full grid place-content-center', className)}
    >
      {children}
    </section>
  )
}
export function FillAndCenterLoading() {
  return (
    <FillAndCenterChildren className="bg-yellow-500">
      <h1 className="text-8xl">Loading</h1>
    </FillAndCenterChildren>
  )
}
export function FillAndCenterError() {
  return (
    <FillAndCenterChildren className="bg-red-500">
      <h1 className="text-8xl">Error</h1>
    </FillAndCenterChildren>
  )
}
