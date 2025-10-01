import React from 'react';

interface ScoreboardProps {
  playerScore: number;
  botScore: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ playerScore, botScore }) => {
  return (
    <div className="w-full max-w-lg grid grid-cols-2 gap-4 text-center my-4">
      <div className="bg-white/60 backdrop-blur-sm border-2 border-blue-500 rounded-lg p-3">
        <p className="text-sm font-semibold text-blue-600">SKOR KAMU</p>
        <p className="text-4xl font-bold">{playerScore}</p>
      </div>
      <div className="bg-white/60 backdrop-blur-sm border-2 border-red-500 rounded-lg p-3">
        <p className="text-sm font-semibold text-red-600">SKOR BOT</p>
        <p className="text-4xl font-bold">{botScore}</p>
      </div>
    </div>
  );
};

export default Scoreboard;