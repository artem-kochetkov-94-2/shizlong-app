export enum EVENT {
    MODAL_AUTH = 'MODAL_AUTH',
};

export type EVENT_DATA = {
    [EVENT.MODAL_AUTH]: { isActive: boolean; };
};
