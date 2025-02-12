import React from 'react'

function Footer() {
  return (
    <footer className="p-3   md:px-6 md:py-8 relative mt-12 #111827 ">
    <div className="sm:flex sm:items-center sm:justify-between">
        <a href="#" className="flex items-center mb-4 sm:mb-0">
            
            <span className={`self-center text-2xl text-gray-200 font-black whitespace-nowrap `}>RCMOVIES</span>
        </a>
        <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-400 sm:mb-0">
            <li>
                <a href="#" className="mr-4 hover:underline md:mr-6 "></a>
            </li>
            <li>
                <a href="#" className="mr-4 hover:underline md:mr-6"></a>
            </li>
            <li>
                <a href="#" className="mr-4 hover:underline md:mr-6 "></a>
            </li>
            <li>
                <button  className="hover:underline"></button>
            </li>
        </ul>
    </div>
    <hr className="my-4 border-gray-400 sm:mx-auto dark:border-gray-700 lg:my-4"/>
    <div className="text-center">
    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="#" className="hover:underline">RCMOVIES</a>. All Rights Reserved.

    </span>
    <small className='text-gray-600 '>Made by Recon</small>
    </div>
</footer>
  )
}

export default Footer