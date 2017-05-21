import {Component} from '@angular/core';
import {App, IonicPage, MenuController, NavController, NavParams, Platform} from 'ionic-angular';
import {OrderListData} from "../../providers/order-list-data";
import {FirebaseListObservable} from "angularfire2";
import {LoadingMessage} from "../../providers/loading-message";
import {HomePage} from "../home/home";

@IonicPage()
@Component({
    selector: 'page-my-orders',
    templateUrl: 'my-orders.html',
})
export class MyOrders {
    private myOrders: FirebaseListObservable<any>;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private platform: Platform,
                private app: App,
                private orderListData: OrderListData,
                private loadingMessage: LoadingMessage,
                private menuCtrl: MenuController) {
        loadingMessage.presentGenericMessage();
        this.myOrders = this.orderListData.getUserList();
        this.myOrders.subscribe(() => {
            this.loadingMessage.dismissAll();
        });
    }

    ionViewDidEnter() {
        this.platform.registerBackButtonAction(() => {
            if (this.menuCtrl.isOpen()) {
                this.menuCtrl.close();
            } else if (this.app.getActiveNav().canGoBack()) {
                this.navCtrl.pop();
            } else {
                this.navCtrl.setRoot(HomePage, {}, {animate: true, direction: 'back'});
            }
        }, 100);
    }

    getOrderedProductsList(items: any) {
        var content = items[0].amount + 'x ' + items[0].name;
        if (items.length > 0) {
            for (var i = 1; i < items.length; i++) {
                content += ', ' + items[0].amount + 'x ' + items[0].name;
            }
        }
        return content;
    }
}
