import { Environment, Float, OrbitControls } from "@react-three/drei";
import { useAtom } from "jotai";
import { Book } from "./Book";
import { floatPausedAtom, pageAtom, pages } from "./bookState";


export const Experience = () => {
  const [page] = useAtom(pageAtom);
  const [floatPaused] = useAtom(floatPausedAtom);
  const bookClosed = page === 0 || page === pages.length;
  const sunlightIntensity = bookClosed ? 1.1 : 1.4;

  return (
    <>
      {/* <Float
        enabled={bookClosed && !floatPaused}
        rotation-x={-Math.PI / 4}
        floatIntensity={1}
        speed={2}
        rotationIntensity={2}
      > */}
      <Book  />
      {/* </Float> */}
      <OrbitControls minDistance={0.5} maxDistance={5} />
      <Environment preset="city" intensity={0.45} />
      <directionalLight
        position={[2, 5, 2]}
        intensity={sunlightIntensity}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      <directionalLight position={[-2, 1, -1]} intensity={0.6} />
      <ambientLight intensity={0.3} />
      <mesh position-y={-1.5} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
    </>
  );
};
