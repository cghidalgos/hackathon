/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, FormEvent } from 'react';
import { Search, UserX, AlertTriangle } from 'lucide-react';
import { searchPatients } from '../services/apiService';
import { Patient } from '../types';
import PatientProfile from './PatientProfile';

const PatientSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Patient[]>([]);
  const [searchStatus, setSearchStatus] = useState<'idle' | 'loading' | 'success' | 'not_found' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setSearchStatus('idle');
      setSearchResults([]);
      return;
    }

    setSearchStatus('loading');
    setError(null);

    try {
      const results = await searchPatients(searchTerm.trim());
      if (results.length > 0) {
        setSearchResults(results);
        setSearchStatus('success');
      } else {
        setSearchResults([]);
        setSearchStatus('not_found');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      setSearchStatus('error');
      setSearchResults([]);
    }
  };
  
  const renderResults = () => {
    switch (searchStatus) {
      case 'idle':
        return (
          <div className="text-center text-gray-500">
            <p>Please enter a search term to begin.</p>
          </div>
        );
      case 'loading':
        return (
          <div className="text-center text-gray-400 flex flex-col items-center gap-4 p-8">
            <div className="w-8 h-8 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg">Searching...</p>
          </div>
        );
      case 'not_found':
         return (
           <div className="text-center text-gray-400 flex flex-col items-center gap-4 p-8 border border-dashed border-gray-700 rounded-lg">
             <UserX size={48} className="text-red-500" />
             <h3 className="text-xl font-semibold text-white">No Patient Found</h3>
             <p>The search for "{searchTerm}" did not match any patient records.</p>
           </div>
        );
      case 'error':
        return (
           <div className="text-center text-gray-400 flex flex-col items-center gap-4 p-8 border border-dashed border-red-800 rounded-lg bg-red-900/20">
             <AlertTriangle size={48} className="text-red-500" />
             <h3 className="text-xl font-semibold text-white">Search Failed</h3>
             <p>{error}</p>
           </div>
        );
      case 'success':
        return (
          <div className="space-y-8">
            {searchResults.map(patient => (
                <PatientProfile key={patient._id} patient={patient} />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 text-center">
      <h2 className="text-2xl font-bold text-white mb-4">Patient Record Search</h2>
      <p className="text-gray-400 mb-8">Enter a patient's name or Cédula (ID) to find their clinical history.</p>

      <form onSubmit={handleSearch} className="flex items-center gap-2 max-w-lg mx-auto mb-12">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or Cédula..."
            className="w-full pl-10 pr-3 py-2.5 bg-gray-900 border border-gray-700 rounded-md placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button type="submit" disabled={searchStatus === 'loading'} className="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-800 disabled:cursor-not-allowed">
          {searchStatus === 'loading' ? '...' : 'Search'}
        </button>
      </form>
      
      <div className="mt-8 text-left">
        {renderResults()}
      </div>
    </div>
  );
};

export default PatientSearch;
