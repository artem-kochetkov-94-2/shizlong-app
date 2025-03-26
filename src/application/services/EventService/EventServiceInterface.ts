import { EVENT, EVENT_DATA } from './EventList';

export interface EventServiceInterface {
    emit(name: EVENT, data: EVENT_DATA[EVENT]): this;
    on(name: EVENT, callback: (data?: EVENT_DATA[typeof name]) => void): () => void;
}


