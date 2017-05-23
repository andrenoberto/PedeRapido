import {Component} from '@angular/core';
import {App, IonicPage, MenuController, NavController, NavParams, Platform} from 'ionic-angular';
import {HomePage} from "../home/home";
import {FirebaseListObservable} from "angularfire2";
import {LoadingMessage} from "../../providers/loading-message";
import {OrderListData} from "../../providers/order-list-data";

@IonicPage()
@Component({
    selector: 'page-administrate-orders',
    templateUrl: 'administrate-orders.html',
})

export class AdministrateOrders {
    private orders: FirebaseListObservable<any>;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private platform: Platform,
                private menuCtrl: MenuController,
                private app: App,
                private orderListData: OrderListData,
                private loadingMessage: LoadingMessage) {
        loadingMessage.presentGenericMessage();
        this.orders = this.orderListData.getUserList();
        this.orders.subscribe(() => {
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
