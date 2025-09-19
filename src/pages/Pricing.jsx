import GlassCard from '../components/GlassCard.jsx'
import Button from '../components/Button.jsx'

export default function Pricing(){
  return (
    <section style={{ paddingTop: 20 }}>
      <h1>Pricing</h1>
      <div className="grid cols-3" style={{ marginTop: 16 }}>
        <GlassCard title="Starter" desc="$29/mo for up to 1k orders">
          <div style={{ marginTop: 12 }}><Button variant="primary">Choose Starter</Button></div>
        </GlassCard>
        <GlassCard title="Growth" desc="$79/mo for up to 10k orders">
          <div style={{ marginTop: 12 }}><Button variant="primary">Choose Growth</Button></div>
        </GlassCard>
        <GlassCard title="Scale" desc="Contact us for higher volume">
          <div style={{ marginTop: 12 }}><Button variant="primary">Talk to Sales</Button></div>
        </GlassCard>
      </div>
    </section>
  )
}
