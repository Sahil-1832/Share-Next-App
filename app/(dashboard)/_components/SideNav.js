"use client"
import { File, Shield, Upload,X} from 'lucide-react'
import Image from 'next/image'
import React,{useState,useEffect} from 'react'
import { useRouter, usePathname } from 'next/navigation'

const SideNav=({closeSideNav,plan})=> {
    const menuList=[
        {
            id:1,
            name:'Upload',
            icon:Upload,
            path:'/upload'
        },
        {
            id:2,
            name:'Files',
            icon:File,
            path:'/files'
        },
        {
            id:3,
            name:'Upgrade',
            icon:Shield,
            path:'/upgrade'
        },
    ]

    const[activeIndex,setActiveIndex]=useState(0);
    const router=useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const currentIndex = menuList.findIndex(item => item.path === pathname);
        setActiveIndex(currentIndex);
    }, [pathname]);

    const handleNavigation = (index,path) => {
        router.push(path);
        if (window.innerWidth <= 768 && closeSideNav) {
            closeSideNav();
        }
    }

  return (
    <div className='shadow-sm border-r h-full'>
        <div className='p-5 border-b flex justify-between items-center'>
            <Image src='/SN LOGO.svg' width={160} height={100}/>
            {
                closeSideNav && (
                <button onClick={closeSideNav} className='md:hidden p-2'>
                    <X className="h-6 w-6 text-gray-500" />
                </button>
            )}
        </div>
        {plan==="pro" && (
            <Image className='mx-14 pt-2 pb-3 border-b flex justify-between items-center' src='/PRO.svg' width={80} height={80}/>
        )}
        {plan==="premium" && (
            <Image className='mx-3 pb-2 border-b flex justify-between items-center' src='/PREMIUM.svg' width={150} height={100}/>
        )}
        <div className='flex flex-col float-left w-full'>
            {menuList.map((item,index)=>(
                <button className={`flex gap-2 p-4 px-6 hover:bg-gray-100 w-full text-gray-500 ${activeIndex==index ? 'bg-blue-50 text-primary':null}`}
                onClick={()=>handleNavigation(index,item.path)}>
                    <item.icon/>
                    <h2>{item.name}</h2>
                </button>
            ))}
        </div>
    </div>
  )
}

export default SideNav