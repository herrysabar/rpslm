import React from 'react';
import { CardInfo } from '../types';

interface GameCardProps {
  choice?: CardInfo;
  onClick?: () => void;
  isDisabled?: boolean;
  isFaceDown?: boolean;
  isRevealed?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ choice, onClick, isDisabled = false, isFaceDown = false, isRevealed = false }) => {
  const baseClasses = "w-28 h-40 md:w-32 md:h-48 rounded-lg border-2 flex flex-col items-center justify-center p-2 transition-all duration-300 transform";
  const disabledClasses = "opacity-30 saturate-50 cursor-not-allowed";
  const enabledClasses = "cursor-pointer hover:scale-105 hover:-translate-y-2 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-opacity-50";

  if (isFaceDown) {
    const faceDownClasses = isRevealed 
      ? `bg-blue-300 border-blue-400 shadow-md animate-flip-in`
      : `bg-blue-300 border-blue-400 shadow-md ${isDisabled ? 'opacity-50' : ''}`;
    
    return (
        <div className={`${baseClasses} ${faceDownClasses}`}>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full animate-pulse"></div>
        </div>
    );
  }

  if (!choice) return null;

  const cardClasses = `${baseClasses} bg-white/80 backdrop-blur-sm ${choice.color} ${choice.shadow} ${isDisabled ? disabledClasses : `${enabledClasses} focus:${choice.color}`}`;
  
  return (
    <div className={`${cardClasses} ${isRevealed ? 'animate-flip-in' : ''}`} onClick={!isDisabled ? onClick : undefined} tabIndex={isDisabled ? -1 : 0}>
      <div className="text-5xl md:text-6xl text-slate-700">
        {/* FIX: Add type assertion to fix cloneElement error. The `choice.icon` element type from `CardInfo` is too generic, so we assert a more specific type that includes `className` to satisfy TypeScript. */}
        {React.cloneElement(choice.icon as React.ReactElement<{ className?: string }>, { className: 'w-16 h-16 md:w-20 md:h-20' })}
      </div>
      <p className="mt-2 text-base md:text-lg font-bold tracking-wider text-slate-800">{choice.name}</p>
    </div>
  );
};

// Add keyframes to tailwind.config.js if you had one, but for CDN we add a style tag or do it inline
// In a real project, this would go in index.css.
if (typeof window !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes flip-in {
            0% { transform: rotateY(90deg) scale(0.9); opacity: 0; }
            100% { transform: rotateY(0deg) scale(1); opacity: 1; }
        }
        .animate-flip-in {
            animation: flip-in 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
        }
        @keyframes bounce-in {
            0% { transform: scale(0.5); opacity: 0; }
            50% { transform: scale(1.15); }
            100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
             animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
    `;
    document.head.appendChild(style);
}

export default GameCard;