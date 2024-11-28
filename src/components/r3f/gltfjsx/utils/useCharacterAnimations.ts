import { useEffect, useState } from 'react';
import { AnimationAction } from 'three';
import { registerSetAnimationStateCallback } from './setAnimationCallback';

export function useCharacterAnimation(
    actions: { [x: string]: AnimationAction | null; },
    defaultState: string
) {

    const [animationState, setAnimationState] = useState(defaultState);
    registerSetAnimationStateCallback(setAnimationState);

    useEffect(() => {
        Object.keys(actions).forEach(key => {
            if (key.toLowerCase().includes(animationState.toLowerCase())) {
                actions[key]?.reset().fadeIn(0.5).play();
            }
        });
    }, [animationState, actions]);

    return { animationState, setAnimationState };
}
