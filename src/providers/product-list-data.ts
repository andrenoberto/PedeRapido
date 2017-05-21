import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AngularFire} from "angularfire2";

@Injectable()
export class ProductListData {

    constructor(private angularFire: AngularFire) {
    }

    getList() {
        return this.angularFire.database.list('/products', {
            query: {
                orderByChild: 'name',
            }
        });
    }

    getSingleItem(id) {
        return this.angularFire.database.list('/products/' + id);
    }

}
