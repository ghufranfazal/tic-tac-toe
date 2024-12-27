import React from 'react';
import { Square } from './Square';
import { motion } from 'framer-motion';

interface BoardProps {
  squares: (string | null)[];
  winningLine: number[] | null;
  onClick: (i: number) => void;
}

export const Board: React.FC<BoardProps> = ({ squares, winningLine, onClick }) => {
  const renderSquare = (i: number) => (
    <Square
      key={i}
      value={squares[i]}
      isWinning={winningLine?.includes(i)}
      onClick={() => onClick(i)}
    />
  );

  return (
    <motion.div 
      className="grid grid-cols-3 gap-2 w-[300px] h-[300px]"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {Array(9).fill(null).map((_, i) => renderSquare(i))}
    </motion.div>
  );
};