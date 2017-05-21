import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyOrders } from './my-orders';

@NgModule({
  declarations: [
    MyOrders,
  ],
  imports: [
    IonicPageModule.forChild(MyOrders),
  ],
  exports: [
    MyOrders
  ]
})
export class MyOrdersModule {}
