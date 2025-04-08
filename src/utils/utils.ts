// import { useCallback } from "react";

export function getTime(timestamp: number): string {
    console.log(new Date(timestamp).toISOString().slice(11, 19));
    return new Date(timestamp).toISOString().slice(11, 19);
}

// export const openSaveTimeModal = useCallback((timerStarted:boolean | string, setModalSaveTime:React.Dispatch<React.SetStateAction<boolean>>): void => {
//     (timerStarted as boolean) !? setModalSaveTime(true) : null;
// }, [])