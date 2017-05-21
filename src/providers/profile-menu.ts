import {Injectable} from '@angular/core';

@Injectable()
export class ProfileMenu {
    public userOnlineStatus: boolean = false;

    constructor() {
    }

    autoChangeStatus(status: boolean) {
        this.userOnlineStatus = status;
    }
}
