"use client";
import React, { useContext, useState, useEffect } from "react";
import { deleteDoc, doc, getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "/firebaseConfig";
import { useUser } from "@clerk/nextjs";
import { PlanContext } from "../../layout";

const Files = () => {
  const { user } = useUser();
  const db = getFirestore(app);
  const plan = useContext(PlanContext);

  const [userFiles, setUserFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const filesByPlan = async(plan,filesArray,db) =>{
    
    const dateDifference = (fileDate) =>{
      const dateFile = new Date(fileDate);
      const currDate = new Date();
      const diff = currDate - dateFile;
      return diff/(1000*60*60*24);
    };

    const planSettings = {
      base:{maxDays:30,maxFiles:10},
      pro:{maxDays:45,maxFiles:15},
      premium:{maxDays:60,maxFiles:Infinity},
    };

    const {maxDays,maxFiles} = planSettings[plan];
    const filteredFiles = [];
    for(const file of filesArray){
      const dateDiff = dateDifference(file.date);
      if(dateDiff<=maxDays)
        filteredFiles.push(file);
      else{
        const fileRef = doc(db,"uploadFile",file.id);
        await deleteDoc(fileRef);
      }
    }

    const limitedFiles = filteredFiles.slice(0,maxFiles);
    for(let i=maxFiles;i<filteredFiles.length;i++){
      const fileRef = doc(db,"uploadFile",filteredFiles[i].id);
      await deleteDoc(fileRef);
    }

    return limitedFiles;
  }

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const currentUserName = user?.fullName

        const collectionRef = collection(db, "uploadFile");

        const filesQuery = query(collectionRef, where("userName", "==", currentUserName));

        const querySnapshot = await getDocs(filesQuery);

        const filesArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })).sort((a, b) => new Date(b.date) - new Date(a.date));

        console.log("length",filesArray.length);
        const processedFiles = await filesByPlan(plan,filesArray,db);
        setUserFiles(processedFiles);
        console.log("User plan : ",plan);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching files:", error);
        setLoading(false);
      }
    };
    fetchFiles();
  }, [user]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg font-semibold">Loading files...</p>
      </div>);
  }

  return (
    <div className="w-full m-4 lg:-ml-6 sm:ml-2">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">My Files</h2>

      <div className="mb-4">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder={`Total Files: ${userFiles.length}`}
          readOnly
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white mb-6">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-xs md:text-sm leading-normal">
              <th className="py-3 px-2 md:px-6 text-left">File Name</th>
              <th className="py-3 px-2 md:px-6 text-left">Type</th>
              <th className="py-3 px-2 md:px-6 text-left">Size (MB)</th>
              <th className="py-3 px-2 md:px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-xs md:text-sm">
            {userFiles.map((file) => (
              <tr key={file.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-2 md:px-6 text-left break-all">{file.fileName}</td>
                <td className="py-3 px-2 md:px-6 text-left">{file.fileType}</td>
                <td className="py-3 px-2 md:px-6 text-left">{(file.fileSize / (1024 * 1024)).toFixed(2)} MB</td>
                <td className="py-3 px-2 md:px-6 text-left">
                  <a
                    href={process.env.NEXT_PUBLIC_BASE_URL + '/file-preview/' + file.id}
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Files;
