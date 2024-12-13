import React, { useState } from 'react'
import { Copy } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import toast, { Toaster } from 'react-hot-toast'
import { TailSpin } from 'react-loader-spinner';

function FileShareForm({ file, onPasswordSave }) {
    const [isPasswordEnable, setIsPasswordEnable] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState();
    const [loading, setLoading] = useState(false);
    const { user } = useUser();

    const sendEmail = async () => {
        setLoading(true);
        if (!email) {
            toast.error('Please provide a valid email address.');
            return;
            setLoading(false);
        }
        const data = {
            emailToSend: email,
            userName: user?.fullName,
            fileName: file.fileName,
            fileSize: file.fileSize,
            fileType: file.fileType,
            shortUrl: file.shortUrl,
            password: password.length > 3 ? password : ''
        };

        try {
            const response = await fetch('/api/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then((resp) => resp.json())
                .then((resp) => {
                    if (resp.success) {
                        toast.success('Email sent successfully!');
                    } else {
                        toast.error('Failed to send email.');
                    }

                })
                .catch((error) => {
                    console.error(error);
                    toast.error('Failed to send email.');
                }).finally(() => {
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
            toast.error('Failed to send email');
        }
    };


    const copyToClipboard = () => {
        if (file?.shortUrl) {
            navigator.clipboard.writeText(file.shortUrl);
            toast.success('Short URL copied to clipboard!');
        }
    };

    return (
        file && (
            <div className='flex flex-col gap-2'>
                <Toaster position="top-right" reverseOrder={false} />
                <div>
                    <label className='text-black'>Short URL</label>
                    <div className='flex gap-5 p-2 border rounded-md justify-between'>
                        <input type="text" value={file.shortUrl} disabled
                            className='disabled:text-gray-500 bg-transparent outline-none w-full' />
                        <Copy
                            className='text-gray-400 hover:text-gray-600 cursor-pointer'
                            onClick={copyToClipboard}
                        />
                    </div>
                </div>

                <div className='gap-3 flex mt-5'>
                    <input
                        type='checkbox'
                        checked={isPasswordEnable}
                        onChange={(e) => setIsPasswordEnable(e.target.checked)}
                    />
                    <label>Enable Password?</label>
                </div>

                {isPasswordEnable && (
                    <div className='flex gap-3 items-center'>
                        <div className='border rounded-md w-full p-2'>
                            <input
                                type='password'
                                className='disabled:text-gray-500 bg-transparent outline-none w-full'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            className='p-2 bg-primary text-white rounded-md disabled:bg-gray-300 hover:bg-blue-600'
                            disabled={password?.length < 3}
                            onClick={() => {
                                onPasswordSave(password)
                                toast.success('Password saved successfully!');
                            }}
                        >
                            Save
                        </button>
                    </div>
                )}

                <div className='flex flex-col gap-5 p-2 border rounded-md'>
                    <label className='text-black'>Send File to Email</label>
                    <div className='flex gap-5 p-2 border rounded-md justify-between'>
                        <input
                            type="text"
                            placeholder="example@gmail.com"
                            className="text-gray-500 bg-transparent outline-none w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button onClick={sendEmail}
                        disabled={loading}
                        className={`p-2 text-white rounded-md flex justify-center items-center w-full ${
                            loading ? 'bg-blue-500' : 'bg-primary hover:bg-blue-400'
                        }`}>
                        {loading ? (
                            <TailSpin
                                height="24"
                                width="24"
                                color="#ffffff"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                visible={true}
                            />
                        ) : (
                            'Send Email'
                        )}
                    </button>
                </div>
            </div>
        )
    );
}

export default FileShareForm;
