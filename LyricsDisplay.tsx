import React, { useState, useCallback } from 'react';
import { LyricsResponse } from '../types';
import { MusicNoteIcon, MoodIcon, RhythmIcon, StructureIcon, ClipboardIcon, CheckIcon } from './IconComponents';

interface LyricsDisplayProps {
  data: LyricsResponse;
}

const AnalysisItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
    <div className="flex flex-col items-center text-center p-3 bg-gray-800/50 rounded-lg">
        <div className="text-cyan-400 mb-2">{icon}</div>
        <p className="text-sm font-semibold text-gray-300">{label}</p>
        <p className="text-md text-white">{value}</p>
    </div>
);


const LyricsDisplay: React.FC<LyricsDisplayProps> = ({ data }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(data.lyrics).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }, [data.lyrics]);


  return (
    <div className="w-full mt-8 md:mt-12 p-6 bg-gray-800/50 border border-gray-700 rounded-lg shadow-lg backdrop-blur-sm animate-fade-in">
        <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-cyan-300">{data.title}</h2>
        </div>
        
        <div className="mb-8 p-4 bg-gray-900/40 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-300 mb-4 text-center">歌曲分析</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <AnalysisItem icon={<MusicNoteIcon />} label="曲风" value={data.analysis.genre} />
                <AnalysisItem icon={<MoodIcon />} label="情绪" value={data.analysis.mood} />
                <AnalysisItem icon={<RhythmIcon />} label="节奏" value={data.analysis.rhythm} />
                <AnalysisItem icon={<StructureIcon />} label="结构" value={data.analysis.structure} />
            </div>
        </div>
      
        <div>
            <div className="flex justify-center items-center gap-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-300">歌词</h3>
                <button
                    onClick={handleCopy}
                    disabled={isCopied}
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-700/60 border border-gray-600 rounded-md hover:bg-gray-600 disabled:bg-green-800/50 disabled:border-green-700 transition-all duration-200 text-gray-300 disabled:text-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500"
                    aria-label="Copy lyrics to clipboard"
                >
                    {isCopied ? (
                        <>
                            <CheckIcon />
                            已复制!
                        </>
                    ) : (
                        <>
                            <ClipboardIcon />
                            复制歌词
                        </>
                    )}
                </button>
            </div>
            <div className="whitespace-pre-wrap text-gray-200 leading-relaxed text-center font-serif text-lg p-4 bg-gray-900/40 rounded-lg">
                {data.lyrics}
            </div>
        </div>
    </div>
  );
};

export default LyricsDisplay;