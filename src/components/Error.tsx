import React from 'react';

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div role="alert" className="w-full mt-8 md:mt-12 p-4 bg-red-900/50 border border-red-700 rounded-lg text-center">
      <p className="text-red-300 font-semibold">发生错误</p>
      <p className="text-red-400 mt-1">{message}</p>
    </div>
  );
};

export default Error;