import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {
  FillAndCenterChildren,
  FillAndCenterError,
  FillAndCenterLoading,
} from '../fill-and-center-children.tsx'

function useDemoData() {
  async function queryFn() {
    const x = await axios.get<{ health: string }>('/api/cards')
    return x.data
  }
  return useQuery({ queryKey: ['data'], queryFn })
}

export default function Demo() {
  const { data, isLoading, isError } = useDemoData()
  if (isLoading) {
    return <FillAndCenterLoading />
  }
  if (isError) {
    return <FillAndCenterError />
  }

  return (
    <FillAndCenterChildren className="bg-green-500">
      <h1>Demo</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </FillAndCenterChildren>
  )
}
