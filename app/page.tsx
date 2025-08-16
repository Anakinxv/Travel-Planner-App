"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Sphere,
  MeshDistortMaterial,
  Text,
  Environment,
} from "@react-three/drei";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Plane,
  Compass,
  LuggageIcon as Suitcase,
} from "lucide-react";
import type * as THREE from "three";

function AnimatedGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#0891b2"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

function FloatingIcon({
  position,
  children,
  delay = 0,
}: {
  position: [number, number, number];
  children: React.ReactNode;
  delay?: number;
}) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime + delay) * 0.2;
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {children}
    </group>
  );
}

export default function TravelPlannerHero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-primary/5 relative overflow-hidden">
      {/* 3D Background Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight
            position={[-10, -10, -10]}
            intensity={0.5}
            color="#1e3a8a"
          />

          <AnimatedGlobe />

          <FloatingIcon position={[-4, 2, 1]} delay={0}>
            <Text
              fontSize={0.5}
              color="#1e3a8a"
              anchorX="center"
              anchorY="middle"
            >
              ✈️
            </Text>
          </FloatingIcon>

          <FloatingIcon position={[4, -1, 2]} delay={1}>
            <Text
              fontSize={0.4}
              color="#0891b2"
              anchorX="center"
              anchorY="middle"
            >
              🧳
            </Text>
          </FloatingIcon>

          <FloatingIcon position={[-3, -2, 1.5]} delay={2}>
            <Text
              fontSize={0.3}
              color="#1e3a8a"
              anchorX="center"
              anchorY="middle"
            >
              🧭
            </Text>
          </FloatingIcon>

          <Environment preset="sunset" />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Text */}
          <div className="mb-12 space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Planea tu{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                viaje perfecto
              </span>
              , siempre
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Crea itinerarios, organiza destinos y comparte tus planes de viaje
              todo en un solo lugar.
            </p>
          </div>

          {/* CTA Button */}
          <div className="mb-8">
            <Button
              size="lg"
              className="text-lg px-8 py-6 rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-primary/25 bg-primary hover:bg-primary/90"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Descúbrelo
              <ArrowRight
                className={`ml-2 h-5 w-5 transition-transform duration-300 ${
                  isHovered ? "translate-x-1" : ""
                }`}
              />
            </Button>
          </div>

          {/* New Paragraph */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-center mb-16">
            Únete a miles de viajeros que planean mejores viajes con{" "}
            <span className="font-semibold text-primary">TripPlanner</span>.
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 opacity-20">
        <Plane className="h-12 w-12 text-primary animate-pulse" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20">
        <Compass
          className="h-16 w-16 text-accent animate-spin"
          style={{ animationDuration: "20s" }}
        />
      </div>
      <div className="absolute top-1/2 left-5 opacity-15">
        <Suitcase className="h-10 w-10 text-primary" />
      </div>
    </div>
  );
}
