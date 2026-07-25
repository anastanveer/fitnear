"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------
   Stylized city grid — instanced blocks forming a "map" of the city.
   Deterministic (no Math.random at module scope issues) pseudo-random.
------------------------------------------------------------------- */

function mulberry(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const GRID = 9;
const SPACING = 1.15;

function CityBlocks() {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const { matrices, colors } = useMemo(() => {
    const rand = mulberry(42);
    const temp = new THREE.Object3D();
    const matrices: THREE.Matrix4[] = [];
    const colors: THREE.Color[] = [];
    const base = new THREE.Color("#161b18");
    const accent = new THREE.Color("#c2f22a");

    for (let x = 0; x < GRID; x++) {
      for (let z = 0; z < GRID; z++) {
        const cx = (x - (GRID - 1) / 2) * SPACING;
        const cz = (z - (GRID - 1) / 2) * SPACING;
        const dist = Math.sqrt(cx * cx + cz * cz);
        const h = 0.3 + rand() * (2.6 - dist * 0.12) + Math.max(0, 1.4 - dist * 0.2);
        const height = Math.max(0.25, h);
        temp.position.set(cx, height / 2 - 0.4, cz);
        temp.scale.set(0.7, height, 0.7);
        temp.updateMatrix();
        matrices.push(temp.matrix.clone());
        const isAccent = rand() > 0.9;
        colors.push(isAccent ? accent.clone() : base.clone().offsetHSL(0, 0, (rand() - 0.5) * 0.04));
      }
    }
    return { matrices, colors };
  }, []);

  useMemo(() => {
    if (!meshRef.current) return;
  }, []);

  return (
    <instancedMesh
      ref={(node) => {
        if (!node) return;
        meshRef.current = node;
        matrices.forEach((m, i) => node.setMatrixAt(i, m));
        colors.forEach((c, i) => node.setColorAt(i, c));
        node.instanceMatrix.needsUpdate = true;
        if (node.instanceColor) node.instanceColor.needsUpdate = true;
      }}
      args={[undefined, undefined, GRID * GRID]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial roughness={0.55} metalness={0.15} />
    </instancedMesh>
  );
}

function Pin({
  position,
  color = "#c2f22a",
  delay = 0,
}: {
  position: [number, number, number];
  color?: string;
  delay?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime + delay;
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(t * 1.4) * 0.12;
    }
    if (ringRef.current) {
      const s = 1 + ((t * 0.6) % 1) * 1.8;
      ringRef.current.scale.set(s, s, s);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, 0.6 - ((t * 0.6) % 1) * 0.6);
    }
  });

  return (
    <group position={position}>
      {/* pulsing ground ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.38, 0]}>
        <ringGeometry args={[0.28, 0.34, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
      {/* pin */}
      <group ref={ref}>
        <mesh position={[0, 0.34, 0]}>
          <sphereGeometry args={[0.16, 24, 24]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1.6}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0, 0.05, 0]}>
          <coneGeometry args={[0.13, 0.42, 24]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.6}
            roughness={0.4}
          />
        </mesh>
      </group>
    </group>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    // Gentle, bounded parallax that follows the pointer and settles back to
    // centre when the mouse is still. No continuous auto-spin — feels premium.
    const { x, y } = state.pointer; // -1..1
    const targetY = x * 0.22;
    const targetX = y * 0.08;
    const d = Math.min(delta, 0.05); // clamp for stability on frame spikes
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      targetY,
      2.5,
      d,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      targetX,
      2.5,
      d,
    );
  });
  return <group ref={group}>{children}</group>;
}

const pins: { pos: [number, number, number]; delay: number }[] = [
  { pos: [-2.2, 2.4, -1.4], delay: 0 },
  { pos: [2.6, 2.0, 1.2], delay: 0.8 },
  { pos: [0.2, 2.9, 2.6], delay: 1.6 },
  { pos: [-3.0, 1.8, 2.2], delay: 2.2 },
  { pos: [3.4, 2.2, -2.4], delay: 1.1 },
];

export function CityScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      shadows
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 5.2, 8.5], fov: 42 }}
      frameloop="always"
    >
      <color attach="background" args={["#0b0d0b"]} />
      <fog attach="fog" args={["#0b0d0b", 10, 20]} />

      {/* Self-contained lighting — no external HDR/Environment fetch, so the
          scene never blanks out if a CDN request is blocked. */}
      <hemisphereLight args={["#dfe9d0", "#0a0c0a", 0.7]} />
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[6, 10, 4]}
        intensity={1.7}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-5, 6, -2]} intensity={0.5} color="#c2f22a" />
      <pointLight position={[-4, 3, -4]} intensity={22} color="#c2f22a" distance={16} />
      <pointLight position={[3, 4, 3]} intensity={10} color="#eaffb0" distance={14} />

      <Rig>
        <group rotation={[-0.35, 0.3, 0]}>
          <CityBlocks />
          {pins.map((p, i) => (
            <Float key={i} speed={2} rotationIntensity={0} floatIntensity={0.6}>
              <Pin position={p.pos} delay={p.delay} />
            </Float>
          ))}
          {/* ground */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.42, 0]} receiveShadow>
            <planeGeometry args={[26, 26]} />
            <meshStandardMaterial color="#0e120f" roughness={1} />
          </mesh>
        </group>
      </Rig>
    </Canvas>
  );
}

export default CityScene;
