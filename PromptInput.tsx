import React from 'react';
import { SparklesIcon } from './IconComponents';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  examplePrompts: string[];
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, onGenerate, isLoading, examplePrompts }) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <textarea
          aria-label="Your song idea or story"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="输入一个故事、一种心情、或一句简单的想法..."
          className="w-full h-32 p-4 pr-12 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 resize-none text-gray-200 placeholder-gray-500"
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !prompt.trim()}
        className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500"
      >
        {isLoading ? (
            <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                生成中...
            </>
        ) : (
            <>
                <SparklesIcon className="w-5 h-5"/>
                生成歌词
            </>
        )}
      </button>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 mb-3">没灵感？试试这些：</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {examplePrompts.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => setPrompt(example)}
              disabled={isLoading}
              className="px-3 py-1 text-sm bg-gray-800/50 border border-gray-700 rounded-full hover:bg-gray-700 hover:border-cyan-500 transition-all duration-200 text-gray-300"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
};

export default PromptInput;