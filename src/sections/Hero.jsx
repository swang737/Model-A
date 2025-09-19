import SplitText from '../components/SplitText.jsx'
import Button from '../components/Button.jsx'

export default function Hero(){
  return (
    <section className="hero">
      <div className="glass" style={{ padding: 28, width: 'min(920px, 92vw)' }}>
        <SplitText
          text="Price smarter. Grow faster."
          className="hero-title"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.2}
          textAlign="center"
        />
        <p style={{ textAlign: 'center', marginTop: 8 }}>
          AlphaReg helps SMBs optimize prices, bundles, and promos using clean analytics.
        </p>
        <div className="form-row" style={{ justifyContent: 'center', marginTop: 16 }}>
          <input className="inp" placeholder="Work email" type="email" />
          <Button variant="primary">Request a demo</Button>
        </div>
      </div>
    </section>
  )
}
