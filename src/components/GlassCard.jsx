export default function GlassCard({ title, desc, icon=null, children }){
  return (
    <div className="glass glass-hover" style={{padding: 20}}>
      {icon && <div style={{marginBottom: 10}}>{icon}</div>}
      {title && <h3 style={{margin: '0 0 8px'}}>{title}</h3>}
      {desc && <p style={{margin: 0, color: 'var(--muted)'}}>{desc}</p>}
      {children}
    </div>
  )
}
