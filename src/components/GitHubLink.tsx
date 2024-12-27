import React from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

export const GitHubLink: React.FC = () => {
  return (
    <motion.a
      href="https://github.com/ghufranfazal"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 mt-6 text-gray-600 
        dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 
        transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Github className="w-5 h-5" />
      <span className="text-sm font-medium">Created by Ghufran Fazal</span>
    </motion.a>
  );
};