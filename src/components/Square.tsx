import React from 'react';
import { motion } from 'framer-motion';

interface SquareProps {
  value: string | null;
  isWinning?: boolean;
  onClick: () => void;
}

export const Square: React.FC<SquareProps> = ({ value, isWinning, onClick }) => {
  return (
    <motion.button
      className={`w-full h-[100px] text-4xl font-bold rounded-lg 
        ${isWinning 
          ? 'bg-green-200 dark:bg-green-700 hover:bg-green-300 dark:hover:bg-green-600' 
          : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'} 
        transition-colors duration-200 shadow-md`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {value && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={value === 'X' 
            ? 'text-blue-600 dark:text-blue-400' 
            : 'text-red-600 dark:text-red-400'}
        >
          {value}
        </motion.span>
      )}
    </motion.button>
  );
};