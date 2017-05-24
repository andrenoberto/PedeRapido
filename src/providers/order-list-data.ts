import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AngularFire} from "angularfire2";
import {User} from "./user";

@Injectable()
export class OrderListData {

    constructor(private angularFire: AngularFire, private user: User) {
        this.user.initialize();
    }

    getList() {
        return this.angularFire.database.list('/orders', {
            query: {
                orderByChild: 'createdAt',
            }
        });
    }

    getUnorderedList() {
        return this.angularFire.database.list('/orders');
    }

    getUserList() {
        if (this.user.profile) {
            return this.angularFire.database.list('orders', {
                query: {
                    orderByChild: 'email',
                    //equalTo: this.user.profile.email
                    equalTo: this.user.profile.email
                }
            })
            //.map((array) => array.reverse()) as FirebaseListObservable<any[]>;
        } else {
            return;
        }
    }

    getSingleItem(id) {
        return this.angularFire.database.list('/orders/' + id);
    }

}