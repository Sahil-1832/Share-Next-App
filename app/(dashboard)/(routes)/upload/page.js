"use client"
import React,{ useContext,useState,useEffect} from 'react'
import UploadForm from './_components/UploadForm'
import {app} from '/firebaseConfig'
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from '@firebase/storage'
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useUser } from '@clerk/nextjs'
import {generateRandomString} from '../../../_utils/GenerateRandomString'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import  PlanContext from "../../_components/PlanContext";
function Upload() {
  const {user} = useUser();
  const [progress,setProgress]=useState();
  const router = useRouter();
  const [fileId,setFileId] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const plan = useContext(PlanContext);
  const storage=getStorage(app);
  const db = getFirestore(app);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const uploadFile=(file)=>{
    const storageRef =  ref(storage,'file-upload/'+file?.name);
    const uploadTask = uploadBytesResumable(storageRef,file,file.type);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      setProgress(progress);
      progress==100&&getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        console.log('File available at',downloadURL);
        saveInfo(file,downloadURL);
      });
    },)
  }

  const saveInfo=async(file,downloadURL)=>{
    const docId = generateRandomString();
    const date = new Date();
    const today = formatDate(date);
    setFileId(docId);
    await setDoc(doc(db, "uploadFile", docId), {
      fileName:file?.name,
      fileSize:file?.size,
      fileType:file?.type,
      fileURL:downloadURL,
      userEmail:user.primaryEmailAddress.emailAddress,
      userName:user.fullName,
      date:today,
      password:'',
      id:docId,
      shortUrl:process.env.NEXT_PUBLIC_BASE_URL+'f/'+docId,
    });
  }

  const closePopup = () => {
    setShowPopup(false)
    router.push('/file-preview/'+fileId)
  }

  useEffect(()=>{
    console.log("user plan : ",plan);
  },[plan]);

  useEffect(() => {
    if (progress === 100) {
      setShowPopup(true)
    }
  }, [progress])

  return (
    <div className='p-5 px-8 md:px-28'>
      <h2 className='text-[20px] text-center m-5'>
        Start <strong className='text-primary'> Uploading </strong> 
        File and <strong className='text-primary'> Share</strong> it
      </h2>
      <UploadForm uploadBtnClick={(file)=>uploadFile(file)} progress={progress} plan={plan} />

      {showPopup && (
        <section className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900">
          <div className="relative rounded-3xl shadow-2xl bg-white p-8 text-center sm:p-12 mx-auto max-w-md transform transition-all duration-300 scale-105">
            <button
              className="absolute top-2 right-2 text-black hover:text-gray"
              onClick={closePopup}
            >
              <X className="w-6 h-6" />
            </button>

            <div>
              <svg className="w-16 h-16 mx-auto mb-4 text-green-500" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2l4-4m0 6a9 9 0 11-18 0a9 9 0 0118 0z" />
              </svg>
              <h2 className="text-3xl text-primary font-bold">Upload Complete!</h2>
              <p className="mt-2 ">Your file was uploaded successfully.</p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Upload