import React from "react";
import { Suspense, useState, useLayoutEffect, useRef, useEffect } from "react";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { animated } from "@react-spring/web";
import { Canvas, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import GradientPlane from "@/models/GradientPlane.js";

function projects() {
  const [gradientZoom, setGradientZoom] = useState(false);
  let color = gradientZoom ? "#00ffff" : "#00ff00";

  const { position } = useControls({
    position: { value: [0, 0, 0], step: 10.0 },
  });
  return (
    <>
      <animated.main className="main">
        <Suspense fallback={null}>
          <Canvas
            shadows
            flat
            linear
            gl={{ antialias: true }}
            camera={{
              fov: 85,
            }}
          >
            <GradientPlane gradientZoom={gradientZoom} color={color} />
            <directionalLight
              name="Directional Light"
              castShadow
              intensity={1.21}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-near={-10000}
              shadow-camera-far={100000}
              shadow-camera-left={-1210.774}
              shadow-camera-right={1210.774}
              shadow-camera-top={1210.774}
              shadow-camera-bottom={-1210.774}
              color="#fefefe"
              position={[154.86, 1304.58, -2219.09]}
              rotation={[0, 0.25, 0]}
            />

            {/* <Float
              speed={1} // Animation speed, defaults to 1
              rotationIntensity={0.03} // XYZ rotation intensity, defaults to 1
              floatIntensity={0.01} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
              floatingRange={[-0.1, 0.1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
            > */}
            {/* <SpaceBar spacePressed={spacePressed} /> */}
            {/* </Float> */}

            <OrbitControls />
            {/* <LeftKey /> */}
          </Canvas>
          {/* <div className="text">
      <h1>Mon espace</h1>
    </div> */}
        </Suspense>
      </animated.main>
    </>
  );
}

export default projects;
