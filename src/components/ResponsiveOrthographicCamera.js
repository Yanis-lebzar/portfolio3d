import React, { useRef, useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";

function ResponsiveOrthographicCamera(props) {
  const cameraRef = useRef();
  const { size } = useThree();
  const [aspect, setAspect] = useState(1);

  useEffect(() => {
    const onResize = () => {
      // Update the aspect ratio when the window size changes
      setAspect(size.width / size.height);
    };

    // Listen for changes to the window size
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [size]);

  useEffect(() => {
    // Get the aspect ratio of the screen
    const aspect = size.width / size.height;

    // Adjust the camera size based on the aspect ratio
    cameraRef.current.left = (-props.width * aspect) / 2;
    cameraRef.current.right = (props.width * aspect) / 2;
    cameraRef.current.top = props.height / 2;
    cameraRef.current.bottom = -props.height / 2;

    // Update the camera projection matrix
    cameraRef.current.updateProjectionMatrix();
  }, [size, props.width, props.height]);

  return <OrthographicCamera ref={cameraRef} {...props} />;
}

export default ResponsiveOrthographicCamera;
