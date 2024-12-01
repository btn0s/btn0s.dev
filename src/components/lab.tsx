"use client";

import React, { MutableRefObject, useMemo, useRef, useState } from "react";

import { CameraControls, OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import CameraControlsImpl from "camera-controls";
import { gsap } from "gsap";
import {
  Mesh,
  OrthographicCamera as OrthographicCameraImpl,
  Vector3,
} from "three";

const NUM_DOTS = 100;
const DOT_GRID_SPACING = 50;

const DotGrid: React.FC = () => {
  const dots = useMemo(() => {
    let ds = [];
    for (let x = -NUM_DOTS; x <= NUM_DOTS; x++) {
      for (let y = -NUM_DOTS; y <= NUM_DOTS; y++) {
        ds.push(
          <mesh
            key={`${x}-${y}`}
            position={[x * DOT_GRID_SPACING, y * DOT_GRID_SPACING, 0]}
          >
            <sphereGeometry args={[2, 4, 4]} />
            <meshBasicMaterial color={0xffffff} transparent opacity={0.25} />
          </mesh>,
        );
      }
    }
    return ds;
  }, []);
  return <group>{dots}</group>;
};

const Square = ({ position }: { position: number[] }) => {
  const ref = useRef<Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <mesh
      ref={ref}
      position={new Vector3(position[0], position[1], position[2])}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      receiveShadow
      castShadow
    >
      <boxGeometry args={[100, 100, 100]} />
      <meshStandardMaterial color={isHovered ? "red" : "white"} />
    </mesh>
  );
};

const CameraManager: React.FC<{
  cameraRef: MutableRefObject<OrthographicCameraImpl | null>;
  cameraControlsRef: MutableRefObject<CameraControlsImpl | null>;
}> = ({ cameraRef, cameraControlsRef }) => (
  <>
    <OrthographicCamera
      ref={cameraRef}
      position={[0, 0, 100]}
      zoom={0.5}
      makeDefault
    />
    <CameraControls
      ref={cameraControlsRef}
      mouseButtons={{
        left: CameraControlsImpl.ACTION.TRUCK,
        middle: CameraControlsImpl.ACTION.ZOOM,
        right: CameraControlsImpl.ACTION.ROTATE,
        wheel: CameraControlsImpl.ACTION.ZOOM,
      }}
      minZoom={0.4}
      maxZoom={2}
    />
  </>
);

const Lab: React.FC = () => {
  const cameraRef = useRef<OrthographicCameraImpl>(null);
  const cameraControlsRef = useRef<CameraControlsImpl>(null);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <Canvas>
        <CameraManager
          cameraRef={cameraRef}
          cameraControlsRef={cameraControlsRef}
        />
        <pointLight position={[10, 10, 10]} />
        <ambientLight intensity={0.5} />
        {[
          [-200, 200, 0],
          [0, 200, 0],
          [200, 200, 0],
          [-200, 0, 0],
          [0, 0, 0],
          [200, 0, 0],
          [-200, -200, 0],
          [0, -200, 0],
          [200, -200, 0],
        ].map((position, index) => (
          <Square key={index} position={position} />
        ))}
        <DotGrid />
      </Canvas>
    </div>
  );
};

export default Lab;
