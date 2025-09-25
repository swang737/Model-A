import ASCIIText from "../components/ASCIIText.jsx";

export default function Hero() {
  const smoothScrollTo = (targetY, duration = 700) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime = null;

    const step = currentTime => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 0.5 - Math.cos(progress * Math.PI) / 2; // easeInOut
      window.scrollTo(0, startY + distance * eased);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  return (
    <section className="hero">
      <ASCIIText text="Model-A" asciiFontSize={8} enableWaves={false} />
      <button
        type="button"
        className="hero__scroll-hint cursor-target"
        aria-label="Scroll down"
        onClick={() => {
          smoothScrollTo(window.innerHeight * 0.95, 900);
        }}
      >
        <span className="hero__scroll-label">Scroll</span>
        <svg
          className="hero__scroll-arrow"
          width="16"
          height="32"
          viewBox="0 0 16 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 2v26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M3 22l5 7 5-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </section>
  );
}
