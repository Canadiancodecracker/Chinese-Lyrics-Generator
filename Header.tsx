
import React from 'react';
import { SparklesIcon } from './IconComponents';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 md:mb-12">
      <div className="flex items-center justify-center gap-4 mb-2">
        <SparklesIcon className="w-8 h-8 md:w-10 md:h-10 text-cyan-400"/>
        <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
          AI 中文歌词创作
        </h1>
      </div>
      <p className="text-md md:text-lg text-gray-400">
        将你的灵感，变成一首动人的歌。
      </p>
    </header>
  );
};

export default Header;
