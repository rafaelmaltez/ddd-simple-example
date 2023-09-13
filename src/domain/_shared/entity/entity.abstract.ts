import { UUID } from 'crypto';
import { Notification } from '../notification/notification'

export abstract class Entity {
    protected _id?: UUID;
    public notification: Notification;

    constructor(){
        this.notification = new Notification()
    }

    get id() {
        return this._id
    }

}