import ASCIIText from "../components/ASCIIText.jsx";

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

export default function Hero() {
    return (
    <section className="hero">
      <ASCIIText
        text="Model-A"
        asciiFontSize={8}
        enableWaves={false}
      />
      </section>
  )
}