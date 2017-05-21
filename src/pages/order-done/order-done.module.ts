import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderDone } from './order-done';

@NgModule({
  declarations: [
    OrderDone,
  ],
  imports: [
    IonicPageModule.forChild(OrderDone),
  ],
  exports: [
    OrderDone
  ]
})
export class OrderDoneModule {}
