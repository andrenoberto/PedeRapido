import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductDetail } from './product-detail';

@NgModule({
  declarations: [
    ProductDetail,
  ],
  imports: [
    IonicPageModule.forChild(ProductDetail),
  ],
  exports: [
    ProductDetail
  ]
})
export class ProductDetailModule {}
