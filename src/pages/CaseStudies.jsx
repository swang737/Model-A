import GlassCard from '../components/GlassCard.jsx'

export default function CaseStudies(){
  return (
    <section style={{ paddingTop: 20 }}>
      <h1>Case Studies</h1>
      <div className="grid cols-3" style={{ marginTop: 16 }}>
        <GlassCard title="Local Retailer" desc="+7% gross margin in 6 weeks"/>
        <GlassCard title="B2B SaaS" desc="-18% involuntary churn via price ladders"/>
        <GlassCard title="DTC Brand" desc="+12% AOV through smarter bundles"/>
      </div>
    </section>
  )
}
