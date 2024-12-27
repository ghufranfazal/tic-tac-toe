import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';
import { Board } from './components/Board';
import { GameStatus } from './components/GameStatus';
import { DifficultySelector } from './components/DifficultySelector';
import { GitHubLink } from './components/GitHubLink';
import { ThemeToggle } from './components/ThemeToggle';
import { useTheme } from './hooks/useTheme';
import { calculateWinner, getBotMove } from './utils/botStrategies';

function App() {
  const { theme, setTheme } = useTheme();
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [playerScore, setPlayerScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  const { winner } = calculateWinner(squares);
  const isDraw = !winner && squares.every(square => square !== null);

  useEffect(() => {
    if (!isPlayerTurn && !winner && !isDraw) {
      const timer = setTimeout(() => {
        const botMoveIndex = getBotMove(squares, difficulty);
        handleMove(botMoveIndex);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, winner, isDraw, difficulty]);

  const handleMove = (i: number) => {
    if (squares[i] || winner || isDraw) return;

    const newSquares = squares.slice();
    newSquares[i] = isPlayerTurn ? 'X' : 'O';
    setSquares(newSquares);

    const result = calculateWinner(newSquares);
    if (result.winner) {
      setWinningLine(result.line);
      if (result.winner === 'X') {
        setPlayerScore(prev => prev + 1);
      } else {
        setBotScore(prev => prev + 1);
      }
    }

    setIsPlayerTurn(!isPlayerTurn);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinningLine(null);
  };

  const resetMatch = () => {
    resetGame();
    setPlayerScore(0);
    setBotScore(0);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 
      dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen flex items-center justify-center p-4"
        >
          <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 
            rounded-2xl shadow-xl transition-colors duration-300">
            <div className="flex items-center justify-center gap-2 mb-8">
              <Gamepad2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Tic Tac Toe
              </h1>
            </div>

            <DifficultySelector difficulty={difficulty} onSelect={setDifficulty} />
            <GameStatus
              winner={winner}
              isDraw={isDraw}
              isPlayerTurn={isPlayerTurn}
              playerScore={playerScore}
              botScore={botScore}
            />

            <div className="flex justify-center mb-8">
              <Board
                squares={squares}
                winningLine={winningLine}
                onClick={handleMove}
              />
            </div>

            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white 
                  rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-600 
                  transition-colors"
                onClick={resetGame}
              >
                New Game
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gray-600 dark:bg-gray-700 text-white 
                  rounded-lg shadow-md hover:bg-gray-700 dark:hover:bg-gray-600 
                  transition-colors"
                onClick={resetMatch}
              >
                Reset Match
              </motion.button>
            </div>

            <GitHubLink />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;