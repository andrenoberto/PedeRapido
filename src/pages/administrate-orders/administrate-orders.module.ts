import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdministrateOrders } from './administrate-orders';

@NgModule({
  declarations: [
    AdministrateOrders,
  ],
  imports: [
    IonicPageModule.forChild(AdministrateOrders),
  ],
  exports: [
    AdministrateOrders
  ]
})
export class AdministrateOrdersModule {}
