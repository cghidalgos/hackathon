/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useCallback, useRef, useState, useEffect } from 'react';
import { UploadCloud, Camera, X } from 'lucide-react';

interface ImageUploaderProps {
  onImageReady: (file: File) => void;
  isLoading: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageReady, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      onImageReady(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setShowCamera(true);
    } catch (err) {
      console.error("Error accessing camera: ", err);
      alert("Could not access the camera. Please ensure you have given permission.");
    }
  };

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  }, []);

  const takePicture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);
        canvasRef.current.toBlob(blob => {
          if (blob) {
            const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
            onImageReady(file);
            stopCamera();
          }
        }, 'image/jpeg');
      }
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <div className="w-full max-w-2xl mx-auto text-center p-8">
      <h2 className="text-2xl font-bold text-white mb-4">Intelligent Capture</h2>
      <p className="text-gray-400 mb-8">Upload a scanned document or take a picture to extract its text content.</p>
      
      {showCamera ? (
         <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden border-2 border-dashed border-gray-600">
           <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>
           <canvas ref={canvasRef} className="hidden"></canvas>
           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
              <button onClick={takePicture} className="p-4 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white" aria-label="Take picture"></button>
              <button onClick={stopCamera} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors" aria-label="Close camera">
                <X size={24}/>
              </button>
           </div>
         </div>
      ) : (
        <form className="relative w-full h-64 border-2 border-dashed border-gray-600 rounded-lg flex flex-col justify-center items-center transition-colors duration-300 bg-gray-900/50 hover:border-blue-500 hover:bg-gray-900" 
          onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
          onSubmit={(e) => e.preventDefault()}
        >
          <input type="file" id="file-upload" className="hidden" accept="image/*" onChange={handleChange} disabled={isLoading} />
          <label htmlFor="file-upload" className={`w-full h-full flex flex-col justify-center items-center cursor-pointer ${dragActive ? 'bg-blue-500/10' : ''}`}>
            <UploadCloud className="w-12 h-12 text-gray-500 mb-4" />
            <p className="text-gray-400">
              <span className="font-semibold text-blue-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
          </label>
        </form>
      )}

      {!showCamera && (
        <>
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="flex-shrink mx-4 text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>
          <button 
            onClick={startCamera} 
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            <Camera size={20} />
            Take a Photo
          </button>
        </>
      )}
    </div>
  );
};

export default ImageUploader;
