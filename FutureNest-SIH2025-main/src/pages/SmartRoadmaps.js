import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SmartRoadmaps() {
  const navigate = useNavigate();
  
  // Redirect to the HTML roadmaps page
  React.useEffect(() => {
    // Store the current React router state before leaving
    sessionStorage.setItem('returnToDashboard', 'true');
    window.location.href = '/smart-roadmaps-react.html';
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="mb-6">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Smart Roadmaps...</h2>
        <p className="text-gray-600">Taking you to the interactive roadmaps page</p>
        <button 
          onClick={() => navigate('/dashboard')}
          className="mt-4 px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}