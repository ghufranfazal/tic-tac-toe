import React from 'react';
import { motion } from 'framer-motion';

interface GameStatusProps {
  winner: string | null;
  isDraw: boolean;
  isPlayerTurn: boolean;
  playerScore: number;
  botScore: number;
}

export const GameStatus: React.FC<GameStatusProps> = ({
  winner,
  isDraw,
  isPlayerTurn,
  playerScore,
  botScore,
}) => {
  let status = isPlayerTurn ? "Your Turn" : "Bot's Turn";
  if (winner) status = `${winner === 'X' ? 'You' : 'Bot'} Wins!`;
  if (isDraw) status = "It's a Draw!";

  return (
    <div className="text-center mb-8">
      <motion.h2
        className="text-2xl font-bold mb-4 text-gray-800 dark:text-white"
        key={status}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {status}
      </motion.h2>
      <div className="flex justify-center gap-8 text-lg">
        <div className="text-blue-600 dark:text-blue-400">
          You: {playerScore}
        </div>
        <div className="text-red-600 dark:text-red-400">
          Bot: {botScore}
        </div>
      </div>
    </div>
  );
};