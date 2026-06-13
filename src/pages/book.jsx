import { useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { UI } from "../components/UI";
import { Experience } from "../components/Experience";

const LoadingScreen = () => {
  const { progress } = useProgress();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => setShow(false), 500);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-950 transition-opacity duration-500 ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="text-center">
        <div className="w-12 h-12 border-[3px] border-[#ffa94d] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
        <p className="text-white/60 text-lg mb-5 tracking-wider">Loading your memories...</p>
        <div className="w-52 h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#ffa94d] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white/30 text-xs mt-2 font-mono tracking-widest">
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
};

const BookPage = () => {
  return (
    <>
      <LoadingScreen />
      <UI />
      <Canvas
        shadows
        camera={{ position: [0, 1.1, 2.15], fov: 38 }}
        style={{ background: '#0f0f1a', width: '100vw', height: '100vh' }}
        flat
      >
        <group position-y={0}>
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </group>
      </Canvas>
    </>
  )
}

export default BookPage
