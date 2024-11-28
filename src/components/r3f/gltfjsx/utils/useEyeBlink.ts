import { useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function useEyeBlink(
    eyeDictionary: number[],
    node: any
) {
    const [blinkProgress, setBlinkProgress] = useState(0);
    const [isBlinking, setIsBlinking] = useState(false);

    useEffect(() => {
        // blink cycle
        const blinkInterval = setInterval(() => {
            setIsBlinking(true);
            setBlinkProgress(0);
        }, Math.random() * 3000 + 3000);

        return () => clearInterval(blinkInterval);
    }, []);

    useFrame((state, delta) => {
        if (isBlinking) {
            // blink animation progress
            setBlinkProgress((prev) => {
                const newProgress = prev + delta * 5;
                return newProgress >= 1 ? (setIsBlinking(false), 1) : newProgress;
            });

            const blinkValue = THREE.MathUtils.lerp(1, 0, blinkProgress);
            eyeDictionary.forEach((eye) => {
                node.morphTargetInfluences[eye] = blinkValue;
            });
        }
    });
}