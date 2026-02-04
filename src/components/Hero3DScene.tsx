import { Float, Icosahedron, MeshDistortMaterial, Sphere, Torus } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';

function AnimatedIcosahedron({ position, color }: { position: [number, number, number]; color: string }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
            <Icosahedron ref={meshRef} args={[1, 1]} position={position} scale={0.8}>
                <MeshDistortMaterial
                    color={color}
                    distort={0.2}
                    speed={1.5}
                    roughness={0.2}
                    metalness={0.9}
                    transparent
                    opacity={0.8}
                />
            </Icosahedron>
        </Float>
    );
}

function AnimatedTorus({ position, color }: { position: [number, number, number]; color: string }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
            meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.8} floatIntensity={1}>
            <Torus ref={meshRef} args={[1, 0.4, 16, 32]} position={position} scale={0.6}>
                <MeshDistortMaterial
                    color={color}
                    distort={0.15}
                    speed={2}
                    roughness={0.3}
                    metalness={0.85}
                    transparent
                    opacity={0.75}
                />
            </Torus>
        </Float>
    );
}

function AnimatedSphere({ position, color }: { position: [number, number, number]; color: string }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
        }
    });

    return (
        <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
            <Sphere ref={meshRef} args={[0.8, 32, 32]} position={position}>
                <MeshDistortMaterial
                    color={color}
                    distort={0.4}
                    speed={3}
                    roughness={0.2}
                    metalness={0.9}
                    transparent
                    opacity={0.7}
                />
            </Sphere>
        </Float>
    );
}

function ParticleField() {
    const count = 80;
    const mesh = useRef<THREE.InstancedMesh>(null);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 20;
            const y = (Math.random() - 0.5) * 20;
            const z = (Math.random() - 0.5) * 10 - 5;
            const scale = Math.random() * 0.05 + 0.02;
            temp.push({ x, y, z, scale });
        }
        return temp;
    }, []);

    useFrame((state) => {
        if (mesh.current) {
            particles.forEach((particle, i) => {
                const matrix = new THREE.Matrix4();
                const y = particle.y + Math.sin(state.clock.elapsedTime * 0.3 + i) * 0.1;
                matrix.compose(
                    new THREE.Vector3(particle.x, y, particle.z),
                    new THREE.Quaternion(),
                    new THREE.Vector3(particle.scale, particle.scale, particle.scale)
                );
                mesh.current!.setMatrixAt(i, matrix);
            });
            mesh.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial color="#6366f1" transparent opacity={0.6} />
        </instancedMesh>
    );
}

function MouseFollower() {
    const { viewport } = useThree();
    const meshRef = useRef<THREE.Mesh>(null);
    const targetPosition = useRef(new THREE.Vector3(0, 0, 0));

    useFrame((state) => {
        if (meshRef.current) {
            const x = (state.pointer.x * viewport.width) / 2;
            const y = (state.pointer.y * viewport.height) / 2;
            targetPosition.current.set(x * 0.3, y * 0.3, 0);
            meshRef.current.position.lerp(targetPosition.current, 0.05);
            meshRef.current.rotation.x = y * 0.1;
            meshRef.current.rotation.y = x * 0.1;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 2]}>
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshBasicMaterial color="#a855f7" transparent opacity={0.4} />
        </mesh>
    );
}

function Scene() {
    return (
        <>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={0.8} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />
            <pointLight position={[10, 10, 10]} intensity={0.3} color="#a855f7" />

            <AnimatedIcosahedron position={[-4, 2, -3]} color="#6366f1" />
            <AnimatedTorus position={[4, -1, -4]} color="#a855f7" />
            <AnimatedSphere position={[-3, -2, -2]} color="#ec4899" />
            <AnimatedIcosahedron position={[3, 2.5, -5]} color="#06b6d4" />
            <AnimatedTorus position={[-5, 0, -6]} color="#8b5cf6" />
            <AnimatedSphere position={[5, -2, -3]} color="#f43f5e" />

            <ParticleField />
            <MouseFollower />
        </>
    );
}

function FallbackContent() {
    return (
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#6366f1" transparent opacity={0.3} />
        </mesh>
    );
}

export default function Hero3DScene() {
    return (
        <div className="absolute inset-0 -z-10 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 50 }}
                dpr={[1, 1.5]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance'
                }}
                style={{ background: 'transparent' }}
            >
                <Suspense fallback={<FallbackContent />}>
                    <Scene />
                </Suspense>
            </Canvas>
        </div>
    );
}
