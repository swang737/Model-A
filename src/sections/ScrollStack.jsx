import React, { useRef, useEffect } from 'react';

const cards = [
  { title: 'Card 1', content: 'Content for card 1' },
  { title: 'Card 2', content: 'Content for card 2' },
  { title: 'Card 3', content: 'Content for card 3' },
  // ...existing cards...
];

export default function ScrollStack() {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const scrollTop = container.scrollTop;
      const cardEls = container.querySelectorAll('.scroll-stack-card');
      cardEls.forEach((el, idx) => {
        // Animate each card based on scroll position
        const offset = Math.max(0, scrollTop - idx * 60);
        el.style.transform = `translateY(-${offset}px) scale(${1 - offset/1000})`;
        el.style.opacity = `${1 - offset/600}`;
      });
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      // Initial call to set transforms
      handleScroll();
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: '60vh',
        overflowY: 'auto',
        position: 'relative',
        padding: '2rem 0',
      }}
    >
      {cards.map((card, idx) => (
        <div
          key={card.title}
          className="scroll-stack-card"
          style={{
            position: 'relative',
            margin: '0 auto',
            width: '80%',
            background: 'white',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            borderRadius: '1rem',
            padding: '2rem',
            zIndex: cards.length - idx,
            transition: 'transform 0.3s, opacity 0.3s',
            willChange: 'transform, opacity',
            marginBottom: '-2rem', // helps cards overlap a bit
          }}
        >
          <h3>{card.title}</h3>
          <p>{card.content}</p>
        </div>
      ))}
    </div>
  );
}
