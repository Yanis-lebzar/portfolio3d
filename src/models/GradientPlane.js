import * as THREE from "three";

import { useFrame } from "@react-three/fiber";

import { useEffect, useRef } from "react";
import { ShaderGradient } from "../shaders/ShaderGradient.js";
import { useControls } from "leva";
import { OrthographicCamera } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { useRouter } from "next/router";

export default function GradientPlane({ color, gradientZoom }) {
  const gradientRef = useRef();
  const gradientCameraRef = useRef();
  const vec = new THREE.Vector3(0, 1, 2);
  const { scale } = useSpring({
    from: { scale: 1 },
    to: { scale: gradientZoom ? 2 : 1 },
    config: { duration: 1000 },
  });
  // console.log(first);
  // useEffect(() => {
  //   if (zoom == 2) {
  //     router.push('/new-url', undefined, { shallow: true });
  //   }
  // }, [zoom]);
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    // gradientCameraRef.current.zoom += delta * 0.01;
    console.log(gradientCameraRef.current.zoom);
  });
  // console.log("color", color);
  const { rotationGradient, color1, color2, color3, color4 } = useControls({
    rotationGradient: { value: [-6.7, -0.1, -3.0], step: 0.1 },
    color1: "#3594c4",
    color3: "#57b3ff",
    color4: "#ffd699",
  });
  let coco = [color1, color, color3, color4];
  coco = coco.map((color) => new THREE.Color(color));
  useFrame((state, delta) => {
    gradientRef.current.uTime += 0.00009;
  });
  return (
    <OrthographicCamera
      name="1"
      makeDefault={true}
      zoom={2140}
      far={100000}
      near={-100000}
      rotation={0}
      ref={gradientCameraRef}
    >
      <animated.mesh
        position={[0, 0, 0]}
        scale={scale}
        rotation={rotationGradient}
      >
        <planeGeometry args={[2.5, 2.5, 400, 400]} />
        <shaderGradient
          side={THREE.DoubleSide}
          uColor={coco}
          ref={gradientRef}
        />
      </animated.mesh>
    </OrthographicCamera>
  );
}
