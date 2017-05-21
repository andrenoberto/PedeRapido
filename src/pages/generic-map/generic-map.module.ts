import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GenericMap } from './generic-map';

@NgModule({
  declarations: [
    GenericMap,
  ],
  imports: [
    IonicPageModule.forChild(GenericMap),
  ],
  exports: [
    GenericMap
  ]
})
export class GenericMapModule {}
