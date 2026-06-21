 'use client'
 import React, { useState } from 'react';
import { Spinner } from '@heroui/react';

const LoadingComponent = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6">
      
      {isLoading ? (
        <div className="flex flex-col items-center gap-2">
          <Spinner color="success" />
          <span className="text-xs text-slate-500">Loading...</span>
        </div>
      ) : (
        <div className="text-center">
          <h3 className="text-lg font-semibold text-success">Success!</h3>
          <p className="text-sm text-slate-600">Your data has been loaded successfully.</p>
        </div>
      )}

      <button 
        onClick={() => setIsLoading(!isLoading)} 
        className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
      >
        {isLoading ? "Toggle (Stop Loading)" : "Toggle (Start Loading)"}
      </button>

    </div>
  );
};

export default LoadingComponent;