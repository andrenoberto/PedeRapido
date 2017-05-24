import {Component} from '@angular/core';
import {AlertController, App, IonicPage, MenuController, NavController, NavParams, Platform} from 'ionic-angular';
import {Cart} from "../../providers/cart";
import {Checkout} from "../checkout/checkout";
import {Order} from "../../providers/order";
import {HomePage} from "../home/home";
import {User} from "../../providers/user";

@IonicPage()
@Component({
    selector: 'page-my-cart',
    templateUrl: 'my-cart.html',
})
export class MyCart {
    public userProfile;

    constructor(private navCtrl: NavController,
                private navParams: NavParams,
                private cart: Cart,
                private alertCtrl: AlertController,
                private order: Order,
                private platform: Platform,
                private app: App,
                private menuCtrl: MenuController,
                private user: User) {
        this.user.initialize();
        this.userProfile = this.user;
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

    removeProductFromCart(productKey) {
        let prompt = this.alertCtrl.create({
            title: 'Remover produto do carrinho?',
            message: 'Você realmente deseja remover este produto do seu carrinho de compras?',
            buttons: [
                {
                    text: 'Cancelar',
                    handler: () => {
                        return;
                    }
                },
                {
                    text: 'Remover',
                    handler: () => {
                        let index = this.cart.findIndexByKey(productKey);
                        if (index >= 0) {
                            this.cart.total -= parseFloat(this.cart.items[index].total);
                            this.cart.items.splice(index, 1);
                            this.order.updateChangeValue(this.cart.total);
                        }
                        return;
                    }
                }
            ]
        });
        prompt.present();
    }

    updateProduct(productKey, amountOfItems) {
        let prompt = this.alertCtrl.create({
            title: 'Editar Produto',
            message: 'Atualize a quantidade de itens deste produto em seu carrinho.',
            inputs: [
                {
                    name: 'amount',
                    type: 'number',
                    placeholder: 'Quantidade de itens',
                    value: amountOfItems,
                },
            ],
            buttons: [
                {
                    text: 'Cancelar',
                },
                {
                    text: 'Salvar',
                    handler: data => {
                        this.updateProductNumberOfItems(productKey, data.amount);
                    }
                }
            ]
        });
        prompt.present();
    }

    updateProductNumberOfItems(productKey, amountOfItems) {
        let index = this.cart.findIndexByKey(productKey);
        if (index >= 0) {
            this.cart.total -= parseFloat(this.cart.items[index].total);
            this.cart.items[index].amount = amountOfItems;
            this.cart.items[index].total = parseFloat(this.cart.items[index].value) * amountOfItems;
            this.cart.total += parseFloat(this.cart.items[index].total);
            this.order.updateChangeValue(this.cart.total);
        }
    }

    goToCheckout() {
        this.navCtrl.push(Checkout);
    }
}
