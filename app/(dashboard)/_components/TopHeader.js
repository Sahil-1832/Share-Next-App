import React from 'react'
import { AlignJustify } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
const TopHeader=({ toggleSideNav })=> {
  return (
    <div className='flex p-5 border-b items-center justify-between md:justify-end'>
      <AlignJustify className='md:hidden' onClick={toggleSideNav}/>
      <Image className='md:hidden' onClick={toggleSideNav} src='/SN LOGO.svg' width={160} height={100}/>
      <UserButton/>
    </div>
  )
}

export default TopHeader