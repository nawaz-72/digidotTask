'use client'

import Image from 'next/image'
import React from 'react'
import { IoChevronDownOutline } from "react-icons/io5";
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const pathname = usePathname();

    // Convert pathname to a readable page name (only first segment like "Brands")
    const getPageName = (path: string) => {
      const firstSegment = path.split("/")[1]; // Get the first path segment
      if (!firstSegment) return "Dashboard";   // Fallback for "/"
      
      return firstSegment
        .replace(/-/g, ' ')                    // Replace hyphens with spaces
        .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize
    };
    
    const pageName = getPageName(pathname);

    return (
        <div className='w-full h-[70px] flex justify-between items-center bg-white text-black px-6 py-4 border-[#E6E6E6] border-b-1'>
            <h1 className='text-xl xl:text-2xl font-semibold font-poppins'>{pageName}</h1>
            <div className='flex justify-center items-center gap-2 mr-5'>
                <Image src="/images/frame.png" alt='profileImg' width={500} height={500} className='w-[30px] h-[30px] xl:w-[40px] xl:h-[40px] rounded-full' />
                <h2 className='text-sm xl:text-base font-normal font-poppins'>Username</h2>
                <IoChevronDownOutline />
            </div>
        </div>
    )
}

export default Navbar;
