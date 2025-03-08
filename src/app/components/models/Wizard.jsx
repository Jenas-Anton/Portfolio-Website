  "use client";
  import React, { useRef, useEffect } from "react";
  import { useGLTF, useAnimations } from "@react-three/drei";
  import { useFrame, useThree } from "@react-three/fiber";
  import * as THREE from "three";

  export default function Wizard(props) {
    const group = useRef();
    const { nodes, materials, animations } = useGLTF("/models/wizard-transformed.glb");
    const { actions } = useAnimations(animations, group);
    const { scene } = useThree();

    // Adjust the base Y position
    const baseHeight = -2.5; // Change this value to move the model up/down

    // Ensure the eyes are glowing blue
    useEffect(() => {
      if (materials.Blue_Light) {
        materials.Blue_Light.emissive = new THREE.Color("#000080"); // Blue glow
        materials.Blue_Light.emissiveIntensity = 2; // Increase glow effect
      }
    }, [materials]);

    // Animation setup
    useEffect(() => {
      if (actions?.Wave) {
        actions.Wave.setLoop(THREE.LoopRepeat);
        actions.Wave.play();
      }
    }, [actions]);

    // Floating animation with adjustable base Y position
    useFrame((state, delta) => {
      const time = state.clock.getElapsedTime();
      const speedFactor = 1.5;
      if (group.current) {
        group.current.position.y = baseHeight + Math.sin(time * speedFactor) * 0.2;
      }
    });

    // Add lighting for better visibility
    useEffect(() => {
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // Soft global light
      const pointLight = new THREE.PointLight(0xffffff, 2, 10);
      pointLight.position.set(2, 3, 2);
      scene.add(ambientLight, pointLight);
      return () => {
        scene.remove(ambientLight, pointLight);
      };
    }, [scene]);

    return (
      <group
        ref={group}
        {...props}
        dispose={null}
        position={[0, baseHeight, 0]} // Adjust Y-axis here
        scale={[5, 5, 5]}
        rotation={[0, 0, 0]}
      >
        <group name="Sketchfab_Scene">
          <group name="RootNode" scale={0.002}>
            <group
              name="Robot_Origin"
              position={[0, 9.763, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={100}
            >
              <group name="Robot" position={[0, 0, 0.051]}>
                <mesh
                  name="Robot_White_Glossy_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Robot_White_Glossy_0.geometry}
                  material={materials.White_Glossy}
                />
                <mesh
                  name="Robot_Blue_Light_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Robot_Blue_Light_0.geometry}
                  material={materials.Blue_Light}
                />
                <mesh
                  name="Robot_Black_Matt_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Robot_Black_Matt_0.geometry}
                  material={materials.Black_Matt}
                />
              </group>

              <group name="Mouth" position={[0, -0.504, 2.573]} scale={[1, 1, 2.881]}>
                <mesh
                  name="Mouth_Blue_Light_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Mouth_Blue_Light_0.geometry}
                  material={materials.Blue_Light}
                />
              </group>

              {/* Eyes with glowing blue light */}
              <group name="Empty" position={[0, -0.06, 2.786]}>
                <group name="Eyes" position={[0, -0.431, 0.076]}>
                  <mesh
                    name="Eyes_Blue_Light_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Eyes_Blue_Light_0.geometry}
                    material={materials.Blue_Light}
                  />
                </group>
              </group>

              <group name="Wave" position={[0, 0, 0.113]} scale={[1, 1, 0.186]}>
                <mesh
                  name="Wave_Blue_Light_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Wave_Blue_Light_0.geometry}
                  material={materials.Blue_Light}
                />
              </group>

              <group name="Hand_origin" position={[0.723, 0, 2.015]} rotation={[0, -0.064, 0]}>
                <group name="hANDS" position={[-0.723, 0, -1.963]}>
                  <mesh
                    name="hANDS_White_Glossy_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.hANDS_White_Glossy_0.geometry}
                    material={materials.White_Glossy}
                  />
                </group>
              </group>

              <group name="Hand_origin002" position={[-0.723, 0, 2.015]} rotation={[0, 0.064, -Math.PI]}>
                <group name="hANDS002" position={[-0.723, 0, -1.963]}>
                  <mesh
                    name="hANDS002_White_Glossy_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.hANDS002_White_Glossy_0.geometry}
                    material={materials.White_Glossy}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    );
  }

  useGLTF.preload("/models/wizard-transformed.glb");
