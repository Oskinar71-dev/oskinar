import { useEffect, useRef, useState } from 'react'

interface Props {
  words: string[]
  className?: string
}

export default function AnimatedText({ words, className = '' }: Props) {
  const [index, setIndex]     = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const cycle = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(i => (i + 1) % words.length)
        setVisible(true)
      }, 400)
    }, 2800)

    return () => clearInterval(cycle)
  }, [words.length])

  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
      }}
    >
      {words[index]}
    </span>
  )
}
