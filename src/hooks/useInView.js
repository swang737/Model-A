import { useEffect, useRef, useState } from 'react'

export default function useInView({ threshold = 0.2, rootMargin = '0px' } = {}){
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if(!el) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => setInView(e.isIntersecting))
    }, { threshold, rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, rootMargin])
  return { ref, inView }
}
