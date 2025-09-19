import GlassCard from '../components/GlassCard.jsx'

export default function Solutions(){
  return (
    <section style={{ paddingTop: 20 }}>
      <h1>Solutions</h1>
      <div className="grid cols-3" style={{ marginTop: 16 }}>
        <GlassCard title="Retail" desc="Markdown optimization and promo planning."/>
        <GlassCard title="SaaS" desc="Seat pricing and discount guardrails."/>
        <GlassCard title="Services" desc="Quote intelligence and margin protection."/>
      </div>
    </section>
  )
}
