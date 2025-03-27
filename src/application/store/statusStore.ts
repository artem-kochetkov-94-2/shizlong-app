import { makeAutoObservable, observable, action, computed } from "mobx";

type Status = 'success' | 'error';

interface StatusState {
    status: Status;
    message: string;
    text?: string;
}

interface State {
    isLoading: boolean;
    status: StatusState | null;
}

export class StatusStore<T extends string> {
    @observable private _statusMap: Map<T, State> = new Map();

    constructor() {
        makeAutoObservable(this);
    }

    @computed
    get statusMap() {
        return this._statusMap;
    }

    @computed
    get defaultActionState() {
        return {
            isLoading: false,
            status: null,
        };
    }

    @action
    setState(key: T, state: Partial<State>) {
        const currentState = this._statusMap.get(key) || this.defaultActionState;
        this._statusMap.set(key, { ...currentState, ...state });
    }

    @action
    clearState(key: T) {
        const currentState = this._statusMap.get(key);
        if (currentState) {
            this._statusMap.set(key, this.defaultActionState);
        }
    }

    @action
    deleteState(key: T) {
        this._statusMap.delete(key);
    }

    getState(key: T) {
        return this._statusMap.get(key) || this.defaultActionState;
    }
}