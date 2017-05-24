import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-orders',
    templateUrl: 'orders.html',
})
export class Orders {

    constructor(private navCtrl: NavController,
                private navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Orders');
    }

}
