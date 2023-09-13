import { Notification } from '../notification/notification'

export abstract class Entity {
    protected _id?: string;
    public notification: Notification;

    constructor(){
        this.notification = new Notification()
    }

    get id() {
        return this._id
    }

}