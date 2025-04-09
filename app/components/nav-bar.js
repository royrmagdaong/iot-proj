import {useRouter} from 'next/navigation'

export default function Home() {
    const router = useRouter()
    return (
        <div className="fixed left-0 right-0 h-14 bg-blue-400 bottom-0 text-white justify-center items-center flex">
            <div className="px-4 mr-4 capitalize text-sm hover:bg-white hover:text-gray-900 cursor-pointer h-full self-center flex items-center" onClick={e=>router.push('/')}>dashboard</div>
            <div className="px-4 ml-4 capitalize text-sm hover:bg-white hover:text-gray-900 cursor-pointer h-full self-center flex items-center" onClick={e=>router.push('/data-history')}>data history</div>
        </div>
    )
}