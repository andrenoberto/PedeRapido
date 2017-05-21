import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {User} from "./user";

@Injectable()
export class OrderListData {

    constructor(private angularFire: AngularFire, private user: User) {
    }

    getList() {
        return this.angularFire.database.list('/orders', {
            query: {
                orderByChild: 'createdAt',
            }
        });
    }

    getUserList() {
        return this.angularFire.database.list('orders', {
            query: {
                orderByChild: 'email',
                //equalTo: this.user.profile.email
                equalTo: 'andre-noberto@hotmail.com'
            }
        })
            //.map((array) => array.reverse()) as FirebaseListObservable<any[]>;
    }

    getSingleItem(id) {
        return this.angularFire.database.list('/orders/' + id);
    }

}