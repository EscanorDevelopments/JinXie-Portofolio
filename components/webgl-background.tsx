"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import type * as THREE from "three"

function Particles({ count = 2000 }) {
  const mesh = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      temp[i3] = (Math.random() - 0.5) * 20
      temp[i3 + 1] = (Math.random() - 0.5) * 20
      temp[i3 + 2] = (Math.random() - 0.5) * 20
    }
    return temp
  }, [count])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1
      mesh.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.05
    }
  })

  return (
    <Points ref={mesh} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#dc2626" size={0.02} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
    </Points>
  )
}

function FloatingGeometry() {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.5
    }
  })

  return (
    <group ref={meshRef}>
      {[...Array(8)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 8) * Math.PI * 2) * 3,
            Math.sin((i / 8) * Math.PI * 2) * 0.5,
            Math.sin((i / 8) * Math.PI * 2) * 3,
          ]}
        >
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshBasicMaterial color="#dc2626" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  )
}

function WaveGrid() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position
      const time = state.clock.elapsedTime

      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i)
        const z = positions.getZ(i)
        const wave = Math.sin(x * 0.5 + time) * Math.sin(z * 0.5 + time) * 0.3
        positions.setY(i, wave)
      }
      positions.needsUpdate = true
    }
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
      <planeGeometry args={[20, 20, 50, 50]} />
      <meshBasicMaterial color="#dc2626" wireframe transparent opacity={0.1} />
    </mesh>
  )
}

export default function WebGLBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: false, alpha: true }} dpr={[1, 1.5]}>
        <Particles />
        <FloatingGeometry />
        <WaveGrid />
      </Canvas>
    </div>
  )
}
