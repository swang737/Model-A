import ScrollReveal from '../components/ScrollReveal.jsx';
import TextType from '../components/TextType.jsx';
import Squares from '../components/Squares.jsx';


export default function Intro() {
  return (
    <section className="intro">
        <div className="intro__squares">
            <Squares
                className="intro__squares"
                speed={0.5}
                squareSize={40}
                direction='diagonal'
                borderColor='#242424'
                hoverFillColor='#242424'
            />
        </div>
      <div className="intro__content">
        <TextType
          text={[
            "Model‑A turns raw data into insights you can act on.",
            "We make complex models simple, interpretable, and ready for real-world decisions."
          ]}
          variableSpeed={{ min: 20, max: 40 }}
          pauseDuration={3000}
          initialDelay={20}
          startOnVisible={true}
          showCursor={true}
          cursorCharacter="_"
        />
      </div>
    </section>
  )
}
