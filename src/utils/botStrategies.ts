type Board = (string | null)[];

// Checks if a player can win in the next move
const findWinningMove = (squares: Board, player: string): number | null => {
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      const boardCopy = [...squares];
      boardCopy[i] = player;
      if (calculateWinner(boardCopy).winner === player) {
        return i;
      }
    }
  }
  return null;
};

// Returns corner positions (0, 2, 6, 8)
const getCorners = (squares: Board): number[] => {
  return [0, 2, 6, 8].filter(i => !squares[i]);
};

// Returns edge positions (1, 3, 5, 7)
const getEdges = (squares: Board): number[] => {
  return [1, 3, 5, 7].filter(i => !squares[i]);
};

export const calculateWinner = (squares: Board): { winner: string | null; line: number[] | null } => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
};

export const getBotMove = (squares: Board, difficulty: 'easy' | 'medium' | 'hard'): number => {
  const emptySquares = squares
    .map((square, index) => square === null ? index : null)
    .filter((index): index is number => index !== null);

  if (emptySquares.length === 0) return -1;

  switch (difficulty) {
    case 'easy':
      return getEasyMove(squares);
    case 'medium':
      return getMediumMove(squares);
    case 'hard':
      return getHardMove(squares);
    default:
      return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  }
};

// Easy: Random moves with basic blocking
const getEasyMove = (squares: Board): number => {
  const winningMove = findWinningMove(squares, 'O');
  if (winningMove !== null) return winningMove;

  const emptySquares = squares
    .map((square, index) => square === null ? index : null)
    .filter((index): index is number => index !== null);

  return emptySquares[Math.floor(Math.random() * emptySquares.length)];
};

// Medium: Tries to win and block opponent's winning moves
const getMediumMove = (squares: Board): number => {
  // Try to win
  const winningMove = findWinningMove(squares, 'O');
  if (winningMove !== null) return winningMove;

  // Block opponent's winning move
  const blockingMove = findWinningMove(squares, 'X');
  if (blockingMove !== null) return blockingMove;

  // Take center if available
  if (!squares[4]) return 4;

  // Take corners
  const corners = getCorners(squares);
  if (corners.length > 0) {
    return corners[Math.floor(Math.random() * corners.length)];
  }

  // Take any available edge
  const edges = getEdges(squares);
  if (edges.length > 0) {
    return edges[Math.floor(Math.random() * edges.length)];
  }

  // Take any available square
  const emptySquares = squares
    .map((square, index) => square === null ? index : null)
    .filter((index): index is number => index !== null);

  return emptySquares[0];
};

// Hard: Implements minimax algorithm for perfect play
const getHardMove = (squares: Board): number => {
  // Try to win first
  const winningMove = findWinningMove(squares, 'O');
  if (winningMove !== null) return winningMove;

  // Block opponent's winning move
  const blockingMove = findWinningMove(squares, 'X');
  if (blockingMove !== null) return blockingMove;

  // Use minimax for best move
  let bestScore = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      squares[i] = 'O';
      const score = minimax(squares, 0, false);
      squares[i] = null;

      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
};

const minimax = (squares: Board, depth: number, isMaximizing: boolean): number => {
  const result = calculateWinner(squares).winner;
  
  if (result === 'O') return 10 - depth;
  if (result === 'X') return depth - 10;
  if (squares.every(square => square !== null)) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        squares[i] = 'O';
        bestScore = Math.max(bestScore, minimax(squares, depth + 1, false));
        squares[i] = null;
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        squares[i] = 'X';
        bestScore = Math.min(bestScore, minimax(squares, depth + 1, true));
        squares[i] = null;
      }
    }
    return bestScore;
  }
};