/// <reference types="vite/types/importMeta.d.ts" />

// API Configuration - works for both Vite and Create React App
const API_BASE_URL = 
  import.meta.env?.VITE_API_BASE_URL ||           // Vite
  process.env.REACT_APP_API_BASE_URL ||          // Create React App
  'http://localhost:3001/api/v1';                // Local fallback

// Helper function for API calls
export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export { API_BASE_URL };