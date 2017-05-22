import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {LocalNotifications} from "@ionic-native/local-notifications";
import {AngularFire, FirebaseListObservable} from "angularfire2";

@Injectable()
export class Notifications {
    private notifications: FirebaseListObservable<any>;

    constructor(private angularFire: AngularFire, private localNotifications: LocalNotifications) {
    }

    initialize() {
        this.notifications = this.getList();
        this.notifications.subscribe((data) => {
            if (data != undefined) {
                this.scheduleNotification(data[0].$value);
            }
        });
    }

    scheduleNotification(text: string) {
        this.localNotifications.schedule({
            id: 1,
            title: "O status do seu pedido mudou!",
            text: text,
            led: 'FF0000',
            at: new Date(new Date().getTime() + 10),
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
