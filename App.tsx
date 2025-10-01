import React, { useState, useEffect, useCallback } from 'react';
import { Choice } from './types';
import { CHOICES, INITIAL_DECK, WIN_CONDITIONS, POINT_VALUES } from './constants';
import GameCard from './components/GameCard';
import Scoreboard from './components/Scoreboard';
import ResultDisplay from './components/ResultDisplay';
import GameOverModal from './components/GameOverModal';
import { playSelectSound, playWinRoundSound, playLoseRoundSound, playDrawRoundSound, playWinGameSound, playLoseGameSound, playResetSound } from './utils/audio';


const App: React.FC = () => {
  const [playerDeck, setPlayerDeck] = useState<Choice[]>(INITIAL_DECK);
  const [botDeck, setBotDeck] = useState<Choice[]>(INITIAL_DECK);
  const [playerScore, setPlayerScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [botChoice, setBotChoice] = useState<Choice | null>(null);
  const [roundResult, setRoundResult] = useState<string | null>(null);
  const [roundMessage, setRoundMessage] = useState<string>('Pilih kartumu untuk memulai permainan!');
  const [isRoundInProgress, setIsRoundInProgress] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const evaluateRound = useCallback((pChoice: Choice, bChoice: Choice) => {
    if (pChoice === bChoice) {
      setRoundResult('DRAW');
      setRoundMessage('Seri! Tidak ada poin yang diberikan.');
      playDrawRoundSound();
      return;
    }

    if (WIN_CONDITIONS[pChoice]?.includes(bChoice)) {
      const points = POINT_VALUES[pChoice] ?? 0;
      setPlayerScore(score => score + points);
      setRoundResult('YOU WIN');
      setRoundMessage(`${pChoice} mengalahkan ${bChoice}! Kamu dapat ${points} poin.`);
      playWinRoundSound();
    } else {
      const points = POINT_VALUES[bChoice] ?? 0;
      setBotScore(score => score + points);
      setRoundResult('BOT WINS');
      setRoundMessage(`${bChoice} mengalahkan ${pChoice}! Bot dapat ${points} poin.`);
      playLoseRoundSound();
    }
  }, []);

  useEffect(() => {
    if (playerDeck.length === 0 && !isRoundInProgress) {
      setIsGameOver(true);
    }
  }, [playerDeck, isRoundInProgress]);
  
  // Effect for game over sound
  useEffect(() => {
    if (isGameOver) {
        // Use a short timeout to let the modal animation start and not overlap with the last round's sound
        setTimeout(() => {
            if (playerScore > botScore) {
                playWinGameSound();
            } else {
                playLoseGameSound(); // Use the same sound for losing and drawing
            }
        }, 300);
    }
  }, [isGameOver, playerScore, botScore]);


  const handlePlayerChoice = (choice: Choice) => {
    if (isRoundInProgress || isGameOver) return;
    
    playSelectSound();
    setIsRoundInProgress(true);
    setRoundResult(null);

    // 1. Player makes a choice
    setPlayerChoice(choice);
    
    // 2. Bot makes a choice from its remaining deck
    const botRandomChoice = botDeck[Math.floor(Math.random() * botDeck.length)];
    
    // 3. Update decks
    setPlayerDeck(deck => deck.filter(c => c !== choice));
    setBotDeck(deck => deck.filter(c => c !== botRandomChoice));

    // 4. Staggered reveal for dramatic effect
    setTimeout(() => {
      setBotChoice(botRandomChoice);
    }, 750);

    setTimeout(() => {
      evaluateRound(choice, botRandomChoice);
    }, 1500);
    
    // 5. Reset for next round
    setTimeout(() => {
      setPlayerChoice(null);
      setBotChoice(null);
      setIsRoundInProgress(false);
      if (playerDeck.length > 1) {
         setRoundMessage('Pilih kartu berikutnya.');
      } else {
         setRoundMessage('Ronde terakhir!');
      }
    }, 3500);
  };
  
  const resetGame = () => {
    playResetSound();
    setPlayerDeck(INITIAL_DECK);
    setBotDeck(INITIAL_DECK);
    setPlayerScore(0);
    setBotScore(0);
    setPlayerChoice(null);
    setBotChoice(null);
    setRoundResult(null);
    setRoundMessage('Pilih kartumu untuk memulai permainan!');
    setIsRoundInProgress(false);
    setIsGameOver(false);
  };

  return (
    <div className="min-h-screen bg-sky-100 text-slate-800 font-sans flex flex-col items-center p-4 selection:bg-yellow-300 selection:text-slate-900">
      <header className="w-full max-w-5xl text-center mb-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-400 py-2">
          RPS: LASER & MIRROR
        </h1>
        <p className="text-slate-600 mt-1">Gunakan setiap kartu sekali. Skor tertinggi menang.</p>
      </header>
      
      <Scoreboard playerScore={playerScore} botScore={botScore} />

      <main className="w-full max-w-5xl flex-grow flex flex-col items-center justify-center relative my-4">
         {/* Player's Hand */}
        <div className="w-full flex flex-col items-center mb-8">
            <h2 className="text-xl font-semibold text-slate-600 mb-2">Tangan Kamu</h2>
            <div className="flex justify-center flex-wrap gap-2">
                {INITIAL_DECK.map((choice) => (
                    <GameCard 
                      key={`player-hand-${choice}`}
                      choice={CHOICES[choice]}
                      onClick={() => handlePlayerChoice(choice)}
                      isDisabled={!playerDeck.includes(choice) || isRoundInProgress}
                    />
                ))}
            </div>
        </div>

        {/* Play Area */}
        <div className="relative w-full h-48 md:h-56 flex items-center justify-around border-y-2 border-blue-400/30 bg-white/40 backdrop-blur-sm my-4 p-4 rounded-lg">
            <div className="flex flex-col items-center">
                <h3 className="text-lg font-bold text-blue-600 mb-2">PLAYER</h3>
                <div className="w-28 h-40 md:w-32 md:h-48">
                  {playerChoice && <GameCard choice={CHOICES[playerChoice]} isRevealed={true} />}
                </div>
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
               <ResultDisplay result={roundResult} />
            </div>

            <div className="flex flex-col items-center">
                <h3 className="text-lg font-bold text-red-600 mb-2">BOT</h3>
                <div className="w-28 h-40 md:w-32 md:h-48">
                  {botChoice ? <GameCard choice={CHOICES[botChoice]} isRevealed={true} /> : playerChoice && <GameCard isFaceDown={true} isRevealed={true} />}
                </div>
            </div>
        </div>
        <p className="h-6 text-center text-lg text-slate-700 italic my-2">{roundMessage}</p>

        {/* Bot's Hand */}
        <div className="w-full flex flex-col items-center mt-8">
            <h2 className="text-xl font-semibold text-slate-600 mb-2">Tangan Bot</h2>
            <div className="flex justify-center flex-wrap gap-2">
                {INITIAL_DECK.map((choice) => (
                    <GameCard 
                      key={`bot-hand-${choice}`} 
                      choice={CHOICES[choice]} 
                      isFaceDown={!botDeck.includes(choice)}
                      isDisabled={true}
                    />
                ))}
            </div>
        </div>
      </main>
      
      <GameOverModal isOpen={isGameOver} playerScore={playerScore} botScore={botScore} onPlayAgain={resetGame} />

      <footer className="w-full max-w-3xl mt-8 p-4 bg-white/60 rounded-lg shadow-md border border-slate-200">
          <h3 className="text-xl font-bold text-center mb-2 text-slate-700">Aturan Permainan</h3>
          <ul className="list-disc list-inside text-slate-600 space-y-1 text-center">
            <li><strong>Batu</strong> menang melawan <strong>Gunting</strong> & <strong>Cermin</strong> (3 Poin)</li>
            <li><strong>Kertas</strong> menang melawan <strong>Batu</strong> & <strong>Cermin</strong> (3 Poin)</li>
            <li><strong>Gunting</strong> menang melawan <strong>Kertas</strong> & <strong>Cermin</strong> (3 Poin)</li>
            <li><strong>Laser</strong> menang melawan <strong>Batu, Kertas, & Gunting</strong> (2 Poin)</li>
            <li><strong>Cermin</strong> menang melawan <strong>Laser</strong> (7 Poin)</li>
          </ul>
      </footer>
    </div>
  );
};

export default App;