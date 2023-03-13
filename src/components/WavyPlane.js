import * as THREE from "three";
import React, { useRef, Suspense, useEffect, useState } from "react";
import {
  Canvas,
  extend,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import { PerspectiveCamera, shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";
import { AnimatePresence } from "framer-motion";
import { motion, MotionCanvas, LayoutCamera } from "framer-motion-3d";
import LeftKey from "@/models/LeftKey.js";

// import "./styles.scss";
const WaveShaderMaterial = shaderMaterial(
  // Uniform
  {
    uTime: 0,
    uColor: new THREE.Color(0.0, 0.0, 0.0),
    uTexture: new THREE.Texture(),
  },
  // Vertex Shader
  glsl`
    precision mediump float;
 
    varying vec2 vUv;
    varying float vWave;

    uniform float uTime;

    #pragma glslify: snoise3 = require(glsl-noise/simplex/3d.glsl);

    void main() {
      vUv = uv;

      vec3 pos = position;
      float noiseFreq = 9.0;//7.0 nombres de vagues
      float noiseAmp = 0.07; //0.14 
      vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
      pos.z += snoise3(noisePos) * noiseAmp;
      vWave = pos.z;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);  
    }
  `,
  // Fragment Shader
  glsl`
    precision mediump float;

    uniform vec3 uColor;
    uniform float uTime;
    uniform sampler2D uTexture;

    varying vec2 vUv;
    varying float vWave;

    void main() {
      float wave = vWave * 0.01;
      vec3 texture = texture2D(uTexture, vUv + wave).rgb;
      gl_FragColor = vec4(texture, 1.0); 
    }
  `
);

extend({ WaveShaderMaterial });

const Wave = ({ imageSrc, args, position }) => {
  const ref = useRef();
  useFrame(({ clock }) => (ref.current.uTime = clock.getElapsedTime()));

  const [image] = useLoader(THREE.TextureLoader, [imageSrc]);

  return (
    <mesh position={position}>
      <planeGeometry args={args} />
      <waveShaderMaterial uColor={"hotpink"} ref={ref} uTexture={image} />
    </mesh>
  );
};

// const Scene = () => {
//   return (
//     <Canvas camera={{ fov: 12, position: [0, 0, 5] }}>
//       <Suspense fallback={null}>
//         <Wave
//           args={[0.75, 0.45, 150, 150]}
//           imageSrc="https://images.unsplash.com/photo-1676278746122-4f3a6535d774?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
//         />
//       </Suspense>
//     </Canvas>
//   );
// };

const WavyPlane = ({}) => {
  const mainRef = useRef();
  const cameraRef = useRef();
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [isArrowKeyScroll, setIsArrowKeyScroll] = useState(false);
  const objectDistance = 1.6;

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const texts = [
    "POMADA MODELADORA",
    "GHIBLI 3D",
    "POMODORO TODO APP",
    "AIRBNB RE-BUILD",
    "Zinzon city",
    "XXX",
  ];

  window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
  });
  useEffect(() => {
    const handleScroll = () => {
      let scrollX = mainRef.current.scrollLeft;
      if (cameraRef.current) {
        cameraRef.current.position.x = (scrollX / sizes.width) * objectDistance;
      }

      const index = Math.round(scrollX / sizes.width);
      setActiveSectionIndex(index);
    };

    window.addEventListener("keydown", handleScroll);
    mainRef.current.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("keydown", handleScroll);
      if (mainRef.current) {
        mainRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [sizes.width]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight" && activeSectionIndex < texts.length - 1) {
        setActiveSectionIndex((prevIndex) => prevIndex + 1);
        mainRef.current.scrollTo({
          left: (activeSectionIndex + 1) * sizes.width,
          behavior: "smooth",
        });
      } else if (event.key === "ArrowLeft" && activeSectionIndex > 0) {
        setActiveSectionIndex((prevIndex) => prevIndex - 1);
        mainRef.current.scrollTo({
          left: (activeSectionIndex - 1) * sizes.width,
          behavior: "smooth",
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeSectionIndex]);
  return (
    <main ref={mainRef} className="wavyMain">
      {texts.map((text, index) => (
        <section key={index} className="sectionWavy">
          <h1 key={index} className="h1" style={{}}>
            {text}
          </h1>{" "}
        </section>
      ))}
      <Canvas
        style={{ position: "fixed", top: 0, left: 0 }}
        camera={{ fov: 12, position: [0, 0, 5] }}
      >
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault
          fov={12}
          position={[0, 0, 5]}
        />
        <Suspense fallback={null}>
          {texts.map((text, i) => (
            <Wave
              key={i}
              args={[0.95, 0.55, 150, 150]}
              position={[objectDistance * i, 0.02, 0]}
              imageSrc={`/00${i + 1}.jpg`}
            />
          ))}
          <LeftKey />
        </Suspense>
      </Canvas>
    </main>
  );
};

export default WavyPlane;
