import React, { useState, useCallback } from 'react';
import { LyricsResponse } from './types';
import { generateLyrics } from './services/geminiService';
import Header from './components/Header';
import PromptInput from './components/PromptInput';
import LyricsDisplay from './components/LyricsDisplay';
import Loader from './components/Loader';
// Fix: Renamed 'Error' component import to 'ErrorDisplay' to avoid name collision with the built-in 'Error' class.
import ErrorDisplay from './components/Error';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [lyricsResponse, setLyricsResponse] = useState<LyricsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const examplePrompts = [
    "雨夜里，一个人在空荡的车站等车",
    "夏日午后，回忆童年的冰淇淋和蝉鸣",
    "一只迷失在未来都市的猫",
  ];

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setLyricsResponse(null);
    try {
      const response = await generateLyrics(prompt);
      setLyricsResponse(response);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  return (
    <div className="min-h-screen bg-gray-900 bg-gradient-to-br from-gray-900 via-gray-900 to-cyan-900/50 text-white font-sans">
      <main className="container mx-auto px-4 py-8 md:py-16 flex flex-col items-center">
        <div className="w-full max-w-2xl">
          <Header />
          <PromptInput 
            prompt={prompt} 
            setPrompt={setPrompt} 
            onGenerate={handleGenerate} 
            isLoading={isLoading}
            examplePrompts={examplePrompts} 
          />
          {isLoading && <Loader />}
          {error && <ErrorDisplay message={error} />}
          {lyricsResponse && <LyricsDisplay data={lyricsResponse} />}
        </div>
      </main>
    </div>
  );
};

export default App;
