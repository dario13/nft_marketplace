import React from 'react'
import { Canvas } from '@react-three/fiber'
import Icosahedron from '@/components/atoms/primitives/icons/icosahedron'
import { FlexBox } from '../primitives'

const IcosahedronAnimated = () => {
  return (
    <FlexBox width="100vw" height="100vh">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Icosahedron size={2} />
      </Canvas>
    </FlexBox>
  )
}

IcosahedronAnimated.displayName = 'IcosahedronAnimated'

export { IcosahedronAnimated }
