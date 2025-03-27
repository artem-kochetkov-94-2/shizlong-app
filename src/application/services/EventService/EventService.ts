import { EventServiceInterface } from "./EventServiceInterface";
import { EVENT, EVENT_DATA } from "./EventList";

export class EventService implements EventServiceInterface {
    constructor(private readonly element = document.createElement('div')) {}

    emit<E extends EVENT>(name: E, data: EVENT_DATA[typeof name]): this {
        this.element.dispatchEvent(
            new CustomEvent<EVENT_DATA[typeof name]>(name, {
                detail: data
            }),
        );
        return this;
    }

    on<E extends EVENT>(name: E, callback: (data: EVENT_DATA[typeof name]) => void): () => void {
        // @ts-ignore
        const eventCallback = (e: CustomEventInit<EVENT_DATA[typeof name]>) => callback(e.detail);
        this.element.addEventListener(name, eventCallback);
        return () => this.element.removeEventListener(name, eventCallback);
    }
}

export const eventService = new EventService();
