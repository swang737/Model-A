export const fadeUp = (delay=0) => ({
  from: { opacity: 0, y: 24 },
  to:   { opacity: 1, y: 0, delay }
})
