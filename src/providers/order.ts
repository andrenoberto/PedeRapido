import {Injectable} from '@angular/core';
import {User} from "./user";
import {Platform} from "ionic-angular";

@Injectable()
export class Order {
  customer: any;
  customerEmail: any;
  paymentMethod: any;
  address: any;
  addressNumber: any;
  phone: any;
  change: number;
  changeNeeded: number;

  constructor(private user: User, private platform: Platform) {
    this.initializeValues();
  }

  initializeValues() {
    if (this.platform.is('cordova')) {
      this.customer = this.user.profile.name;
      this.customerEmail = this.user.profile.email;
    }
    this.changeNeeded = 0;
  }

  updateChangeValue(total) {
    if (this.change > total) {
      this.changeNeeded = this.change - total;
    } else {
      this.changeNeeded = 0;
    }
  }
}