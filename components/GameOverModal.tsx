import React from 'react';

interface GameOverModalProps {
  isOpen: boolean;
  playerScore: number;
  botScore: number;
  onPlayAgain: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ isOpen, playerScore, botScore, onPlayAgain }) => {
  if (!isOpen) return null;

  let resultMessage = "Permainan Seri!";
  let resultColor = "text-orange-500";
  if (playerScore > botScore) {
    resultMessage = "Selamat, Kamu Menang!";
    resultColor = "text-green-500";
  } else if (botScore > playerScore) {
    resultMessage = "Kamu Kalah. Coba Lagi Nanti!";
    resultColor = "text-red-500";
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 animate-bounce-in">
      <div className="bg-sky-50 rounded-xl shadow-2xl p-8 m-4 text-center border-2 border-slate-200 max-w-sm w-full">
        <h2 className="text-3xl font-bold mb-2">Permainan Selesai</h2>
        <p className={`text-2xl font-semibold mb-4 ${resultColor}`}>{resultMessage}</p>
        <div className="text-lg mb-6">
          <p>Skor Akhir:</p>
          <p className="text-blue-600">Kamu: <span className="font-bold">{playerScore}</span></p>
          <p className="text-red-600">Bot: <span className="font-bold">{botScore}</span></p>
        </div>
        <button
          onClick={onPlayAgain}
          className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-bold py-3 px-6 rounded-lg hover:from-orange-500 hover:to-yellow-500 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-400/50"
        >
          Main Lagi
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;