import {Injectable, ViewChild} from '@angular/core';
import 'rxjs/add/operator/map';
import {LocalNotifications} from "@ionic-native/local-notifications";
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {Nav} from "ionic-angular";
import {Orders} from "../pages/orders/orders";

@Injectable()
export class Notifications {
    @ViewChild(Nav) nav: Nav;
    private notifications: FirebaseListObservable<any>;

    constructor(private angularFire: AngularFire, private localNotifications: LocalNotifications) {
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
            icon: 'res://icon_transparant'
        });
        this.localNotifications.on('click', () => {
            this.nav.setRoot(Orders);
        })
    }

    getList() {
        return this.angularFire.database.list('/notifications', {
            query: {
                orderByChild: 'createdAt',
            }
        });
    }

}
