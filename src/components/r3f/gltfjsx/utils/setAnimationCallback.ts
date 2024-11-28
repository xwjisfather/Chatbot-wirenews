/*
  bad approach for creating global variable for callback
  will change to redux if the main app is ready
*/
let setAnimationStateCallback: React.Dispatch<React.SetStateAction<string>>;

export function registerSetAnimationStateCallback(callback: React.Dispatch<React.SetStateAction<string>>) {
    setAnimationStateCallback = callback;
}

export function setCharacterAnimation(state: string) {
    if (setAnimationStateCallback !== undefined) {
        setAnimationStateCallback(state);
    }
}
