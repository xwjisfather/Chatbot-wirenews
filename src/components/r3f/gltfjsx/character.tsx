'use client';

import * as THREE from 'three'
import React, { useEffect, useState } from 'react'
import { useFrame, useGraph } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import { useCharacterAnimation } from './utils/useCharacterAnimations'
import { useEyeBlink } from './utils/useEyeBlink'
import { SpotLight } from '../components/spotlight'
import { testVisemeData } from '../components/test_viseme'
import { useViseme } from './utils/useViseme'

const visemeMap: { [key: number]: string } = {
    0: "B_M_P",
    1: "AE",
    2: "Ah",
    3: "W_OO",
    4: "EE",
    5: "Er",
    6: "Ih",
    7: "W_OO",
    8: "Oh",
    9: "Ah",
    10: "W_OO",
    11: "Ah",
    12: "K_G_H_NG",
    13: "Oh",
    14: "T_L_D_N",
    15: "S_Z",
    16: "Ch_J",
    17: "Th",
    18: "F_V",
    19: "T_L_D_N",
    20: "K_G_H_NG",
    21: "B_M_P"
};

const visemeStrength = 2;
const visemeSmoothing = 0.5;


export function CharacterModel(props: JSX.IntrinsicElements['group']) {
    const group = React.useRef<THREE.Group>(null);
    const { scene, animations } = useGLTF('assets/character.glb');
    const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { nodes, materials } = useGraph(clone) as any;
    const { actions } = useAnimations(animations, group);

    // handle talking & idle animation
    const { animationState, setAnimationState } = useCharacterAnimation(actions, 'idle');

    // handle viseme
    const { setCurrentViseme, setCurrentAudioTime } = useViseme([nodes.CC_Base_Body_1, nodes.CC_Base_Tongue, nodes.CC_Base_Teeth_1, nodes.CC_Base_Teeth_2], visemeMap, visemeStrength, visemeSmoothing);

    // 24, 25 are the eye morphTargets dictionary indices
    // CC_Base_Body_1 is the face mesh
    useEyeBlink([24, 25], nodes.CC_Base_Body_1);

    useEffect(() => {
        setCurrentViseme(testVisemeData);
        setCurrentAudioTime(3);
    }, []);

    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Scene">
                <group name="Idle02_1211" scale={0.01}>
                    <primitive object={nodes.CC_Base_BoneRoot} />
                </group>
                <PerspectiveCamera name="PerspectiveCamera" makeDefault={false} fov={24} position={[0, 1.397, 3.192]} />
                <spotLight intensity={5.435} angle={0.55} penumbra={1} decay={2} distance={9.1} position={[1.836, 1.785, -0.842]} rotation={[-2.657, 1.101, 1.125]} target={nodes.Ear_cc3iid_2530.target}>
                    <primitive object={nodes.Ear_cc3iid_2530.target} position={[0, 0, -1]} />
                </spotLight>
                <spotLight intensity={21.741} angle={0.375} penumbra={0.75} decay={2} distance={7.5} position={[-3.047, 2.665, 3.428]} rotation={[-0.227, -0.723, -1.652]} target={nodes.Key_cc3iid_2528.target}>
                    <primitive object={nodes.Key_cc3iid_2528.target} position={[0, 0, -1]} />
                </spotLight>
                <spotLight intensity={5.435} angle={Math.PI / 8} penumbra={0.15} decay={2} distance={9} position={[2.077, 1.243, 0.873]} rotation={[-0.379, 1.149, -1.227]} target={nodes.Right_cc3iid_2529.target}>
                    <primitive object={nodes.Right_cc3iid_2529.target} position={[0, 0, -1]} />
                </spotLight>
                <SpotLight
                    position={[-5, 5, 0]}
                    target={nodes.CC_Base_Body_1}
                    intensity={1700}
                    angle={Math.PI / 18}
                    penumbra={0.5}
                    helper={false}
                    color={'white'}
                    castShadow={true}
                />
                <SpotLight
                    position={[5, 5, 0]}
                    target={nodes.CC_Base_Body_1}
                    intensity={400}
                    angle={Math.PI / 18}
                    penumbra={0.5}
                    helper={false}
                    color={'white'}
                    castShadow={true}
                />
                <skinnedMesh name="High_Heels" geometry={nodes.High_Heels.geometry} material={materials.High_Heels} skeleton={nodes.High_Heels.skeleton} scale={0.01} castShadow />
                <skinnedMesh name="Jacket_1" geometry={nodes.Jacket_1.geometry} material={materials.Jacket_Material} skeleton={nodes.Jacket_1.skeleton} scale={0.01} castShadow />
                <skinnedMesh name="Jacket_2" geometry={nodes.Jacket_2.geometry} material={materials.Shirt_Material} skeleton={nodes.Jacket_2.skeleton} scale={0.01} />
                <skinnedMesh name="Pants_1" geometry={nodes.Pants_1.geometry} material={materials.Pants_Material} skeleton={nodes.Pants_1.skeleton} scale={0.01} castShadow />
                <skinnedMesh name="Pants_2" geometry={nodes.Pants_2.geometry} material={materials.Belt_Material} skeleton={nodes.Pants_2.skeleton} scale={0.01} />
                <skinnedMesh name="Side_part_mid" geometry={nodes.Side_part_mid.geometry} material={materials.Hair_Transparency} skeleton={nodes.Side_part_mid.skeleton} scale={0.01} />
                <skinnedMesh name="Underwear_Bottoms" geometry={nodes.Underwear_Bottoms.geometry} material={materials.Underwear_Bottoms} skeleton={nodes.Underwear_Bottoms.skeleton} scale={0.01} />
                <skinnedMesh name="CC_Base_Body_1" geometry={nodes.CC_Base_Body_1.geometry} material={materials.Std_Skin_Head} skeleton={nodes.CC_Base_Body_1.skeleton} morphTargetDictionary={nodes.CC_Base_Body_1.morphTargetDictionary} morphTargetInfluences={nodes.CC_Base_Body_1.morphTargetInfluences} scale={0.01} castShadow />
                <skinnedMesh name="CC_Base_Body_2" geometry={nodes.CC_Base_Body_2.geometry} material={materials.Std_Skin_Body} skeleton={nodes.CC_Base_Body_2.skeleton} morphTargetDictionary={nodes.CC_Base_Body_2.morphTargetDictionary} morphTargetInfluences={nodes.CC_Base_Body_2.morphTargetInfluences} scale={0.01} />
                <skinnedMesh name="CC_Base_Body_3" geometry={nodes.CC_Base_Body_3.geometry} material={materials.Std_Skin_Arm} skeleton={nodes.CC_Base_Body_3.skeleton} morphTargetDictionary={nodes.CC_Base_Body_3.morphTargetDictionary} morphTargetInfluences={nodes.CC_Base_Body_3.morphTargetInfluences} scale={0.01} castShadow />
                <skinnedMesh name="CC_Base_Body_4" geometry={nodes.CC_Base_Body_4.geometry} material={materials.Std_Skin_Leg} skeleton={nodes.CC_Base_Body_4.skeleton} morphTargetDictionary={nodes.CC_Base_Body_4.morphTargetDictionary} morphTargetInfluences={nodes.CC_Base_Body_4.morphTargetInfluences} scale={0.01} />
                <skinnedMesh name="CC_Base_Body_5" geometry={nodes.CC_Base_Body_5.geometry} material={materials.Std_Nails} skeleton={nodes.CC_Base_Body_5.skeleton} morphTargetDictionary={nodes.CC_Base_Body_5.morphTargetDictionary} morphTargetInfluences={nodes.CC_Base_Body_5.morphTargetInfluences} scale={0.01} />
                <skinnedMesh name="CC_Base_Body_6" geometry={nodes.CC_Base_Body_6.geometry} material={materials.Std_Eyelash} skeleton={nodes.CC_Base_Body_6.skeleton} morphTargetDictionary={nodes.CC_Base_Body_6.morphTargetDictionary} morphTargetInfluences={nodes.CC_Base_Body_6.morphTargetInfluences} scale={0.01} />
                <skinnedMesh name="CC_Base_Eye_1" geometry={nodes.CC_Base_Eye_1.geometry} material={materials.Std_Eye_R} skeleton={nodes.CC_Base_Eye_1.skeleton} morphTargetDictionary={nodes.CC_Base_Eye_1.morphTargetDictionary} morphTargetInfluences={nodes.CC_Base_Eye_1.morphTargetInfluences} scale={0.01} />
                <skinnedMesh name="CC_Base_Eye_2" geometry={nodes.CC_Base_Eye_2.geometry} material={materials.Std_Cornea_R} skeleton={nodes.CC_Base_Eye_2.skeleton} morphTargetDictionary={nodes.CC_Base_Eye_2.morphTargetDictionary} morphTargetInfluences={nodes.CC_Base_Eye_2.morphTargetInfluences} scale={0.01} />
                <skinnedMesh name="CC_Base_Eye_3" geometry={nodes.CC_Base_Eye_3.geometry} material={materials.Std_Eye_L} skeleton={nodes.CC_Base_Eye_3.skeleton} morphTargetDictionary={nodes.CC_Base_Eye_3.morphTargetDictionary} morphTargetInfluences={nodes.CC_Base_Eye_3.morphTargetInfluences} scale={0.01} />
                <skinnedMesh name="CC_Base_Eye_4" geometry={nodes.CC_Base_Eye_4.geometry} material={materials.Std_Cornea_L} skeleton={nodes.CC_Base_Eye_4.skeleton} morphTargetDictionary={nodes.CC_Base_Eye_4.morphTargetDictionary} morphTargetInfluences={nodes.CC_Base_Eye_4.morphTargetInfluences} scale={0.01} />
                <skinnedMesh name="CC_Base_EyeOcclusion_1" geometry={nodes.CC_Base_EyeOcclusion_1.geometry} material={materials.Std_Eye_Occlusion_R} skeleton={nodes.CC_Base_EyeOcclusion_1.skeleton} morphTargetDictionary={nodes.CC_Base_EyeOcclusion_1.morphTargetDictionary} morphTargetInfluences={nodes.CC_Base_EyeOcclusion_1.morphTargetInfluences} scale={0.01} />
                <skinnedMesh name="CC_Base_EyeOcclusion_2" geometry={nodes.CC_Base_EyeOcclusion_2.geometry} material={materials.Std_Eye_Occlusion_R} skeleton={nodes.CC_Base_EyeOcclusion_2.skeleton} morphTargetDictionary={nodes.CC_Base_EyeOcclusion_2.morphTargetDictionary} morphTargetInfluences={nodes.CC_Base_EyeOcclusion_2.morphTargetInfluences} scale={0.01} />
                <skinnedMesh name="CC_Base_TearLine_1" geometry={nodes.CC_Base_TearLine_1.geometry} material={materials.Std_Tearline_R} skeleton={nodes.CC_Base_TearLine_1.skeleton} morphTargetDictionary={nodes.CC_Base_TearLine_1.morphTargetDictionary} morphTargetInfluences={nodes.CC_Base_TearLine_1.morphTargetInfluences} scale={0.01} />
                <skinnedMesh name="CC_Base_TearLine_2" geometry={nodes.CC_Base_TearLine_2.geometry} material={materials.Std_Tearline_R} skeleton={nodes.CC_Base_TearLine_2.skeleton} morphTargetDictionary={nodes.CC_Base_TearLine_2.morphTargetDictionary} morphTargetInfluences={nodes.CC_Base_TearLine_2.morphTargetInfluences} scale={0.01} />
                <skinnedMesh name="CC_Base_Teeth_1" geometry={nodes.CC_Base_Teeth_1.geometry} material={materials.Std_Upper_Teeth} skeleton={nodes.CC_Base_Teeth_1.skeleton} morphTargetDictionary={nodes.CC_Base_Teeth_1.morphTargetDictionary} morphTargetInfluences={nodes.CC_Base_Teeth_1.morphTargetInfluences} scale={0.01} />
                <skinnedMesh name="CC_Base_Teeth_2" geometry={nodes.CC_Base_Teeth_2.geometry} material={materials.Std_Lower_Teeth} skeleton={nodes.CC_Base_Teeth_2.skeleton} morphTargetDictionary={nodes.CC_Base_Teeth_2.morphTargetDictionary} morphTargetInfluences={nodes.CC_Base_Teeth_2.morphTargetInfluences} scale={0.01} />
                <skinnedMesh name="CC_Base_Tongue" geometry={nodes.CC_Base_Tongue.geometry} material={materials.Std_Tongue} skeleton={nodes.CC_Base_Tongue.skeleton} morphTargetDictionary={nodes.CC_Base_Tongue.morphTargetDictionary} morphTargetInfluences={nodes.CC_Base_Tongue.morphTargetInfluences} scale={0.01} />
                <skinnedMesh name="Long_bangs" geometry={nodes.Long_bangs.geometry} material={materials['Hair_Transparency.001']} skeleton={nodes.Long_bangs.skeleton} morphTargetDictionary={nodes.Long_bangs.morphTargetDictionary} morphTargetInfluences={nodes.Long_bangs.morphTargetInfluences} scale={0.01} />
            </group>
        </group>
    )
}

useGLTF.preload('assets/character.glb')

//type ActionName = 'Idle02_1211|A|6556597243392_TempMotion' | 'Idle02_1211|K|Body|6556597243392_TempMotion' | 'Idle02_1211|K|Eye|6556597243392_TempMotion' | 'Idle02_1211|K|EyeOcclusion|6556597243392_TempMotion' | 'Idle02_1211|K|TearLine|6556597243392_TempMotion' | 'Idle02_1211|K|Teeth|6556597243392_TempMotion' | 'Idle02_1211|K|Tongue|6556597243392_TempMotion' | 'Idle02_1211|K|Long_bangs|6556597243392_TempMotion'

// interface GLTFAction extends THREE.AnimationClip {
//   name: ActionName
// }

// type GLTFResult = GLTF & {
//   nodes: {
//     High_Heels: THREE.SkinnedMesh
//     Jacket_1: THREE.SkinnedMesh
//     Jacket_2: THREE.SkinnedMesh
//     Pants_1: THREE.SkinnedMesh
//     Pants_2: THREE.SkinnedMesh
//     Side_part_mid: THREE.SkinnedMesh
//     Underwear_Bottoms: THREE.SkinnedMesh
//     CC_Base_Body_1: THREE.SkinnedMesh
//     CC_Base_Body_2: THREE.SkinnedMesh
//     CC_Base_Body_3: THREE.SkinnedMesh
//     CC_Base_Body_4: THREE.SkinnedMesh
//     CC_Base_Body_5: THREE.SkinnedMesh
//     CC_Base_Body_6: THREE.SkinnedMesh
//     CC_Base_Eye_1: THREE.SkinnedMesh
//     CC_Base_Eye_2: THREE.SkinnedMesh
//     CC_Base_Eye_3: THREE.SkinnedMesh
//     CC_Base_Eye_4: THREE.SkinnedMesh
//     CC_Base_EyeOcclusion_1: THREE.SkinnedMesh
//     CC_Base_EyeOcclusion_2: THREE.SkinnedMesh
//     CC_Base_TearLine_1: THREE.SkinnedMesh
//     CC_Base_TearLine_2: THREE.SkinnedMesh
//     CC_Base_Teeth_1: THREE.SkinnedMesh
//     CC_Base_Teeth_2: THREE.SkinnedMesh
//     CC_Base_Tongue: THREE.SkinnedMesh
//     Long_bangs: THREE.SkinnedMesh
//     CC_Base_BoneRoot: THREE.Bone
//   }
//   materials: {
//     High_Heels: THREE.MeshStandardMaterial
//     Jacket_Material: THREE.MeshStandardMaterial
//     Shirt_Material: THREE.MeshStandardMaterial
//     Pants_Material: THREE.MeshStandardMaterial
//     Belt_Material: THREE.MeshStandardMaterial
//     Hair_Transparency: THREE.MeshStandardMaterial
//     Underwear_Bottoms: THREE.MeshStandardMaterial
//     Std_Skin_Head: THREE.MeshStandardMaterial
//     Std_Skin_Body: THREE.MeshStandardMaterial
//     Std_Skin_Arm: THREE.MeshStandardMaterial
//     Std_Skin_Leg: THREE.MeshStandardMaterial
//     Std_Nails: THREE.MeshStandardMaterial
//     Std_Eyelash: THREE.MeshStandardMaterial
//     Std_Eye_R: THREE.MeshStandardMaterial
//     Std_Cornea_R: THREE.MeshPhysicalMaterial
//     Std_Eye_L: THREE.MeshStandardMaterial
//     Std_Cornea_L: THREE.MeshPhysicalMaterial
//     Std_Eye_Occlusion_R: THREE.MeshStandardMaterial
//     Std_Tearline_R: THREE.MeshStandardMaterial
//     Std_Upper_Teeth: THREE.MeshStandardMaterial
//     Std_Lower_Teeth: THREE.MeshStandardMaterial
//     Std_Tongue: THREE.MeshStandardMaterial
//     ['Hair_Transparency.001']: THREE.MeshStandardMaterial
//   }
//   animations: GLTFAction[]
// }
