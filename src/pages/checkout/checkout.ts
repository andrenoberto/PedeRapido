import {Component} from '@angular/core';
import {App, IonicPage, MenuController, NavController, NavParams, Platform} from 'ionic-angular';
import {DeliveryAddress} from "../../providers/delivery-address";
import {FormGroup} from "@angular/forms";
import {GenericMap} from "../generic-map/generic-map";
import {Order} from "../../providers/order";
import {Cart} from "../../providers/cart";
import {OrderListData} from "../../providers/order-list-data";
import {FirebaseListObservable} from "angularfire2";
import {LoadingMessage} from "../../providers/loading-message";
import * as firebase from 'firebase';
import {User} from "../../providers/user";
import {OrderDone} from "../order-done/order-done";
import {HomePage} from "../home/home";

@IonicPage()
@Component({
    selector: 'page-checkout',
    templateUrl: 'checkout.html',
})
export class Checkout {
    private orders: FirebaseListObservable<any>;
    form: FormGroup;
    paymentMethods: any = [
        {title: 'Dinheiro'},
    ];
    cancelButtonText = 'Cancelar';

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public deliveryAddress: DeliveryAddress,
                public platform: Platform,
                public order: Order,
                public cart: Cart,
                public orderListData: OrderListData,
                public loadingMessage: LoadingMessage,
                public user: User,
                public menuCtrl: MenuController,
                public app: App) {
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

    defineDestinationAddress() {
        this.navCtrl.push(GenericMap);
    }

    updateOrderChange() {
        this.order.updateChangeValue(this.cart.total);
    }

    onSubmit() {
        this.makeOrder();
    }

    makeOrder() {
        this.loadingMessage.presentGenericMessage('Realizando pedido...');
        this.orders = this.orderListData.getList();
        this.orders.push({
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            customer: this.order.customer,
            email: this.user.profile.email,
            paymentMethod: this.order.paymentMethod,
            change: this.order.changeNeeded,
            deliveryAddress: this.deliveryAddress.deliveryAddress,
            pos: {
                lat: this.deliveryAddress.lat,
                lng: this.deliveryAddress.lng
            },
            phone: this.order.phone,
            items: this.cart.items,
            totalValue: this.cart.total,
            status: 'Aguardando entregador'
        }).then(() => {
            this.loadingMessage.dismissAll();
            this.navCtrl.setRoot(OrderDone, {}, {animate: true, direction: 'forward'});
        });
    }
}
