import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Tubes } from './brain-tubes.tsx';
import { BrainParticles } from './brain-particles.tsx';
import { data } from './data';

function createBrainCurvesFromPaths(): THREE.CatmullRomCurve3[] {
  const paths = data.economics[0].paths;

  const brainCurves: THREE.CatmullRomCurve3[] = [];
  paths.forEach(path => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < path.length; i += 3) {
      points.push(new THREE.Vector3(path[i], path[i + 1], path[i + 2]));
    }
    const tempCurve = new THREE.CatmullRomCurve3(points);
    brainCurves.push(tempCurve);
  });

  return brainCurves;
}

const curves = createBrainCurvesFromPaths();

function BrainScene() {
  const brainRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (brainRef.current) {
      brainRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={brainRef}>
      <Tubes curves={curves} />
      <BrainParticles curves={curves} />
    </group>
  );
}

function Brain() {
  return (
    <Canvas camera={{ position: [0, 0, 0.19], near: 0.05, far: 5 }}>
      <color attach="background" args={['rgb(22,14,39)']} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <BrainScene />
      <OrbitControls />
    </Canvas>
  );
}

export default Brain;
