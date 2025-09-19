import Button from '../components/Button.jsx'

export default function CTA(){
  return (
    <section id="demo" style={{ marginTop: 40, display:'grid', placeItems:'center' }}>
      <div className="glass" style={{ padding: 24, width: 'min(800px, 92vw)', textAlign:'center' }}>
        <h2 style={{ margin: '0 0 10px' }}>Ready to try AlphaReg?</h2>
        <p style={{ color:'var(--muted)', margin: 0 }}>Book a 15‑minute walkthrough with our team.</p>
        <div style={{ marginTop: 16 }}>
          <a className="button primary" href="mailto:hello@alphareg.example">Book a demo</a>
        </div>
      </div>
    </section>
  )
}
