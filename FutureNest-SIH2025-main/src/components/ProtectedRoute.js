import React from 'react';
import { Navigate } from 'react-router-dom';
import { useDummyAuth } from '../contexts/DummyAuthContext';

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useDummyAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return currentUser ? children : <Navigate to="/login" />;
}