/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { LogOut } from 'lucide-react';
import PatientSearch from './PatientSearch';

interface UserDashboardProps {
  onLogout: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ onLogout }) => {
  return (
    <div className="min-h-screen w-full bg-[#121212] text-gray-200 flex flex-col items-center antialiased p-4">
      <header className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-10">
        <h1 className="text-xl font-bold text-white">Patient Search</h1>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
          aria-label="Logout"
        >
          <LogOut size={16} />
          Logout
        </button>
      </header>
      <main className="w-full h-full flex-grow flex items-center justify-center pt-16">
        <PatientSearch />
      </main>
    </div>
  );
};

export default UserDashboard;
