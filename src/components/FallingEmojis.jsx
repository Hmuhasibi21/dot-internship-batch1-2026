import { useMemo } from 'react';

const quizEmojis = ['💡', '🧠', '📚', '🎯', '🎮', '💻', '🌍', '🎨', '🎵', '⚽', '🏆', '🤔', '✨', '🚀', '🅰️', '🅱️', '✅', '🧩'];

const FallingEmojis = () => {
  const items = useMemo(() => {
    const count = 25; 
    return Array.from({ length: count }, (_, i) => {
      const randomEmoji = quizEmojis[Math.floor(Math.random() * quizEmojis.length)];
      const randomLeft = Math.floor(Math.random() * 100);
      const randomDuration = Math.floor(Math.random() * 20) + 15;
      const randomDelay = Math.floor(Math.random() * 15);
      const randomSize = (Math.random() * 1.5 + 0.8).toFixed(2);

      return {
        id: i,
        emoji: randomEmoji,
        style: {
          left: `${randomLeft}%`,
          animationDuration: `${randomDuration}s`,
          animationDelay: `${randomDelay}s`,
          fontSize: `${randomSize}rem`,
        },
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute top-[-5%] animate-falling opacity-0"
          style={item.style}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  );
};

export default FallingEmojis;