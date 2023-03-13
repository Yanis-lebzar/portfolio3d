/*
  Auto-generated by Spline
*/

import useSpline from "@splinetool/r3f-spline";
import { OrthographicCamera } from "@react-three/drei";

export default function Scene({ ...props }) {
  const { nodes, materials } = useSpline(
    "https://prod.spline.design/guQre2TCcnMDvqLK/scene.splinecode"
  );
  return (
    <>
      <color attach="background" args={["#5e6063"]} />
      <group {...props} dispose={null}>
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
        <group name="spaceBar Instance" position={[-23.91, 276.5, -169.71]}>
          <group name="Group" position={[11.11, 66.91, 4.87]}>
            <mesh
              name="Text"
              geometry={nodes.Text.geometry}
              material={materials["Text Material"]}
              castShadow
              receiveShadow
              position={[0.88, 148.59, 17.19]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
            <mesh
              name="Cube"
              geometry={nodes.Cube.geometry}
              material={materials["Cube Material"]}
              castShadow
              receiveShadow
              position={[0, -13.59, 0]}
              scale={[0.45, 1, 1]}
            />
          </group>
          <mesh
            name="Rectangle 8"
            geometry={nodes["Rectangle 8"].geometry}
            material={materials["Rectangle 8 Material"]}
            castShadow
            receiveShadow
            position={[0, -215.5, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          <mesh
            name="Rectangle 7"
            geometry={nodes["Rectangle 7"].geometry}
            material={materials["Rectangle 7 Material"]}
            castShadow
            receiveShadow
            position={[8.03, -138.41, 2.22]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        </group>
        <group
          name="spaceBar"
          visible={false}
          position={[-23.91, 276.5, -169.71]}
        >
          <group name="Group1" position={[11.11, 66.91, 4.87]}>
            <mesh
              name="Text1"
              geometry={nodes.Text1.geometry}
              material={materials["Text1 Material"]}
              castShadow
              receiveShadow
              position={[0.88, 148.59, 17.19]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
            <mesh
              name="Cube1"
              geometry={nodes.Cube1.geometry}
              material={materials["Cube1 Material"]}
              castShadow
              receiveShadow
              position={[0, -13.59, 0]}
              scale={[0.45, 1, 1]}
            />
          </group>
          <mesh
            name="Rectangle 81"
            geometry={nodes["Rectangle 81"].geometry}
            material={materials["Rectangle 81 Material"]}
            castShadow
            receiveShadow
            position={[0, -215.5, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          <mesh
            name="Rectangle 71"
            geometry={nodes["Rectangle 71"].geometry}
            material={materials["Rectangle 71 Material"]}
            castShadow
            receiveShadow
            position={[8.03, -138.41, 2.22]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        </group>
        <OrthographicCamera
          name="1"
          makeDefault={true}
          zoom={0.57}
          far={100000}
          near={-100000}
          position={[-1420.46, 2062.05, 2450.96]}
          rotation={[-0.46, 0.28, 0.14]}
          scale={1}
        />
        <hemisphereLight
          name="Default Ambient Light"
          intensity={0.75}
          color="#eaeaea"
        />
      </group>
    </>
  );
}
