import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {LocalNotifications} from "@ionic-native/local-notifications";
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {BackgroundMode} from "@ionic-native/background-mode";

@Injectable()
export class Notifications {
    private notifications: FirebaseListObservable<any>;

    constructor(private angularFire: AngularFire, private localNotifications: LocalNotifications, private backgroundMode: BackgroundMode) {
    }

    initialize() {
        this.notifications = this.getList();
        this.notifications.subscribe((data) => {
            if (data != undefined) {
                this.scheduleNotification(data[0].status);
            }
        });
    }

    scheduleNotification(text: string) {
        this.localNotifications.schedule({
            id: 1,
            title: "O status do seu pedido mudou!",
            text: text,
            led: 'FF0000',
            at: new Date(new Date().getTime()),
            icon: 'http://aux.iconpedia.net/uploads/box-big-icon-32.png'
        });
    }

    getList() {
        return this.angularFire.database.list('/notifications', {
            query: {
                orderByChild: 'createdAt',
            }
        });
    }

}
