import React from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

interface DifficultySelectorProps {
  difficulty: 'easy' | 'medium' | 'hard';
  onSelect: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({ 
  difficulty, 
  onSelect 
}) => {
  const difficulties = [
    { value: 'easy', label: 'Easy', color: 'bg-green-500 dark:bg-green-600' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500 dark:bg-yellow-600' },
    { value: 'hard', label: 'Hard', color: 'bg-red-500 dark:bg-red-600' }
  ] as const;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          Bot Difficulty
        </h2>
      </div>
      <div className="flex justify-center gap-3">
        {difficulties.map(({ value, label, color }) => (
          <motion.button
            key={value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-lg text-white font-medium shadow-md
              ${difficulty === value 
                ? `${color} ring-2 ring-offset-2 dark:ring-offset-gray-800 ring-${color}`
                : 'bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-500'
              } transition-all duration-200`}
            onClick={() => onSelect(value)}
          >
            {label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};