export enum EVENT {
    MODAL_AUTH = 'MODAL_AUTH',
    MODAL_ERROR = 'MODAL_ERROR',
    MODAL_SCAN = 'MODAL_SCAN',
    MODAL_ADD_CARD = 'MODAL_ADD_CARD',
};

export type EVENT_DATA = {
    [EVENT.MODAL_AUTH]: { isActive: boolean; };
    [EVENT.MODAL_ERROR]: { isActive: boolean; message: string; text?: string | string[] };
    [EVENT.MODAL_SCAN]: { isActive: boolean; };
    [EVENT.MODAL_ADD_CARD]: { isActive: boolean; successCb?: (token: string, session: string) => void };
};
