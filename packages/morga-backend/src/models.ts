
export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    permissions: string[];
}

export interface ITimeTrack {
    id: number;
    user: IUser;
    start: number;
    stop?: number;
}

export interface ITimeTrackController {
    start(user: IUser): Promise<ITimeTrack>;
    get(user: IUser): Promise<ITimeTrack | null>;
    getById(user: IUser, id: number): Promise<ITimeTrack | null>;
    getAll(from: number, to: number): Promise<ITimeTrack[]>;
    stop(user: IUser): Promise<ITimeTrack | null>;
    reset(user: IUser): Promise<boolean>
    set(user: IUser, track: ITimeTrack): Promise<boolean>;
    remove(user: IUser, track: ITimeTrack): Promise<boolean>;
}