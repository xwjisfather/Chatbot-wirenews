'use client';

import { ReactNode, useEffect, useState } from "react";
import "./three-controller.css";
import { Canvas } from "@react-three/fiber";
import { Environment, Stage, Stats } from "@react-three/drei";
import { CameraDebugger } from "./camera-debugger";

interface ThreeControllerProps {
    character: ReactNode;
    scene?: ReactNode;
    cameraDebug?: boolean;
    stats?: boolean;
    children?: ReactNode[];
}

export function ThreeController(props: ThreeControllerProps) {

    return (
        <div className='canvas-container'>
            <Canvas gl={{ alpha: true }} shadows={true}>
                <Environment path='assets/' files={'night.hdr'} />
                {/* <Stage adjustCamera={false} environment={null} intensity={0.8}> */}
                {props.character}
                {props?.scene}
                {/* </Stage> */}
                {props.stats && <Stats />}
                {props.cameraDebug && <CameraDebugger orbitControls={false} />}
            </Canvas>
        </div>
    );

}
