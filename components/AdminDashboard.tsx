/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useCallback } from 'react';
import { extractTextFromImage } from '../services/geminiService';
import { saveDocument } from '../services/apiService';
import ImageUploader from './ChatInterface';
import ResultsDisplay from './KnowledgeBaseManager';
import PatientSearch from './PatientSearch';
import { LogOut, UploadCloud, Search, ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

type SaveStatus = 'idle' | 'saving' | 'success' | 'error';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeView, setActiveView] = useState<'menu' | 'capture' | 'search'>('menu');
  
  // State for Document Intelligence module
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');


  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (err) => reject(err);
    });
  };
  
  const handleImageReady = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    setSaveStatus('idle');
    setImageFile(file);
    
    const dataUrl = URL.createObjectURL(file);
    setImageDataUrl(dataUrl);

    try {
      // 1. Extract text via Gemini
      const base64Data = await fileToBase64(file);
      const resultText = await extractTextFromImage({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
      setExtractedText(resultText);
      
      // 2. Save extracted text to the database
      if (resultText) {
        setSaveStatus('saving');
        try {
          await saveDocument({ content: resultText, sourceFile: file.name });
          setSaveStatus('success');
        } catch (saveError: any) {
          setSaveStatus('error');
          // Optionally append this error to the main error state
          setError(prev => prev ? `${prev}\nCould not save document: ${saveError.message}` : `Could not save document: ${saveError.message}`);
        }
      }

    } catch (e: any) {
      const errorMessage = e.message || 'An unknown error occurred.';
      setError(errorMessage);
      setExtractedText(`Error: ${errorMessage}`);
      setSaveStatus('idle');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDownloadCsv = useCallback(() => {
    if (!extractedText) return;
    const sanitizedText = extractedText.replace(/"/g, '""');
    const csvContent = `"extracted_text"\n"${sanitizedText}"`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.href) {
      URL.revokeObjectURL(link.href);
    }
    link.href = URL.createObjectURL(blob);
    const fileName = imageFile?.name.replace(/\.[^/.]+$/, "") || 'extracted-data';
    link.download = `${fileName}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [extractedText, imageFile]);

  const handleReset = useCallback(() => {
    setImageFile(null);
    if(imageDataUrl) URL.revokeObjectURL(imageDataUrl);
    setImageDataUrl(null);
    setExtractedText(null);
    setIsLoading(false);
    setError(null);
    setSaveStatus('idle');
  }, [imageDataUrl]);
  
  const renderContent = () => {
    switch (activeView) {
      case 'capture':
        return !imageFile ? (
          <ImageUploader onImageReady={handleImageReady} isLoading={isLoading} />
        ) : (
          imageDataUrl && <ResultsDisplay 
            imageDataUrl={imageDataUrl}
            extractedText={extractedText || ''}
            onDownloadCsv={handleDownloadCsv}
            onReset={handleReset}
            isLoading={isLoading}
          />
        );
      case 'search':
        return <PatientSearch />;
      case 'menu':
      default:
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Admin Dashboard</h2>
            <p className="text-gray-400 mb-12">Please select a module to continue.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <button
                onClick={() => setActiveView('capture')}
                className="group p-8 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-900/20 transition-all duration-300 flex flex-col items-center justify-center text-center"
              >
                <UploadCloud className="h-12 w-12 text-indigo-400 mb-4 transition-transform group-hover:-translate-y-1" />
                <h3 className="text-xl font-semibold text-white mb-2">Intelligent Capture</h3>
                <p className="text-gray-400">Upload and process new documents.</p>
              </button>
              <button
                onClick={() => setActiveView('search')}
                className="group p-8 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-900/20 transition-all duration-300 flex flex-col items-center justify-center text-center"
              >
                <Search className="h-12 w-12 text-indigo-400 mb-4 transition-transform group-hover:-translate-y-1" />
                <h3 className="text-xl font-semibold text-white mb-2">Patient Search</h3>
                <p className="text-gray-400">Find and review patient records.</p>
              </button>
            </div>
          </div>
        );
    }
  };
  
  const renderSaveStatus = () => {
    if (saveStatus === 'idle' || activeView !== 'capture' || !imageFile) return null;

    let content;
    switch (saveStatus) {
      case 'saving':
        content = (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Saving to database...</span>
          </>
        );
        break;
      case 'success':
        content = (
          <>
            <CheckCircle size={16} />
            <span>Saved successfully!</span>
          </>
        );
        break;
      case 'error':
        content = (
          <>
            <AlertTriangle size={16} />
            <span>Save failed.</span>
          </>
        );
        break;
      default:
        return null;
    }

    return (
      <div className={`fixed bottom-4 left-4 p-3 rounded-lg shadow-lg flex items-center gap-2 text-white text-sm
        ${saveStatus === 'success' ? 'bg-green-600' : ''}
        ${saveStatus === 'error' ? 'bg-red-600' : ''}
        ${saveStatus === 'saving' ? 'bg-blue-600' : ''}
      `}>
        {content}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-[#121212] text-gray-200 flex flex-col items-center justify-center antialiased p-4">
      <header className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-10">
        <div className="flex-1">
          {activeView !== 'menu' && (
            <button
              onClick={() => {
                if(activeView === 'capture') handleReset();
                setActiveView('menu');
              }}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 text-white text-sm font-medium rounded-md hover:bg-gray-600 transition-colors"
              aria-label="Back to menu"
            >
              <ArrowLeft size={16} />
              <span>Menu</span>
            </button>
          )}
        </div>
        <h1 className="text-xl font-bold text-center text-white flex-1">
          {activeView === 'capture' ? 'Document Intelligence Platform' : activeView === 'search' ? 'Patient Search' : 'Administrator Hub'}
        </h1>
        <div className="flex-1 flex justify-end">
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
              aria-label="Logout"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
        </div>
      </header>
      <main className="w-full h-full flex-grow flex items-center justify-center pt-16">
        {renderContent()}
      </main>
      {renderSaveStatus()}
       {error && (
         <div className="fixed bottom-4 right-4 bg-red-500 text-white p-3 rounded-lg shadow-lg max-w-sm">
           <p className="font-bold">An Error Occurred</p>
           <p className="text-sm">{error}</p>
         </div>
       )}
    </div>
  );
};

export default AdminDashboard;
