
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="w-full mt-8 md:mt-12 p-6 bg-gray-800/50 border border-gray-700 rounded-lg shadow-lg animate-pulse">
      <div className="h-8 bg-gray-700 rounded w-1/2 mx-auto mb-6"></div>
      
      <div className="mb-8 p-4 bg-gray-900/40 rounded-lg">
        <div className="h-6 bg-gray-700 rounded w-1/4 mx-auto mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="h-24 bg-gray-700/50 rounded-lg"></div>
          <div className="h-24 bg-gray-700/50 rounded-lg"></div>
          <div className="h-24 bg-gray-700/50 rounded-lg"></div>
          <div className="h-24 bg-gray-700/50 rounded-lg"></div>
        </div>
      </div>
      
      <div>
        <div className="h-6 bg-gray-700 rounded w-1/4 mx-auto mb-4"></div>
        <div className="space-y-4 p-4 bg-gray-900/40 rounded-lg">
            <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6 mx-auto"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
