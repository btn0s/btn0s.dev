import {
  MutableRefObject,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';

const CAMERA_DISTANCE = 5;
const PARALLAX_FACTOR = 0.2;
const STARFIELD_START = 50;
const STARFIELD_END = 100;
const STARFIELD_DENSITY = 10;

const targetVector3 = new Vector3();

interface MoonProps {
  orbitRadius: number;
  speed: number;
  orbitStartAngle?: number;
  orbitAngle?: number;
  scale?: number;
}

const Moon = ({
  orbitRadius,
  speed,
  orbitStartAngle = Math.random() * 2 * Math.PI,
  orbitAngle = 0,
  scale = 1,
}: MoonProps) => {
  const [currentOrbitAngle, setCurrentOrbitAngle] = useState(orbitStartAngle);

  useFrame(() => {
    setCurrentOrbitAngle((prevAngle) => (prevAngle + speed) % (2 * Math.PI));
  });

  const x = orbitRadius * Math.cos(currentOrbitAngle);
  const y = orbitRadius * Math.cos(currentOrbitAngle) * orbitAngle;
  const z = orbitRadius * Math.sin(currentOrbitAngle);

  return (
    <mesh position={new Vector3(x, y, z)} scale={scale} castShadow>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshToonMaterial color={0xbdffbd} />
    </mesh>
  );
};

const Planet = ({ moons }: { moons: Array<MoonProps> }) => {
  return (
    <group>
      <mesh receiveShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshToonMaterial color={0x00ff00} />
      </mesh>
      {moons.map((moonProps, idx) => (
        <Moon key={idx} {...moonProps} />
      ))}
    </group>
  );
};

const Star = ({ position }: { position: Vector3 }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.1, 24, 24]} />
      <meshBasicMaterial color={0xffffff} />
    </mesh>
  );
};

const Starfield = () => {
  const starPositions = useMemo(() => {
    const range = STARFIELD_END - STARFIELD_START;
    return Array.from({ length: Math.floor(STARFIELD_DENSITY * range) }).map(
      () => {
        const posX = Math.random() * range - range / 2;
        const posY = Math.random() * range - range / 2;
        let posZ = Math.random() * range - range / 2;

        // Ensure no stars are between the camera and the planet.
        while (posZ > -CAMERA_DISTANCE && posZ < CAMERA_DISTANCE) {
          posZ = Math.random() * range - range / 2;
        }

        return new Vector3(posX, posY, posZ);
      },
    );
  }, []);

  return (
    <group>
      {starPositions.map((position, idx) => (
        <Star key={idx} position={position} />
      ))}
    </group>
  );
};

const CameraWrapper = ({
  cameraPosition,
}: {
  cameraPosition: [number, number, number];
}) => {
  const { camera } = useThree();

  useFrame(() => {
    camera.position.lerp(targetVector3.set(...cameraPosition), 0.05);
    camera.lookAt(targetVector3.set(0, 0, 0));
  });

  return null;
};

const Scene = ({
  hoverTargetRef,
}: {
  hoverTargetRef: MutableRefObject<HTMLDivElement | null>;
}) => {
  const { camera } = useThree();
  const [cameraPosition, setCameraPosition] = useState<
    [number, number, number]
  >([0, 0, CAMERA_DISTANCE]);

  const handleMouseMove = (event: MouseEvent) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;

    const cameraX = (x - camera.position.x) * PARALLAX_FACTOR;
    const cameraY = (y - camera.position.y) * PARALLAX_FACTOR;

    setCameraPosition([cameraX, cameraY, CAMERA_DISTANCE]);
  };

  const reset = () => {
    setCameraPosition([0, 0, CAMERA_DISTANCE]);
  };

  useEffect(() => {
    if (!hoverTargetRef.current) return;
    const hoverTarget = hoverTargetRef.current;

    hoverTarget?.addEventListener('mousemove', handleMouseMove);
    hoverTarget?.addEventListener('mouseleave', reset);

    return () => {
      hoverTarget?.removeEventListener('mousemove', handleMouseMove);
      hoverTarget?.removeEventListener('mouseleave', reset);
    };
  }, [hoverTargetRef]);

  const moons = useMemo(() => {
    const numMoons = Math.floor(Math.random() * 3) + 1;
    return Array.from({ length: numMoons }).map((value, index, array) => {
      const orbitRadius = Math.random() * 2 + 1;
      const speed = Math.random() * 0.001 + 0.005;
      return {
        orbitRadius,
        speed,
        orbitStartAngle: Math.random() * 2 * Math.PI,
        orbitAngle: (Math.random() - 0.5) * Math.PI, // Randomly generate an orbit angle between -PI/2 and PI/2
        scale: Math.random() * 0.5 + 0.5,
      };
    });
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={1.5} position={[5, 5, 10]} />
      <CameraWrapper cameraPosition={cameraPosition} />
      <Planet moons={moons} />
      <Starfield />
    </>
  );
};

const HomeSpaceView = ({
  hoverTargetRef,
}: {
  hoverTargetRef: MutableRefObject<HTMLDivElement | null>;
}) => {
  return (
    <Canvas
      shadows
      camera={{
        position: [0, 0, CAMERA_DISTANCE + 1],
      }}
    >
      <Suspense>
        <Scene hoverTargetRef={hoverTargetRef} />
      </Suspense>
    </Canvas>
  );
};

export default HomeSpaceView;
