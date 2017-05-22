import {Component} from '@angular/core';
import {App, IonicPage, MenuController, NavController, NavParams, Platform} from 'ionic-angular';
import {ProductList} from "../product-list/product-list";
import {Cart} from "../../providers/cart";

@IonicPage()
@Component({
    selector: 'page-product-detail',
    templateUrl: 'product-detail.html',
})
export class ProductDetail {
    public product = {
        key: '',
        amount: 1,
        total: 0,
        name: '',
        value: 0,
    };

    constructor(private navCtrl: NavController,
                private navParams: NavParams,
                private cart: Cart,
                private menuCtrl: MenuController,
                private platform: Platform,
                private app: App) {
        this.product.key = this.navParams.get('key');
        this.product.total = this.navParams.get('value');
        this.product.name = this.navParams.get('name');
        this.product.value = this.navParams.get('value');
    }

    ionViewDidEnter() {
        this.platform.registerBackButtonAction(() => {
            if (this.menuCtrl.isOpen()) {
                this.menuCtrl.close();
            } else if (this.app.getActiveNav().canGoBack()) {
                this.navCtrl.pop();
            }
        }, 100);
    }

    updateTotalValue() {
        this.product.total = this.product.value * Math.abs(Math.floor(this.product.amount));
    }

    addToCart() {
        this.cart.addItem(this.product);
        this.navCtrl.setRoot(ProductList);
    }
}
