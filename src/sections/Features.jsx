import GlassCard from '../components/GlassCard.jsx'

export default function Features(){
  return (
    <section style={{ marginTop: 28 }}>
      <div className="grid cols-3">
        <GlassCard title="Demand curves in minutes" desc="Upload sales history and get elasticities, price ladders and upgrade paths." />
        <GlassCard title="Always‑on experiments" desc="Run safe price tests with guardrails and roll out winners automatically." />
        <GlassCard title="Private by design" desc="Encrypted at rest and in transit with basic RBAC and audit trails." />
      </div>
    </section>
  )
}
