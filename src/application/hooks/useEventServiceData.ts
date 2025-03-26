import { EVENT, EVENT_DATA } from "@src/application/services/EventService/EventList";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { eventService } from "@src/application/services/EventService/EventService";

export function useEventServiceData<E extends EVENT>(
    eventName: E,
    initData: EVENT_DATA[typeof eventName] | null = null,
): [
    EVENT_DATA[typeof eventName] | null,
    Dispatch<SetStateAction<EVENT_DATA[typeof eventName] | null>>,
] {
    const [state, setState] = useState<EVENT_DATA[typeof eventName] | null>(initData);

    useEffect(() => {
        return eventService.on(eventName, setState);
    }, []);

    return [state, setState];
};
