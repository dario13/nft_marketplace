// Icosahedron.tsx
import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { IcosahedronGeometry as IcosahedronShape, Color, ColorRepresentation } from 'three'
import { useTheme } from '@/hooks/use-theme'

interface IcosahedronProps {
  size: number
  color?: ColorRepresentation
  startColor?: ColorRepresentation
  endColor?: ColorRepresentation
}

const Icosahedron: React.FC<IcosahedronProps> = ({
  size,
  color = 'gold',
  startColor = 'gold',
  endColor = 'darkgoldenrod',
}) => {
  const mesh = useRef<THREE.Mesh>(null)
  const material = useRef<THREE.MeshStandardMaterial>(null)
  const [hovered, setHover] = React.useState(false)
  const [colorPhase, setColorPhase] = React.useState(0)
  const { theme } = useTheme()

  if (theme === 'bumblebee') {
    startColor = 'whitesmoke'
    endColor = 'darkgoldenrod'
  } else if (theme === 'luxury') {
    startColor = 'black'
    endColor = 'darkgoldenrod'
  }

  useFrame(() => {
    if (!mesh.current || !material.current) return

    const rotationSpeed = hovered ? 0.03 : 0.01
    mesh.current.rotation.y += rotationSpeed

    // Update colorPhase for the fade animation
    setColorPhase((colorPhase + 0.01) % (2 * Math.PI))

    // Interpolate between startColor and endColor
    const colorValue = (Math.sin(colorPhase) + 1) / 2
    const currentColor = new Color().lerpColors(
      new Color(startColor),
      new Color(endColor),
      colorValue,
    )

    // Update the material color
    material.current.color = currentColor
  })

  const handlePointerOver = () => setHover(true)
  const handlePointerOut = () => setHover(false)

  return (
    <mesh ref={mesh} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
      <icosahedronGeometry args={[size]} />
      <meshStandardMaterial ref={material} color={color} />
      <lineSegments>
        <edgesGeometry attach="geometry" args={[new IcosahedronShape(size)]} />
        <lineBasicMaterial attach="material" color="black" />
      </lineSegments>
    </mesh>
  )
}

export default Icosahedron
