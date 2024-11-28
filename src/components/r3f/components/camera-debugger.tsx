'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PointerLockControls } from '@react-three/drei';
import { Vector3 } from 'three';

export function CameraDebugger({ orbitControls = false }: { orbitControls?: boolean }) {
    const camera = useThree((state) => state.camera);
    const lastLoggedTimeRef = useRef<number>(0);
    const printDuration = 3;
    const moveForward = useRef(false);
    const moveBackward = useRef(false);
    const moveLeft = useRef(false);
    const moveRight = useRef(false);
    const cameraMoveSpeed = 0.1;

    // Update camera position
    useEffect(() => {
        if (orbitControls === true) return;
        let animationFrameId: number;
        const updateCameraPosition = () => {
            const direction = new Vector3();
            camera.getWorldDirection(direction);
            const rightVector = new Vector3(direction.z, 0, -direction.x).normalize();

            if (moveForward.current) {
                camera.position.addScaledVector(direction, cameraMoveSpeed);
            }
            if (moveBackward.current) {
                camera.position.addScaledVector(direction, -cameraMoveSpeed);
            }
            if (moveLeft.current) {
                camera.position.addScaledVector(rightVector, cameraMoveSpeed);
            }
            if (moveRight.current) {
                camera.position.addScaledVector(rightVector, -cameraMoveSpeed);
            }
            // limit camera position
            // camera.position.x = Math.max(-20, Math.min(20, camera.position.x));
            // camera.position.y = Math.max(-10, Math.min(1, camera.position.y));
            // camera.position.z = Math.max(-20, Math.min(20, camera.position.z));
            animationFrameId = requestAnimationFrame(updateCameraPosition);
        };
        updateCameraPosition();
        return () => cancelAnimationFrame(animationFrameId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Hnalde browser keyboard camera control
    useEffect(() => {
        if (orbitControls === true) return;
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key.toLowerCase()) {
                case 'w':
                    moveForward.current = true;
                    break;
                case 'a':
                    moveLeft.current = true;
                    break;
                case 's':
                    moveBackward.current = true;
                    break;
                case 'd':
                    moveRight.current = true;
                    break;
                default:
                    break;
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            switch (event.key.toLowerCase()) {
                case 'w':
                    moveForward.current = false;
                    break;
                case 'a':
                    moveLeft.current = false;
                    break;
                case 's':
                    moveBackward.current = false;
                    break;
                case 'd':
                    moveRight.current = false;
                    break;
                default:
                    break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        if (elapsedTime - lastLoggedTimeRef.current >= printDuration) {
            console.log('Camera Position:', camera.position);
            console.log('Camera Rotation:', camera.rotation);
            lastLoggedTimeRef.current = elapsedTime;
        }
    });

    return (orbitControls === true) ? <OrbitControls /> : <PointerLockControls pointerSpeed={0.1} />;
}
