/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, FormEvent, useEffect } from 'react';
import { User, Shield, KeyRound, ArrowLeft, X } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (role: 'admin' | 'user') => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'user' | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Effect to reset form state when modal is opened/closed
  useEffect(() => {
    if (!isOpen) {
      // Delay reset to allow for closing animation
      const timer = setTimeout(() => {
        setSelectedRole(null);
        setPassword('');
        setError('');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const expectedUser = selectedRole;
    const expectedPass = '12345';

    if (username === expectedUser && password === expectedPass) {
      onLogin(selectedRole!);
    } else {
      setError('Invalid username or password.');
    }
  };

  const renderRoleSelection = () => (
    <div className="w-full text-center">
      <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
      <p className="text-gray-400 mb-8">Please select your role to continue.</p>
      <div className="space-y-4">
        <button
          onClick={() => { setSelectedRole('admin'); setUsername('admin'); setPassword(''); setError(''); }}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Shield size={20} />
          <span>Enter as Administrator</span>
        </button>
        <button
          onClick={() => { setSelectedRole('user'); setUsername('user'); setPassword(''); setError(''); }}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
        >
          <User size={20} />
          <span>Enter as User</span>
        </button>
      </div>
    </div>
  );

  const renderLoginForm = () => (
    <div className="w-full">
      <button onClick={() => setSelectedRole(null)} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6">
        <ArrowLeft size={16} />
        Back to role selection
      </button>
      <div className="text-center">
         <h1 className="text-2xl font-bold text-white mb-2">
            {selectedRole === 'admin' ? 'Admin Login' : 'User Login'}
         </h1>
         <p className="text-gray-400 mb-8">Enter your credentials to sign in.</p>
      </div>
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label htmlFor="username-modal" className="block text-sm font-medium text-gray-300">Username</label>
          <div className="mt-1 relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-500" />
             </div>
             <input
              id="username-modal"
              type="text"
              value={username}
              readOnly
              className="w-full pl-10 pr-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white cursor-not-allowed"
            />
          </div>
        </div>
         <div>
          <label htmlFor="password-modal" className="block text-sm font-medium text-gray-300">Password</label>
          <div className="mt-1 relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <KeyRound className="h-5 w-5 text-gray-500" />
             </div>
             <input
              id="password-modal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="w-full pl-10 pr-3 py-2 bg-gray-900 border border-gray-700 rounded-md placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
            />
          </div>
        </div>
        
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <div>
            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
            >
                Sign in
            </button>
        </div>
      </form>
       <p className="mt-4 text-center text-xs text-gray-500">
         (Hint: password is <span className="font-mono">12345</span>)
       </p>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="relative bg-[#181818] border border-gray-700/50 rounded-xl shadow-2xl w-full max-w-sm p-8 text-white transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors" aria-label="Close modal">
          <X size={24} />
        </button>
        {selectedRole ? renderLoginForm() : renderRoleSelection()}
      </div>
    </div>
  );
};

export default LoginModal;
