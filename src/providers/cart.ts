import {Injectable} from '@angular/core';
import {Order} from "./order";

@Injectable()
export class Cart {

  public items = [];
  public total = 0;

  constructor(public order: Order) {

  }

  addItem(item) {
    let index = this.findIndexByKey(item.key);
    if (index >= 0) {
      this.items[index].amount = (parseInt(this.items[index].amount) + parseInt(item.amount));
      //Remove product total value from our cart total value.
      this.total -= parseFloat(this.items[index].total);
      this.items[index].total = (parseFloat(this.items[index].value) * parseInt(this.items[index].amount));
      //Update with new product total value.
      this.total += parseFloat(this.items[index].total);
      return;
    }
    this.items.push({
      key: item.key,
      amount: item.amount,
      name: item.name,
      total: item.total,
      value: item.value
    });
    this.calculateTotal();
  }

  findIndexByKey(productKey) {
    return this.items.findIndex(product => product.key == productKey);
  }

  calculateTotal() {
    let total = 0;
    this.items.forEach((item) => {
      total += Number(item.value * item.amount);
    });
    this.total = total;
    this.order.updateChangeValue(this.total);
  }

}