import { useEffect, useRef, useState } from 'react';
import DotGrid from '../components/DotGrid.jsx';

export default function DotsGridSection() {
  const titleRef = useRef(null);
  const hasScrambledRef = useRef(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const node = titleRef.current;
    if (!node) return undefined;

    const originalText = node.textContent || '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%&*';
    let rafId = null;

    const scramble = () => {
      let frame = 0;
      const tokens = originalText.split('');
      const totalSteps = Math.max(tokens.length * 1.5, 40);

      const update = () => {
        const progress = Math.min(frame / totalSteps, 1);
        const solidCount = Math.floor(progress * tokens.length);

        const output = tokens
          .map((char, index) => {
            if (char.trim() === '') return char;
            if (index < solidCount) return char;
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('');

        node.textContent = output;

        frame += 1;
        if (progress < 1) {
          rafId = requestAnimationFrame(update);
        } else {
          node.textContent = originalText;
        }
      };

      update();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting && !hasScrambledRef.current) {
          hasScrambledRef.current = true;
          scramble();
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      node.textContent = originalText;
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email) return;

    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/seanwang.sydney@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        throw new Error('Unable to send message.');
      }

      const result = await response.json();
      if (result.success !== 'true') {
        throw new Error('Unable to send message.');
      }

      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="dots-grid-section">
      <div className="dots-grid-section__inner">
        <DotGrid
          dotSize={10}
          gap={15}
          baseColor="#383838"
          activeColor="#FFFFFF"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
        <div className="dots-grid-section__overlay">
          <div className="dots-grid-section__content">
            <p className="dots-grid-section__eyebrow">Partner With Model-A</p>
            <h2 ref={titleRef} className="dots-grid-section__title">Optimize your business with us</h2>
            <p className="dots-grid-section__copy">
              Model-A turns your day-to-day business data into clear action plans. We flag the processes that slow
              your teams down, automate the repetitive work, and show you where the next gains are hiding.
              No extra dashboards—just faster execution and stronger performance.
            </p>
            <form className="dots-grid-section__form" onSubmit={handleSubmit}>
              <label className="dots-grid-section__label" htmlFor="cta-email">Drop your email</label>
              <div className="dots-grid-section__input-group">
                <input
                  id="cta-email"
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  className="dots-grid-section__input cursor-target"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  required
                />
                <button
                  type="submit"
                  className="dots-grid-section__button cursor-target"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending…' : 'Start the conversation'}
                </button>
              </div>
            </form>
            <div className="dots-grid-section__status" aria-live="polite">
              {status === 'success' && (
                <span className="dots-grid-section__status--success">Thanks! We&apos;ll reach out shortly.</span>
              )}
              {status === 'error' && (
                <span className="dots-grid-section__status--error">{errorMessage}</span>
              )}
            </div>
            <ul className="dots-grid-section__highlights">
              <li>Statistical analysis sprints</li>
              <li>Actionable insights, fast</li>
              <li>Global, battle-tested team</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
