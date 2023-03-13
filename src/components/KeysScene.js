import LeftKey from "@/models/LeftKey.js";
import RightKey from "@/models/RightKey.js";
import SpaceBar from "@/models/SpaceBar.js";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import {
  motion as motion3d,
  MotionCanvas,
  LayoutCamera,
  LayoutOrthographicCamera,
} from "framer-motion-3d";
import React, { useEffect, useRef, useState } from "react";

function KeysScene({
  gradientZoom,
  leftArrowPressed,
  rightArrowPressed,
  spacePressed,
}) {
  const cameraSpaceBarRef = useRef();
  const { size } = useThree();
  let aspect = size.width / size.height;

  //   console.log(size);
  //   const size = 100;
  //   const [sizes, setSizes] = useState({
  //     width: 0,
  //     height: 0,
  //   });
  //   const [aspect, setAspect] = useState(sizes.width / sizes.height);

  //   useEffect(() => {
  //     const handleResize = () => {
  //       setSizes({
  //         width: window.innerWidth,
  //         height: window.innerHeight,
  //       });
  //     };

  //     window.addEventListener("resize", handleResize);

  //     return () => {
  //       window.removeEventListener("resize", handleResize);
  //     };
  //   }, []);
  let sizeX = 70;
  useFrame((state, delta) => {
    // cameraSpaceBarRef.current.left = (sizeX * aspect) / -2;
    // cameraSpaceBarRef.current.right = (sizeX * aspect) / 2;
    // cameraSpaceBarRef.current.top = size / -2;
    // cameraSpaceBarRef.current.bottom = size / 2;
  });

  return (
    <>
      <OrbitControls />
      <OrthographicCamera
        // manual
        ref={cameraSpaceBarRef}
        // left={(sizeX * aspect) / -2}
        // right={(sizeX * aspect) / 2}
        // bottom={size / -2}
        // top={size / 2}
        makeDefault={true}
        fov={80}
        far={100000}
        near={-100000}
        zoom={1.25}
        position={(0, 0, 0)}
      />

      {gradientZoom ? (
        <motion3d.group
          initial={{
            y: -30,
            opacity: 0,
            transition: {
              duration: 1.5,
            },
          }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              duration: 1.5,
              delay: 2.5,
            },
          }}
        >
          <LeftKey leftArrowPressed={leftArrowPressed} />
          <RightKey rightArrowPressed={rightArrowPressed} />
        </motion3d.group>
      ) : null}

      <SpaceBar gradientZoom={gradientZoom} spacePressed={spacePressed} />
    </>
  );
}

export default KeysScene;
