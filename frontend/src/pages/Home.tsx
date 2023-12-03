import Navbar from '../components/Navbar'

export default function Home() {
    return (
        <div className='bg-gradient-to-r bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500'>
            <Navbar />
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-6xl font-bold text-white">Xray.AI</h1>
                <p className="text-2xl text-white">A better way to read X-rays</p>
            </div>
        </div>
    )
}

