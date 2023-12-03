


export default function GridMarketing() {
    return (
        <div className="h-screen">
                    <div className="grid grid-cols-2 grid-rows-3 md:grid-rows-4 md:grid-cols-4 gap-2 md:gap-4 h-screen">
                        <div className="bg-indigo-100 col-span-1 md:col-span-2">
                            <span>01</span>
                        </div>
                        <div className="bg-fuchsia-100 col-span-1 md:col-span-2 row-span-1 md:row-span-2">
                            <span>02</span>
                        </div>
                        <div className="bg-purple-100 col-span-1 md:col-span-2">
                            <span>03</span>
                        </div>
                        <div className="bg-violet-100">
                            <span>04</span>
                        </div>
                        <div className="bg-sky-100">
                            <span>05</span>
                        </div>
                        <div className="bg-emerald-100 col-span-1 md:col-span-2">
                            <span>06</span>
                        </div>
                    </div>
                </div>
    )
}