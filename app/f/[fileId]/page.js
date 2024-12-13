"use client"
import React,{useEffect,useState} from 'react'
import {app} from '/firebaseConfig'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import FileItem from './_components/FileItem'
import Link from 'next/link'
import Image from 'next/image'

function FileView({params}) {
  const db = getFirestore(app);
  const [file,setFile]=useState();
  useEffect(()=>{
    params.fileId&& getFileInfo();
  }) 

  const getFileInfo = async() =>{
    const docRef = doc(db,"uploadFile",params?.fileId);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      setFile(docSnap.data())
    }else
      console.log("No such document");
  }

  return (
    <div className='bg-gray-100 h-screen w-full flex justify-center items-center flex-col gap-4'>
      <Link href={process.env.NEXT_PUBLIC_BASE_URL}><Image src='/logo.png' width={150} height={150}/></Link>
      <FileItem file={file}/>
    </div>
  )
}

export default FileView