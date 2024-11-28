import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import * as THREE from 'three'

// viseme map details
// https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-speech-synthesis-viseme?tabs=visemeid&pivots=programming-language-javascript#viseme-id

export function useViseme(morphTargets: any[], visemeMap: { [key: number]: string }, strength: number, smoothing: number) {
    // viseme json data
    const [currentViseme, setCurrentViseme] = useState<any>();
    const [currentAudioTime, setCurrentAudioTime] = useState<number>(0);

    useFrame((state, delta) => {
        if (currentViseme !== undefined) {
            resetViseme();
            setViseme(currentAudioTime);
        }
    });


    function resetViseme() {
        Object.values(visemeMap).forEach((value) => {
            for (let j = 0; j < morphTargets.length; j++) {
                const morphTarget = morphTargets[j];
                const index = morphTarget.morphTargetDictionary[value];
                morphTarget.morphTargetInfluences[index] = THREE.MathUtils.lerp(
                    morphTarget.morphTargetInfluences[index],
                    0,
                    smoothing
                );
            }
        });
    }

    function setViseme(currentAudioTime: number) {
        for (let i = 0; i < currentViseme.mouthCues.length - 1; i++) {
            const mouthCue = currentViseme.mouthCues[i];
            const nextMouthCue = currentViseme.mouthCues[i + 1]
            if (currentAudioTime >= mouthCue.start && currentAudioTime <= nextMouthCue.start) {
                for (let j = 0; j < morphTargets.length; j++) {
                    const morphTarget = morphTargets[j];
                    const index = morphTarget.morphTargetDictionary[visemeMap[mouthCue.value]];
                    morphTarget.morphTargetInfluences[index] = THREE.MathUtils.lerp(
                        morphTarget.morphTargetInfluences[index],
                        strength,
                        smoothing
                    );
                }
                break;
            }
        }
    }




    return { setCurrentViseme, setCurrentAudioTime, currentViseme, currentAudioTime };
}

