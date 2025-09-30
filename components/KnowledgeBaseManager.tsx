/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Download, FileText, RotateCcw } from 'lucide-react';

interface ResultsDisplayProps {
  imageDataUrl: string;
  extractedText: string;
  onDownloadCsv: () => void;
  onReset: () => void;
  isLoading: boolean;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ 
  imageDataUrl, 
  extractedText, 
  onDownloadCsv, 
  onReset,
  isLoading
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Image Preview Column */}
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold text-white mb-4">Uploaded Document</h2>
        <div className="relative w-full aspect-[8.5/11] bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-lg">
          <img src={imageDataUrl} alt="Uploaded document" className="w-full h-full object-contain" />
          {isLoading && (
            <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center backdrop-blur-sm">
              <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              <p className="text-white mt-4 text-lg font-semibold">Extracting Text...</p>
            </div>
          )}
        </div>
      </div>

      {/* Extracted Text Column */}
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Extracted Text</h2>
          {!isLoading && (
             <div className="flex items-center gap-2">
               <button 
                 onClick={onDownloadCsv}
                 disabled={!extractedText}
                 className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
               >
                 <Download size={16} />
                 Download CSV
               </button>
                <button 
                 onClick={onReset}
                 className="flex items-center gap-2 px-3 py-1.5 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors"
               >
                 <RotateCcw size={16} />
                 New
               </button>
             </div>
          )}
        </div>
        <div className="flex-grow bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-inner">
          {isLoading ? (
            <div className="w-full h-full flex justify-center items-center text-gray-400">
              <FileText size={48} className="animate-pulse" />
            </div>
          ) : (
             <textarea
              readOnly
              value={extractedText || "No text could be extracted."}
              className="w-full h-full bg-transparent text-gray-300 placeholder-gray-500 resize-none border-none focus:ring-0 text-sm leading-relaxed"
              placeholder="Extracted text will appear here..."
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
