import LogoLoopComponent from '../components/LogoLoop.jsx';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

// Alternative with image sources
const imageLogos = [

];

export default function LogoLoop() {
    return (
    <div style={{ height: '200px', position: 'relative', overflow: 'hidden', width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
      <LogoLoopComponent
        logos={techLogos}
        speed={120}
        direction="left"
        logoHeight={100}
        gap={50}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#181818"
        ariaLabel="Technology partners"
      />
    </div>
  );
}
