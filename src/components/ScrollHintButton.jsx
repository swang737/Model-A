import { useCallback } from 'react';

function smoothScrollTo(targetY, duration) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  let startTime = null;

  const step = currentTime => {
    if (startTime === null) startTime = currentTime;
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const eased = 0.5 - Math.cos(progress * Math.PI) / 2;
    window.scrollTo(0, startY + distance * eased);
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
}

export default function ScrollHintButton({
  className = '',
  label = 'Scroll',
  offsetMultiplier = 0.85,
  duration = 800,
  scrollBy
}) {
  const handleClick = useCallback(() => {
    if (typeof window === 'undefined') return;
    const viewportHeight = window.innerHeight || 0;
    const offset = scrollBy !== undefined ? scrollBy : viewportHeight * offsetMultiplier;
    smoothScrollTo(window.scrollY + offset, duration);
  }, [offsetMultiplier, duration, scrollBy]);

  const classes = ['scroll-hint', 'cursor-target', className].filter(Boolean).join(' ');

  return (
    <button type="button" className={classes} aria-label={label} onClick={handleClick}>
      <span className="scroll-hint__label">{label}</span>
      <svg
        className="scroll-hint__arrow"
        width="16"
        height="32"
        viewBox="0 0 16 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M8 2v26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M3 22l5 7 5-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
