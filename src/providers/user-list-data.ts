import {Injectable} from '@angular/core';
import {AngularFire} from "angularfire2";

@Injectable()
export class UserListData {

  constructor(public angularFire: AngularFire) {
  }

  getList() {
    return this.angularFire.database.list('/users', {
      query: {
        orderByChild: 'name',
      }
    });
  }

  findUserByLogin(login) {
    return this.angularFire.database.list('/users', {
      query: {
        orderByChild: 'username',
        equalTo: login
      }
    });
  }

  findUserByEmail(email) {
    return this.angularFire.database.list('/users', {
      query: {
        orderByChild: 'email',
        equalTo: email
      }
    });
  }
}