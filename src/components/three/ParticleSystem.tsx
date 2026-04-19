import { useEffect, useRef, useState } from 'react'

interface Props {
  count?: number
  color?: string
  size?: number
  speed?: number
}

export default function ParticleSystem({
  count = 120,
  color = '#FF5757',
  size = 0.025,
  speed = 0.0002,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [three, setThree] = useState<typeof import('three') | null>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const connection = (navigator as any).connection
    const isSlowNetwork = connection?.effectiveType === '2g' || connection?.saveData

    if (prefersReduced || isSlowNetwork) return

    let cancelled = false
    import('three').then((THREE) => {
      if (!cancelled) setThree(THREE)
    })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (!three || !canvasRef.current) return

    const canvas = canvasRef.current
    const renderer = new three.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    })

    const scene = new three.Scene()
    const camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.z = 3

    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10
    }

    const geometry = new three.BufferGeometry()
    geometry.setAttribute('position', new three.BufferAttribute(positions, 3))

    const material = new three.PointsMaterial({
      size,
      color,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    })

    const particles = new three.Points(geometry, material)
    scene.add(particles)

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

    let animId: number
    const animate = () => {
      animId = requestAnimationFrame(animate)
      particles.rotation.y += speed
      particles.rotation.x += speed * 0.4
      renderer.render(scene, camera)
    }
    animate()

    let resizeTimer: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }, 100)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [three, count, color, size, speed])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: three ? 1 : 0,
        transition: 'opacity 1.5s ease',
      }}
    />
  )
}
