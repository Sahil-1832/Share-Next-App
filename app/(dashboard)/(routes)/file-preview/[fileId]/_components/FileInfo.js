import React, { useState, useEffect } from 'react'
import Image from 'next/image'

function FileInfo({ file }) {
    const [fileType, setFileType] = useState(null);
    useEffect(() => {
        if (file && file.fileType) {
            setFileType(file.fileType.split('/')[0])
        }
        console.log(fileType)
    }, [file])
    return (
        file &&
        (<div className='text-center border flex justify-center m-4 flex-col items-center
        p-2 rounded:md border-blue-200'>
            <Image src={fileType == 'image' ? file?.fileURL : 'https://www.pngplay.com/wp-content/uploads/6/Files-Icon-PNG-HD-Quality.png'}
                width={200} height={200} className='h-[200]px rounded-md object-contain' />
            <div className=''>
                <h2>{file?.fileName}</h2>
                <h2 className='text-gray-400 text-[13px]'>File Type : {file?.fileType}</h2>
            </div>
        </div>)
    )
}

export default FileInfo