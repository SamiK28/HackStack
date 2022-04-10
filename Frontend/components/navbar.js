import React from 'react'
import Link from 'next/link'

export default function Header() {

    return (
        <section className={`flex items-end space-x-7 h-16 padding-8`}>
            <div className="grid grid-cols-4">
                <div className="hidden md:flex items-center mr-8 font-semibold">
                    <div className="navtab">
                        <Link href="/">
                            Trip Buddy
                        </Link>
                    </div>
                    
                </div>
                
                {/* <div className="flex items-center justify-end col-start-12">
                    <button className="bg-[#EA4C89] py-2 px-4 mt-2 text-white font-semibold rounded-lg hover:bg-[#F082AC]">Sign Up / Log In</button>
                </div> */}
            </div>
        </section>
    )
}