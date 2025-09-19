import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function SplitText({
  text = '',
  className = '',
  delay = 0,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'left',
  onLetterAnimationComplete = () => {}
}){
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if(!el) return
    const chars = Array.from(text)
    el.innerHTML = ''
    chars.forEach((c) => {
      const span = document.createElement('span')
      span.textContent = c
      span.style.display = 'inline-block'
      el.appendChild(span)
    })

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const q = gsap.utils.selector(el)
          const targets = q('span')
          gsap.fromTo(targets, from, {
            ...to,
            ease,
            stagger: 0.03,
            duration,
            delay: delay/1000,
            onComplete: onLetterAnimationComplete
          })
          observer.disconnect()
        }
      })
    }, { threshold, rootMargin })

    observer.observe(el)
    return () => observer.disconnect()
  }, [text, delay, duration, ease, from, to, threshold, rootMargin, onLetterAnimationComplete])

  return <div ref={ref} className={className} style={{ textAlign }} aria-label={text}></div>
}
