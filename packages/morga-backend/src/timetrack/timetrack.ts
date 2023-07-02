import { IUser, ITimeTrack, ITimeTrackController } from "../models";
import { Level } from 'level'
import { Container, injectable, inject } from "inversify";

const container = new Container();
container.bind<Level>('Level').toConstantValue(new Level('./db'));

export class LevelTimeTrackController implements ITimeTrackController {
    constructor(private level: Level) {

    }

    async set(user: IUser, track: ITimeTrack) {
        await this.level.put(`track:${user.id}`, JSON.stringify(track));
        return true;
    }

    async remove(user: IUser, track: ITimeTrack) {
        await this.level.del(`track:${user.id}`);
        return true
    }

    async start(user: IUser) {
        const track = await this.get(user);
        if (track) {
            return track;
        }
        const newTrack: ITimeTrack = {
            id: -1,
            user,
            start: Date.now(),
            stop: undefined
        }
        await this.set(user, newTrack);
        return newTrack;
    }

    async stop(user: IUser) {
        const track = await this.get(user);
        if (!track) {
            return track;
        }
        track.stop = Date.now();
        await this.set(user, track);
        return track;
    }

    async get(user: IUser) {
        return null;
    }

    async getById(user: IUser, id: number) {
        return null;
    }

    async getAll(from: number, to: number) {
        return []
    }

    async reset(user: IUser) {
        return true;
    }
}
