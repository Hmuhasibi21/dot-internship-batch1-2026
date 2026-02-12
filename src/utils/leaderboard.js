export const getLeaderboard = () => {
  const data = localStorage.getItem('quizLeaderboard');
  return data ? JSON.parse(data) : [];
};

export const saveToLeaderboard = (name, score, correct, timeSpent) => {
  const currentLeaderboard = getLeaderboard();
  
  const isDuplicate = currentLeaderboard.some(entry => 
    entry.name === name && 
    entry.score === score && 
    entry.correct === correct &&
    entry.timeSpent === timeSpent &&
    (Date.now() - entry.id < 5000)
  );

  if (isDuplicate) return currentLeaderboard;

  const newEntry = {
    id: Date.now(),
    name,
    score,
    correct,
    timeSpent,
    date: new Date().toLocaleDateString('id-ID')
  };

  const updatedLeaderboard = [...currentLeaderboard, newEntry]
    .sort((a, b) => b.score - a.score || a.timeSpent - b.timeSpent)
    .slice(0, 10);

  localStorage.setItem('quizLeaderboard', JSON.stringify(updatedLeaderboard));
  return updatedLeaderboard;
};

export const clearLeaderboard = () => {
  localStorage.removeItem('quizLeaderboard');
  return [];
};