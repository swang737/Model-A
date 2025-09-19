export default function Button({ children, variant='default', ...props }){
  const cls = variant === 'primary' ? 'button primary' : 'button'
  return <button className={cls} {...props}>{children}</button>
}
