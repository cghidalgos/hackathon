/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { Patient } from '../types';

// The base URL for your backend server. 
// Make sure your backend is running on this port.
const API_BASE_URL = 'http://localhost:3001';

/**
 * Searches for patients by a query term.
 * @param query The search term (name or Cédula).
 * @returns A promise that resolves to an array of patients.
 */
export const searchPatients = async (query: string): Promise<Patient[]> => {
  const response = await fetch(`${API_BASE_URL}/api/patients/search?q=${encodeURIComponent(query)}`);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch patient data.');
  }
  
  return response.json();
};

/**
 * Saves an extracted document's content to the database.
 * @param documentData The data to save, including content and source file name.
 * @returns A promise that resolves when the document is saved.
 */
export const saveDocument = async (documentData: { content: string; sourceFile: string }): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/api/documents`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(documentData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to save document.');
  }

  return response.json();
};
