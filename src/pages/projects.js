import WavyPlane from "@/components/WavyPlane.js";
import SpaceBarTest from "@/models/SpaceBarTest.js";
import {
  OrbitControls,
  OrthographicCamera,
  useAspect,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";

function projects() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows flat linear style={{ width: "100%", height: "100vh" }}>
        <SpaceBarTest />
        <OrbitControls />
      </Canvas>
    </Suspense>
  );
}

export default projects;
