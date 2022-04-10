import { useState } from "react";
import { useRouter } from 'next/router'
import { SearchIcon } from "@heroicons/react/outline";

export default function Search() {
    const [resultName, setResultName] = useState("");
    const router = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const name = event.target.search.value;
        const res = await fetch('/api/search', {
            body: JSON.stringify({
                name: name,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });
        const result = await res.json();
        // setResultName(result.name);
        router.push({ pathname: '/result/[rid]', query: { rid: resultName } });
    }
    return (
        <div className="grid md:grid-cols-6">
            <div className="col-span-3 col-start-3">
                <form method="get" action={"/result?" + resultName} onSubmit={handleSubmit}>
                    <div className="relative -mt-9 drop-shadow-lg">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <div className="p-1 focus:outline-none focus:shadow-outline">
                                <svg fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-6 text-slate-400 px-2">
                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
                                    </path>
                                </svg>
                            </div>
                        </span>
                        <input type="text" placeholder="Search here ..." 
                        className="mt-1 block pl-16 py-2 bg-white border border-slate-300 rounded-md text-lg placeholder-slate-400 focus:outline-none h-16 w-5/6 md:pr-36"
                            name="search" onChange={(e) => { setResultName(e.target.value) }} required />
                        <span className="absolute inset-y-0 flex items-center px-1 right-16 md:pl-8 border-l-2 border-gray-200 md:right-40 cursor-pointer">
                            <button type="submit" className="py-1 px-3 focus:outline-none focus:shadow-outline font-semibold md:p-1">
                                Submit
                            </button>
                        </span>
                    </div>
                </form>
            </div>
        </div>

    )
}