import { FillAndCenterChildren } from './ui/fill-and-center-children.tsx'

function App() {
  return (
    <main className="h-dvh w-dvw">
      <FillAndCenterChildren className="bg-yellow-500">
        <h1 className="text-8xl">Loading</h1>
      </FillAndCenterChildren>
    </main>

  )
}

export default App
