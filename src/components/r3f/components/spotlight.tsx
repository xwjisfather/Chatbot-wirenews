'use client';

import { useRef, useEffect } from 'react';
import { useThree, SpotLightProps as FiberSpotLightProps } from '@react-three/fiber';
import { SpotLightHelper } from 'three';

interface SpotLightProps extends FiberSpotLightProps {
    helper?: boolean;
    [key: string]: any;
}

export function SpotLight({ helper = false, ...props }: SpotLightProps) {
    const light = useRef(null);
    const { scene } = useThree();

    useEffect(() => {
        if (light.current && helper) {
            const lightHelper = new SpotLightHelper(light.current);
            scene.add(lightHelper);
            return () => {
                scene.remove(lightHelper);
                lightHelper.dispose();
            };
        }
    }, [helper, scene]);

    return (
        <spotLight
            ref={light}
            {...props} // Pass in additional props
        />
    );
}
