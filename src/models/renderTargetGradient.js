import {
  PerspectiveCamera,
  OrbitControls,
  Box,
  Plane,
  TorusKnot,
} from "@react-three/drei";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, createPortal, useFrame } from "@react-three/fiber";
import GradientPlane from "./GradientPlane.js";
function SpinningThing() {
  const mesh = useRef();
  useFrame(
    () =>
      (mesh.current.rotation.x =
        mesh.current.rotation.y =
        mesh.current.rotation.z +=
          0.01)
  );
  return (
    <TorusKnot ref={mesh} args={[1, 0.4, 100, 64]}>
      <meshNormalMaterial attach="material" />
    </TorusKnot>
  );
}
function plane() {
  return (
    <>
      <PerspectiveCamera />
    </>
  );
}

function Cube() {
  const cam = useRef();
  const [scene, target] = useMemo(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("orange");
    const target = new THREE.WebGLMultisampleRenderTarget(1024, 1024, {
      format: THREE.RGBFormat,
      stencilBuffer: false,
    });
    target.samples = 8;
    return [scene, target];
  }, []);

  useFrame((state) => {
    state.gl.setRenderTarget(target);
    state.gl.render(scene, cam.current);
    state.gl.setRenderTarget(null);
  });

  return (
    <>
      <PerspectiveCamera ref={cam} position={[0, 0, 3]} />
      {createPortal(<SpinningThing />, scene)}
      <Box args={[2, 2, 2]}>
        <meshStandardMaterial attach="material" map={target.texture} />
      </Box>
    </>
  );
}

function RenderTargetGradient() {
  return (
    <Canvas colorManagement>
      <ambientLight />
      <spotLight position={[10, 10, 10]} />
      <pointLight position={[-10, -10, -10]} color="red" />
      <Cube />
      <OrbitControls />
    </Canvas>
  );
}

export default RenderTargetGradient;
