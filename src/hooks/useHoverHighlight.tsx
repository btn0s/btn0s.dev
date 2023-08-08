import { useEffect, useState, RefObject, useRef } from 'react'

const DEFAULT_OPACITY = '0.5'

type Position = {
  x: number
  y: number
}

const isLightColor = (color: string): boolean => {
  color = color.charAt(0) === '#' ? color.slice(1) : color

  const r = parseInt(color.substr(0, 2), 16)
  const g = parseInt(color.substr(2, 2), 16)
  const b = parseInt(color.substr(4, 2), 16)

  const avg = (r + g + b) / 3
  return avg > 128
}

const useHoverHighlight = (ref: RefObject<HTMLElement>) => {
  const [isSetup, setIsSetup] = useState(false)
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [gradientColor, setGradientColor] = useState('')
  const gradientDivRef = useRef<HTMLDivElement | null>(null)

  const setup = () => {
    if (ref.current) {
      const node = ref.current
      const bgColor = getComputedStyle(node).backgroundColor
      const alteredColor = isLightColor(bgColor) ? '#666' : '#eee'
      setGradientColor(alteredColor)

      node.style.position = 'relative'

      const gradientDiv = document.createElement('div')

      gradientDiv.style.position = 'absolute'
      gradientDiv.style.zIndex = '1'
      gradientDiv.style.inset = '0'
      gradientDiv.style.opacity = DEFAULT_OPACITY
      gradientDiv.style.transition = 'opacity 300ms ease-in-out'
      gradientDiv.style.mixBlendMode = 'overlay'

      gradientDivRef.current = gradientDiv

      node.appendChild(gradientDiv)
      setIsSetup(true)
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        if (gradientDivRef.current) {
          const rect = ref.current.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          setPosition({ x, y })
          gradientDivRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, ${gradientColor}, transparent)`
        }
      }
    }

    const handleMouseEnter = (e: MouseEvent) => {
      if (ref.current && gradientDivRef.current) {
        gradientDivRef.current.style.opacity = DEFAULT_OPACITY

        if (gradientDivRef.current) {
          const rect = ref.current.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          setPosition({ x, y })
          gradientDivRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, ${gradientColor}, transparent)`
        }
      }
    }

    const handleMouseLeave = () => {
      if (ref.current && gradientDivRef.current) {
        gradientDivRef.current.style.opacity = '0'
      }
    }

    const node = ref.current
    if (node) {
      if (!isSetup) setup()

      node.addEventListener('mouseenter', handleMouseEnter)
      node.addEventListener('mouseleave', handleMouseLeave)
      node.addEventListener('mousemove', handleMouseMove)

      return () => {
        node.removeEventListener('mouseenter', handleMouseEnter)
        node.removeEventListener('mouseleave', handleMouseLeave)
        node.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [position, ref])
}

export default useHoverHighlight
