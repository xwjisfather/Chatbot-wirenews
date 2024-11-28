'use client';

import { useGLTF } from '@react-three/drei'

export function SceneModel(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('assets/scene.glb') as any;

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Chairs.geometry} material={materials.Black_Box} position={[-2, 0.25, 9.5]} receiveShadow={true} />
      <mesh geometry={nodes.Monitor.geometry} material={materials.SideMonitor} position={[-5.975, 4.212, -1.943]} rotation={[Math.PI / 2, 0, 2.618]} scale={[3.114, 0.389, 1.752]} />
      <mesh geometry={nodes.Rooftop.geometry} material={materials.Rooftop} position={[0, -0.75, 0]} />
      <mesh geometry={nodes.Stage.geometry} material={materials.White_Light} position={[0, 0.25, 3]} scale={[1.561, 1, 1]} />
      <mesh geometry={nodes.Stage_Deco.geometry} material={materials.White_Emission} position={[-11.475, 3.875, -5]} />
      <mesh geometry={nodes.BackDrop_Harbour.geometry} material={materials['Stage_Backdrop_Material.002']} position={[0, -0.335, -2.434]} scale={0.468} />
      <mesh geometry={nodes.BackDrop_Wall.geometry} material={materials['NightSky.002']} position={[0, 0, -2.391]} scale={0.435} />
      <mesh geometry={nodes.Text_01.geometry} material={materials['Logo.002']} position={[-0.093, -0.335, -2.434]} scale={0.468} />
    </group>
  )
}

useGLTF.preload('assets/scene.glb');

// type GLTFResult = GLTF & {
//   nodes: {
//     Chairs: THREE.Mesh
//     Monitor: THREE.Mesh
//     Rooftop: THREE.Mesh
//     Stage: THREE.Mesh
//     Stage_Deco: THREE.Mesh
//     BackDrop_Harbour: THREE.Mesh
//     BackDrop_Wall: THREE.Mesh
//     Text_01: THREE.Mesh
//   }
//   materials: {
//     Black_Box: THREE.MeshStandardMaterial
//     SideMonitor: THREE.MeshStandardMaterial
//     Rooftop: THREE.MeshStandardMaterial
//     White_Light: THREE.MeshStandardMaterial
//     White_Emission: THREE.MeshStandardMaterial
//     ['Stage_Backdrop_Material.002']: THREE.MeshStandardMaterial
//     ['NightSky.002']: THREE.MeshStandardMaterial
//     ['Logo.002']: THREE.MeshStandardMaterial
//   }
// }