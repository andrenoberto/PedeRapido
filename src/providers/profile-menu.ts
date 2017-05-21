import {Injectable} from '@angular/core';
import {User} from "./user";

@Injectable()
export class ProfileMenu {
    public userOnlineStatus = false;

    constructor(private user: User) {
    }

    autoChangeStatus() {
        this.userOnlineStatus = !this.userOnlineStatus;
    }
}
