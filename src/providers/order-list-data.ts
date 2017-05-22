import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AngularFire} from "angularfire2";

@Injectable()
export class OrderListData {

    constructor(private angularFire: AngularFire) {
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