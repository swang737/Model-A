import Hero from '../sections/Hero.jsx'
import Features from '../sections/Features.jsx'
import CTA from '../sections/CTA.jsx'
import Intro from '../sections/Intro.jsx'
import LogoLoop from '../sections/LogoLoop.jsx'
import Achievements from '../sections/Achievements.jsx'
import DotsGridSection from '../sections/DotsGridSection.jsx'

export default function Home(){
  return (<>
    <Hero />
    <Intro />
    <LogoLoop />
    <Achievements />
    <DotsGridSection />
  </>)
}
