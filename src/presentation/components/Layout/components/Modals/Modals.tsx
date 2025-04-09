import { EVENT } from "@src/application/services/EventService/EventList";
import { observer } from "mobx-react-lite";
import { useEventServiceData } from "@src/application/hooks/useEventServiceData";
import { useCallback } from "react";
import { eventService } from "@src/application/services/EventService/EventService";
import { ModalAuth } from "@src/presentation/components/ModalAuth";
import { ErrorModal } from "@src/presentation/components/Modals/ErrorModal";
import { ScanModal } from "@src/presentation/components/Modals/ScanModal";
import { AddCardModal } from "@src/presentation/components/Modals/AddCardModal";

export const Modals = observer(() => {
    const [authState] = useEventServiceData(EVENT.MODAL_AUTH);
    const [errorState] = useEventServiceData(EVENT.MODAL_ERROR);
    const [scanState] = useEventServiceData(EVENT.MODAL_SCAN);
    const [addCardState] = useEventServiceData(EVENT.MODAL_ADD_CARD);
    
    const onClose = useCallback((modal: EVENT) => {
        eventService.emit(modal, { isActive: false });
    }, []);

    return (
        <>
            {authState?.isActive && (
                <ModalAuth
                    key={EVENT.MODAL_AUTH}
                    onClose={() => onClose(EVENT.MODAL_AUTH)}
                />
            )}
            {scanState?.isActive && (
                <ScanModal
                    key={EVENT.MODAL_SCAN}
                    onClose={() => onClose(EVENT.MODAL_SCAN)}
                />
            )}
            {addCardState?.isActive && (
                <AddCardModal
                    key={EVENT.MODAL_ADD_CARD}
                    onClose={() => onClose(EVENT.MODAL_ADD_CARD)}
                    successCb={(id: number) => {
                        addCardState.successCb?.(id);
                        onClose(EVENT.MODAL_ADD_CARD);
                    }}
                />
            )}
            {errorState?.isActive && (
                <ErrorModal
                    key={EVENT.MODAL_AUTH}
                    message={errorState.message}
                    text={errorState.text}
                    onClose={() => onClose(EVENT.MODAL_ERROR)}
                />
            )}
        </>
    );
});
