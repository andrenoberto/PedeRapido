import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MyCart} from './my-cart';

@NgModule({
    declarations: [
        MyCart,
    ],
    imports: [
        IonicPageModule.forChild(MyCart),
    ],
    exports: [
        MyCart
    ]
})
export class MyCartModule {
}
