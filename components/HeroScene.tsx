"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";

function Core() {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.12;
      ref.current.rotation.x += delta * 0.04;
    }
  });

  const points = [
    [-2.5, -1.2, 0],
    [-1.2, 0.4, 0.5],
    [0, -0.2, 0],
    [1.2, 1, -0.4],
    [2.5, 0.2, 0]
  ] as [number, number, number][];

  return (
    <group ref={ref}>
      <Float speed={1.5} rotationIntensity={0.35} floatIntensity={0.35}>
        <mesh>
          <icosahedronGeometry args={[1.25, 1]} />
          <meshStandardMaterial color="#0c120d" wireframe emissive="#8fd719" emissiveIntensity={0.5} />
        </mesh>
        <mesh scale={0.56}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#b6ff35" emissive="#b6ff35" emissiveIntensity={1.4} />
        </mesh>
      </Float>
      <Line points={points} color="#b6ff35" lineWidth={1} transparent opacity={0.35} />
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="hero-scene" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6], fov: 42 }} dpr={[1, 1.4]}>
        <ambientLight intensity={0.35} />
        <pointLight position={[3, 3, 3]} color="#b6ff35" intensity={12} />
        <Core />
      </Canvas>
    </div>
  );
}
