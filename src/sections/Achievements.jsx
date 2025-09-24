import React, { useEffect, useRef } from 'react';

const achievements = [
  {
    year: '2025',
    title: 'IMC x Allianz Datathon Finalist',
    summary: 'Modelled Ski Session data in 12 resorts to predict best week and location for ski goers',
    metric: 'Top 3 NSW',
  },
  {
    year: '2025',
    title: 'Atlassian Datathon Finalist',
    summary: 'Analysed churn and expansion data to provide reccomendations to optimise Atlassian operations',
    metric: 'Top 6 NSW',
  }
];

export default function Achievements() {
  const itemsRef = useRef([]);

  useEffect(() => {
    const items = itemsRef.current;
    if (!items.length) return;

    let animationFrame = null;

    const updateStyles = () => {
      const viewportHeight = window.innerHeight || 1;
      const viewportCenter = viewportHeight * 0.5;

      items.forEach((item) => {
        if (!item) return;
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(viewportCenter - itemCenter);
        const normalized = Math.min(distanceFromCenter / (viewportHeight * 0.6), 1);
        const emphasis = Math.max(0, 1 - normalized);
        const accent = Math.pow(emphasis, 0.7);
        const scale = 1 + accent * 0.12;
        const direction = itemCenter < viewportCenter ? -1 : 1;
        const translate = direction * Math.pow(normalized, 0.75) * 6;
        const opacity = 0.55 + accent * 0.35;
        item.style.setProperty('--item-scale', scale.toFixed(3));
        item.style.setProperty('--item-translate', `${translate.toFixed(2)}px`);
        item.style.setProperty('--item-opacity', opacity.toFixed(3));
        item.style.zIndex = `${Math.round((1 - normalized) * 10)}`;
      });
    };

    const scheduleUpdate = () => {
      if (animationFrame !== null) return;
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = null;
        updateStyles();
      });
    };

    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <section className="achievements">
      <div className="achievements__radial" aria-hidden="true" />
      <div className="achievements__inner">
        <p className="achievements__eyebrow">Portfolio</p>
        <h2 className="achievements__title">Take a look at our<br/>
          <span className="achievements__gradient"> past projects</span>
        </h2>
        <p className="achievements__lead"></p>
        <div className="achievements__list">
          {achievements.map((achievement, index) => (
            <article
              key={achievement.year}
              className="achievement-item"
              ref={(node) => {
                itemsRef.current[index] = node;
              }}
              style={{
                '--item-scale': 0.98,
                '--item-translate': '0px',
                '--item-opacity': 0.8,
              }}
            >
              <span className="achievement-item__year">{achievement.year}</span>
              <div className="achievement-item__content">
                <h3>{achievement.title}</h3>
                <p>{achievement.summary}</p>
                <span className="achievement-item__metric">{achievement.metric}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
