import Cubes from '../components/Cubes.jsx';

export default function CubesSection() {
  return (
    <section className="cubes-section">
      <div className="cubes-section__inner">
        <Cubes
          gridSize={16}
          rows={4}
          maxAngle={60}
          radius={4}
          cubeSize={30}
          borderStyle="2px dashed #FFF"
          faceColor="#1a1a2e"
          rippleColor="#ff6b6b"
          rippleSpeed={1.5}
          autoAnimate
          rippleOnClick
        />
      </div>
    </section>
  );
}
