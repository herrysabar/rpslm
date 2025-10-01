import React from 'react';

interface ResultDisplayProps {
  result: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  if (!result) {
    return (
        <div className="text-4xl md:text-6xl font-black text-slate-400 animate-pulse">
            VS
        </div>
    );
  }
  
  let textColor = 'text-orange-500';
  if (result === 'YOU WIN') textColor = 'text-green-500';
  if (result === 'BOT WINS') textColor = 'text-red-500';

  return (
    <div className={`text-3xl md:text-5xl font-black tracking-widest animate-bounce-in ${textColor}`}>
      {result}
    </div>
  );
};

export default ResultDisplay;