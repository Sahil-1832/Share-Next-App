"use client"
import React, { useState, useRef } from 'react'
import AlertMessage from './AlertMessage'
import FilePreview from './FilePreview'
import ProgressBar from './ProgressBar'

function UploadForm({ uploadBtnClick, progress, plan }) {
  const [file, setFile] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const size = (plan==="base") ? 5 : (plan==="pro")  ? 15 : 20;
  const fileInputRef = useRef(null);

  const onFileSelect = (file) => {
    if (file && file.size > size*1000000) {
      setErrorMsg(`Maximum File Upload size is ${size}MB`)
      return
    }
    setErrorMsg(null)
    setFile(file)
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const droppedFile = event.dataTransfer.files[0];
      onFileSelect(droppedFile); 
      event.dataTransfer.clearData();
      if (event.dataTransfer.items) {
        event.dataTransfer.items.clear();
      }
    }
  };


  return (
    <div className='text-center'>
      <div className="flex items-center justify-center w-full" onDragOver={handleDragOver} onDrop={handleDrop}>
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-12 h-12 mb-4 text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-lg md:text-2xl text-gray-500"><span className="font-semibold">Click to upload</span> or 
            <strong className='text-primary'> drag</strong> and <strong className='text-primary'>drop</strong></p>
            <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX {size}MB)</p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" 
            onChange={(event) => onFileSelect(event.target.files[0])} />
        </label>
      </div> 

      {errorMsg ? <AlertMessage msg={errorMsg} /> : null}

      {file ? <FilePreview file={file} removeFile={()=>{setFile(null)}} /> : null}

      {progress > 0 ? <ProgressBar progress={progress} /> :
        <button
          disabled={!file}
          className='p-2 bg-primary text-white w-[30%] rounded-full mt-5 disabled:bg-gray-400'
          onClick={() => uploadBtnClick(file)}
        >
          Upload
        </button>
      }
    </div>
  )
}

export default UploadForm
