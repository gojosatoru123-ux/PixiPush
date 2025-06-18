'use client';
import { upload } from '@vercel/blob/client';
import { useState, useRef } from 'react';
import { Upload } from "lucide-react";
import { Copy, Check } from 'lucide-react'; // Using lucide-react for icons
import UploadLoader from './loader/uploadLoader';
import UploadedCard from './uploadedCard';
import QrCodeGenerator from './qrcodeGenerator';
const Uploader = () => {
  const inputFileRef = useRef(null);
  const [blob, setBlob] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState(''); // To display the selected file name
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(blob.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset "Copied!" message after 2 seconds
    } catch (err) {
      console.error('Failed to copy text:', err);
      // Optionally, set an error state here to show a message to the user
      // For simplicity, we're just handling the success state visually
    }
  };

  const handleFileChange = (event) => {
    setError(null); // Clear errors when a new file is selected
    setBlob(null); // Clear previous blob
    setUploaded(false);
    if (event.target.files && event.target.files[0]) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName('');
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    setError(null); // Clear previous errors
    setBlob(null); // Clear previous blob
    setLoading(true); // Set loading to true

    try {
      if (!inputFileRef.current?.files || inputFileRef.current.files.length === 0) {
        throw new Error('No file selected. Please choose a file to upload.');
      }

      const file = inputFileRef.current.files[0];

      // Basic file type and size validation (optional but recommended)
      const allowedTypes = [ // Documents
        'application/pdf',
        'application/msword', // DOC
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
        'text/plain', // TXT
        
        // Images
        'image/jpeg',
        'image/png',
        'image/svg+xml', // SVG
        
        // Web Files
        'text/html',
        'text/css',
        'application/javascript', // JS
        
        // Archives
        'application/zip', // ZIP
        'application/x-rar-compressed', // RAR
        'application/x-7z-compressed' // 7Z
        ];
      const maxFileSize = 5 * 1024 * 1024; // 5 MB

      if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type.');
      }

      if (file.size > maxFileSize) {
        throw new Error('File size exceeds the limit (5 MB).');
      }

      const newBlob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/file/upload',
      });

      setBlob(newBlob);
      const now = new Date();
      const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
      localStorage.setItem('blobUrls',JSON.stringify([{url:newBlob.url,name:newBlob.pathname,validTill:oneHourLater},...JSON.parse(localStorage.getItem('blobUrls')|| '[]')]));
      setUploaded(true);
    } catch (err) {
      setError(err.message || 'An unknown error occurred during upload.');
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  }
  return (
    <>
      {/* Right Side - Upload Area */}
      <div className="relative">
        <form onSubmit={handleUpload}>
          <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-3xl p-8 lg:p-12 shadow-2xl">
            <div className="text-center space-y-8">
              <label htmlFor="file-upload" className='cursor-pointer'>
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto shadow-lg">
                  <Upload className="w-12 h-12 text-white" />
                </div>
              </label>
              <p className='break-all'>{fileName ? `Selected: ${fileName}` : 'Choose a file'}</p>
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-slate-900">Drop & Share</h3>
                <p className="text-slate-600 text-lg">Currently files up to 5MB • Lightning fast • Secure</p>
              </div>
              <input id="file-upload" name="file" ref={inputFileRef} type="file" required className='hidden' onChange={handleFileChange} />

              <button className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group" disabled={loading || !fileName || uploaded} type='submit'>
                {loading ? (
                  <>
                    <UploadLoader className="h-5 w-5 animate-spin" /> Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5" /> Upload File
                  </>
                )}</button>
              {error && (
                <div className="text-red-600 mt-4 font-semibold"> {/* text-red-600 for color, mt-4 for margin-top, font-semibold for bold */}
                  Error: {error}
                </div>
              )}
              {blob && (
                <div style={{ marginTop: '10px', border: '1px solid green', padding: '2px' }}>
                  <QrCodeGenerator url={blob.url} size={128} level="H" />

                  <div className="relative flex flex-col sm:flex-row items-stretch bg-gray-50/80 backdrop-blur-sm border border-gray-200/50 rounded-lg shadow-inner overflow-hidden transition-all duration-300 group-hover:shadow-md">
                  <input
                      type="text"
                      value={blob.url || ''} // Ensure value is a string, handle null/undefined
                      readOnly // Prevent user from typing in this display input
                      className="flex-grow px-4 py-2 text-sm text-slate-800 bg-transparent outline-none focus:ring-0"
                    />
                    <div
                      onClick={handleCopy}
                      className="flex-shrink-0 px-4 py-3 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 transition-all duration-300 hover:shadow-inner flex items-center justify-center gap-2 min-w-0 active:scale-95"
                      >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 text-green-600" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" /> Copy
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
export default Uploader;