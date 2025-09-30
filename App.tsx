/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';

const App: React.FC = () => {
  const [loggedInRole, setLoggedInRole] = useState<'admin' | 'user' | null>(null);

  const handleLogin = (role: 'admin' | 'user') => {
    setLoggedInRole(role);
  };

  const handleLogout = () => {
    setLoggedInRole(null);
  };

  if (!loggedInRole) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (loggedInRole === 'admin') {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  if (loggedInRole === 'user') {
    return <UserDashboard onLogout={handleLogout} />;
  }
  
  return null; // Should not happen
};

export default App;
