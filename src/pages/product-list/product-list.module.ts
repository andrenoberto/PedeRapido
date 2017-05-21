import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductList } from './product-list';

@NgModule({
  declarations: [
    ProductList,
  ],
  imports: [
    IonicPageModule.forChild(ProductList),
  ],
  exports: [
    ProductList
  ]
})
export class ProductListModule {}
