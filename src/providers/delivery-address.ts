import {Injectable} from '@angular/core';

@Injectable()
export class DeliveryAddress {
  public deliveryAddress: any;
  public lat: any;
  public lng: any;

  constructor() {
  }

  setDeliveryAddress(address) {
    this.deliveryAddress = address;
  }
}