import { useCallback, useState } from "react";

export function useModalSaveTime(){
    const [modalStatus, setModalStatus] = useState<boolean>(false);

    const closeModal = useCallback(() => {        
        setModalStatus(false);
    }, [])

    const openModal = useCallback(() => {
        setModalStatus(true);
    }, [])
    // closeSaveTimeModal
    // openSaveTimeModal
    // modalSaveTime
    return {modalStatus, openModal, closeModal}
    
}