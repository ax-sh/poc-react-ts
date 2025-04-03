import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

function useDemoData() {
    async function queryFn() {
        const x = await axios.get<{ health: string }>('/health')
        return x.data
    }
    return useQuery({ queryKey: ['data'], queryFn })
}


export default function Demo(){
    const { data, isLoading, isError } = useDemoData()
    if(isLoading) return <h1>Loading</h1>
    if(isError) return <h1>Error</h1>

    return <section className="demo bg-red-500">
        <h1>Demo</h1>
        <pre>{JSON.stringify(data, null,2)}</pre>
    </section>
}