import { EVENT } from "@src/application/services/EventService/EventList";
import { observer } from "mobx-react-lite";
import { useEventServiceData } from "@src/application/hooks/useEventServiceData";
import { useCallback } from "react";
import { eventService } from "@src/application/services/EventService/EventService";

export const Modals = observer(() => {
    const [isAuthState] = useEventServiceData(EVENT.MODAL_AUTH);

    const onClose = useCallback((modal: EVENT) => {
        eventService.emit(modal, { isActive: false });
    }, []);

    return (
        <>
            {/* {isAuthState?.active && (
                <ModalAuth
                    key={EVENT.MODAL_AUTH}
                    onClose={() => onClose(EVENT.MODAL_AUTH)}
                />
            )} */}
        </>
    );
});
