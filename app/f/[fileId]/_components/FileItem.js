import React, { useState } from 'react'
import { FileText, Download } from 'lucide-react'

function FileItem({file}) {
    const [password, setPassword] = useState('');
    return (
        <div>
        <div className="p-5 rounded-md bg-white flex flex-col items-center">
            <div className='text-center flex-col gap-3 items-center flex'>
            <h2 className="text-[20px] text-gray-600">
                <strong className='text-primary'>{file?.userName} </strong>
                Shared the file with You
            </h2>
            <h2 className='text-[10px] text-gray-400'>Find File details below</h2>
            
            <div className="p-4 bg-blue-100 rounded-full">
                <FileText size={64} className="text-blue-600" />
            </div>

            <div className="mt-4">
                <p className="flex flex-col justify-center items-center text-gray-500 text-[15px]">
                    <span>{file?.fileName}</span>
                    <span>⚡</span>
                    <span>{file?.fileType}</span>
                    <span>⚡</span>
                    <span>{file?.fileSize} Bytes</span>
                </p>
            </div>
            </div>
            {file?.password.length>3 ?<input
                type="password"
                placeholder="Enter password to access"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 border rounded-md text-[14px] mt-5 text-center outline-blue-400"
            />:null}

            <button
                onClick={() => window.open(file?.fileURL)}
                className='flex gap-2 p-2 bg-primary text-white rounded-full w-full items-center
                    hover:bg-blue-600 text-[14px] mt-5 text-center justify-center disabled:bg-gray-300' disabled={file?.password!==password}>
                <Download className='h-4 w-4' />Download
            </button>

            <p className="text-gray-400 text-xs mt-2">*Terms and Conditions apply</p>
        </div>
        </div>
    )
}

export default FileItem