import {Injectable} from '@angular/core';

@Injectable()
export class ProfileMenu {
    public userOnlineStatus: boolean = false;

    constructor() {
    }

    autoChangeStatus() {
        this.userOnlineStatus = !this.userOnlineStatus;
    }
}
