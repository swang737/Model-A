import ASCIIText from "../components/ASCIIText.jsx";

export default function Hero() {
  return (
    <section className="hero">
      <ASCIIText text="Model-A" asciiFontSize={8} enableWaves={false} />
      <div className="hero__scroll-hint" aria-hidden="true">
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
      </div>
    </section>
  );
}
