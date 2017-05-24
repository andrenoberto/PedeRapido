import {Injectable, ViewChild} from '@angular/core';
import 'rxjs/add/operator/map';
import {LocalNotifications} from "@ionic-native/local-notifications";
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {Nav} from "ionic-angular";
import {Orders} from "../pages/orders/orders";
import {User} from "./user";

@Injectable()
export class Notifications {
    @ViewChild(Nav) nav: Nav;
    //public notifications: FirebaseListObservable<any>;

    constructor(private angularFire: AngularFire, private localNotifications: LocalNotifications, private user: User) {
    }

    initialize() {
        /*this.notifications = this.getList();
        this.notifications.subscribe((data) => {
            if (data != undefined) {
                this.scheduleNotification(data[0].status, data[0].$key);
            }
        });*/
    }

    scheduleNotification(text: string, key: string) {
        /*this.localNotifications.schedule({
            id: 1,
            title: "O status do seu pedido mudou!",
            text: text,
            led: 'FF0000',
            at: new Date(new Date().getTime()),
            icon: 'res://icon_transparant'
        });
        this.notifications.remove(key);
        this.localNotifications.on('click', () => {
            this.nav.setRoot(Orders);
        })*/
    }

    getList() {
        /*if (this.user.profile != undefined) {
            return this.angularFire.database.list('/notifications', {
                query: {
                    orderByChild: 'email',
                    equalTo: this.user.profile.email
                }
            });
        }*/
    }

}
