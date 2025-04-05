export default function Home() {
    return (
        <div className="fixed w-full h-14 bg-blue-400 bottom-0 text-white justify-center items-center flex">
            <div className="px-4 mr-4 capitalize text-sm hover:bg-white hover:text-gray-900 cursor-pointer h-full self-center flex items-center">dashboard</div>
            <div className="px-4 ml-4 capitalize text-sm hover:bg-white hover:text-gray-900 cursor-pointer h-full self-center flex items-center">data history</div>
        </div>
    )
}