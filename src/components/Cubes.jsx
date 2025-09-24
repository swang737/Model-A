import { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/Cubes.css';

const Cubes = ({
  gridSize = 10,
  columns,
  rows,
  cubeSize,
  maxAngle = 45,
  radius = 3,
  easing = 'power3.out',
  duration = { enter: 0.3, leave: 0.6 },
  cellGap,
  borderStyle = '1px solid #fff',
  faceColor = '#060010',
  shadow = false,
  autoAnimate = true,
  rippleOnClick = true,
  rippleColor = '#fff',
  rippleSpeed = 2
}) => {
  const totalCols = Number.isFinite(columns) ? Number(columns) : gridSize;
  const totalRows = Number.isFinite(rows) ? Number(rows) : gridSize;

  const sceneRef = useRef(null);
  const rafRef = useRef(null);
  const idleTimerRef = useRef(null);
  const userActiveRef = useRef(false);
  const simPosRef = useRef({ x: 0, y: 0 });
  const simTargetRef = useRef({ x: 0, y: 0 });
  const simRAFRef = useRef(null);

  const colGap = typeof cellGap === 'number' ? `${cellGap}px` : cellGap?.col !== undefined ? `${cellGap.col}px` : '5%';
  const rowGap = typeof cellGap === 'number' ? `${cellGap}px` : cellGap?.row !== undefined ? `${cellGap.row}px` : '5%';

  const enterDur = duration.enter;
  const leaveDur = duration.leave;

  const getGridMetrics = useCallback(() => {
    if (!sceneRef.current) return null;
    const rect = sceneRef.current.getBoundingClientRect();
    const styles = window.getComputedStyle(sceneRef.current);
    const gapX = parseFloat(styles.columnGap) || 0;
    const gapY = parseFloat(styles.rowGap) || 0;
    const effectiveWidth = rect.width - gapX * (totalCols - 1);
    const effectiveHeight = rect.height - gapY * (totalRows - 1);
    const cellW = effectiveWidth / totalCols;
    const cellH = effectiveHeight / totalRows;
    return { rect, gapX, gapY, cellW, cellH };
  }, [totalCols, totalRows]);

  const deriveCenters = useCallback(
    (clientX, clientY) => {
      const metrics = getGridMetrics();
      if (!metrics) return null;
      const { rect, gapX, gapY, cellW, cellH } = metrics;
      const localX = clientX - rect.left;
      const localY = clientY - rect.top;
      const spanX = cellW + gapX;
      const spanY = cellH + gapY;
      const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
      const colCenter = clamp((localX - gapX * 0.5) / spanX, -0.5, totalCols - 0.5);
      const rowCenter = clamp((localY - gapY * 0.5) / spanY, -0.5, totalRows - 0.5);
      return { rowCenter, colCenter, metrics };
    },
    [getGridMetrics, totalCols, totalRows]
  );

  const tiltAt = useCallback(
    (rowCenter, colCenter) => {
      if (!sceneRef.current) return;
      sceneRef.current.querySelectorAll('.cube').forEach(cube => {
        const r = +cube.dataset.row;
        const c = +cube.dataset.col;
        const dist = Math.hypot(r - rowCenter, c - colCenter);
        if (dist <= radius) {
          const pct = 1 - dist / radius;
          const angle = pct * maxAngle;
          gsap.to(cube, {
            duration: enterDur,
            ease: easing,
            overwrite: true,
            rotateX: -angle,
            rotateY: angle
          });
        } else {
          gsap.to(cube, {
            duration: leaveDur,
            ease: 'power3.out',
            overwrite: true,
            rotateX: 0,
            rotateY: 0
          });
        }
      });
    },
    [radius, maxAngle, enterDur, leaveDur, easing]
  );

  const onPointerMove = useCallback(
    e => {
      userActiveRef.current = true;
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      const centers = deriveCenters(e.clientX, e.clientY);
      if (!centers) return;
      const { rowCenter, colCenter } = centers;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => tiltAt(rowCenter, colCenter));

      idleTimerRef.current = setTimeout(() => {
        userActiveRef.current = false;
      }, 3000);
    },
    [deriveCenters, tiltAt]
  );

  const resetAll = useCallback(() => {
    if (!sceneRef.current) return;
    sceneRef.current.querySelectorAll('.cube').forEach(cube =>
      gsap.to(cube, {
        duration: leaveDur,
        rotateX: 0,
        rotateY: 0,
        ease: 'power3.out'
      })
    );
  }, [leaveDur]);

  const onTouchMove = useCallback(
    e => {
      e.preventDefault();
      userActiveRef.current = true;
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

      const touch = e.touches[0];
      const centers = deriveCenters(touch.clientX, touch.clientY);
      if (!centers) return;
      const { rowCenter, colCenter } = centers;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => tiltAt(rowCenter, colCenter));

      idleTimerRef.current = setTimeout(() => {
        userActiveRef.current = false;
      }, 3000);
    },
    [deriveCenters, tiltAt]
  );

  const onTouchStart = useCallback(() => {
    userActiveRef.current = true;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!sceneRef.current) return;
    resetAll();
  }, [resetAll]);

  const onClick = useCallback(
    e => {
      if (!rippleOnClick || !sceneRef.current) return;
      const metrics = getGridMetrics();
      if (!metrics) return;
      const { rect, gapX, gapY, cellW, cellH } = metrics;
      const spanX = cellW + gapX;
      const spanY = cellH + gapY;
      const clampIndex = (val, max) => Math.max(0, Math.min(max, val));

      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      if (clientX == null || clientY == null) return;

      const localX = clientX - rect.left;
      const localY = clientY - rect.top;

      const colFloat = (localX - gapX * 0.5) / spanX;
      const rowFloat = (localY - gapY * 0.5) / spanY;
      const colHit = clampIndex(Math.round(colFloat - 0.5), totalCols - 1);
      const rowHit = clampIndex(Math.round(rowFloat - 0.5), totalRows - 1);

      const baseRingDelay = 0.15;
      const baseAnimDur = 0.3;
      const baseHold = 0.6;

      const spreadDelay = baseRingDelay / rippleSpeed;
      const animDuration = baseAnimDur / rippleSpeed;
      const holdTime = baseHold / rippleSpeed;

      const rings = {};
      sceneRef.current.querySelectorAll('.cube').forEach(cube => {
        const r = +cube.dataset.row;
        const c = +cube.dataset.col;
        const dist = Math.hypot(r - rowHit, c - colHit);
        const ring = Math.round(dist);
        if (!rings[ring]) rings[ring] = [];
        rings[ring].push(cube);
      });

      Object.keys(rings)
        .map(Number)
        .sort((a, b) => a - b)
        .forEach(ring => {
          const delay = ring * spreadDelay;
          const faces = rings[ring].flatMap(cube => Array.from(cube.querySelectorAll('.cube-face')));

          gsap.to(faces, {
            backgroundColor: rippleColor,
            duration: animDuration,
            delay,
            ease: 'power3.out'
          });
          gsap.to(faces, {
            backgroundColor: faceColor,
            duration: animDuration,
            delay: delay + animDuration + holdTime,
            ease: 'power3.out'
          });
        });
    },
    [getGridMetrics, rippleOnClick, totalCols, totalRows, faceColor, rippleColor, rippleSpeed]
  );

  useEffect(() => {
    if (!autoAnimate || !sceneRef.current) return;
    simPosRef.current = {
      x: Math.random() * totalCols,
      y: Math.random() * totalRows
    };
    simTargetRef.current = {
      x: Math.random() * totalCols,
      y: Math.random() * totalRows
    };
    const speed = 0.02;
    const loop = () => {
      if (!userActiveRef.current) {
        const pos = simPosRef.current;
        const tgt = simTargetRef.current;
        pos.x += (tgt.x - pos.x) * speed;
        pos.y += (tgt.y - pos.y) * speed;
        tiltAt(pos.y, pos.x);
        if (Math.hypot(pos.x - tgt.x, pos.y - tgt.y) < 0.1) {
          simTargetRef.current = {
            x: Math.random() * totalCols,
            y: Math.random() * totalRows
          };
        }
      }
      simRAFRef.current = requestAnimationFrame(loop);
    };
    simRAFRef.current = requestAnimationFrame(loop);
    return () => {
      if (simRAFRef.current != null) {
        cancelAnimationFrame(simRAFRef.current);
      }
    };
  }, [autoAnimate, totalCols, totalRows, tiltAt]);

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;

    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerleave', resetAll);
    el.addEventListener('click', onClick);

    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerleave', resetAll);
      el.removeEventListener('click', onClick);

      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);

      rafRef.current != null && cancelAnimationFrame(rafRef.current);
      idleTimerRef.current && clearTimeout(idleTimerRef.current);
    };
  }, [onPointerMove, resetAll, onClick, onTouchMove, onTouchStart, onTouchEnd]);

  const rowIndices = Array.from({ length: totalRows });
  const colIndices = Array.from({ length: totalCols });
  const sceneStyle = {
    gridTemplateColumns: cubeSize ? `repeat(${totalCols}, ${cubeSize}px)` : `repeat(${totalCols}, 1fr)`,
    gridTemplateRows: cubeSize ? `repeat(${totalRows}, ${cubeSize}px)` : `repeat(${totalRows}, 1fr)`,
    columnGap: colGap,
    rowGap: rowGap
  };
  const wrapperStyle = {
    '--cube-face-border': borderStyle,
    '--cube-face-bg': faceColor,
    '--cube-face-shadow': shadow === true ? '0 0 6px rgba(0,0,0,.5)' : shadow || 'none',
    ...(cubeSize
      ? {
          width: `${totalCols * cubeSize}px`,
          height: `${totalRows * cubeSize}px`
        }
      : {})
  };

  return (
    <div className="default-animation" style={wrapperStyle}>
      <div ref={sceneRef} className="default-animation--scene" style={sceneStyle}>
        {rowIndices.map((_, r) =>
          colIndices.map((__, c) => (
            <div key={`${r}-${c}`} className="cube" data-row={r} data-col={c}>
              <div className="cube-face cube-face--top" />
              <div className="cube-face cube-face--bottom" />
              <div className="cube-face cube-face--left" />
              <div className="cube-face cube-face--right" />
              <div className="cube-face cube-face--front" />
              <div className="cube-face cube-face--back" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cubes;
