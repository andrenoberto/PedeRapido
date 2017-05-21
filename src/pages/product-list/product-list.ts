import {Component} from '@angular/core';
import {
    ActionSheetController, AlertController, App, IonicPage, MenuController, NavController,
    NavParams, Platform
} from 'ionic-angular';
import {ProductListData} from "../../providers/product-list-data";
import {LoadingMessage} from "../../providers/loading-message";
import {FirebaseListObservable} from "angularfire2";
import {ProductDetail} from "../product-detail/product-detail";
import {HomePage} from "../home/home";

@IonicPage()
@Component({
    selector: 'page-product-list',
    templateUrl: 'product-list.html',
})
export class ProductList {
    private products: FirebaseListObservable<any>;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public platform: Platform,
                public app: App,
                public alertCtrl: AlertController,
                public actionSheetCtrl: ActionSheetController,
                public loadingMessage: LoadingMessage,
                public productListData: ProductListData,
                public menuCtrl: MenuController) {
        loadingMessage.presentGenericMessage();
        this.products = productListData.getList();
        this.products.subscribe(() => {
            loadingMessage.dismissAll();
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

    addProduct() {
        let prompt = this.alertCtrl.create({
            title: 'Novo produto',
            message: 'Informe os dados do produto a ser cadastrado.',
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Nome do produto'
                },
                {
                    name: 'value',
                    type: 'number',
                    placeholder: 'Valor unitário'
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                },
                {
                    text: 'Salvar',
                    handler: data => {
                        this.products.push({
                            name: data.name,
                            value: data.value
                        })
                    }
                }
            ]
        });
        prompt.present();
    }

    orderProduct(productKey, productName, productValue) {
        this.navCtrl.push(ProductDetail, {
            key: productKey,
            name: productName,
            value: productValue
        });
    }

    showOptions(productKey, productName, productValue) {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Escolha uma ação',
            buttons: [
                {
                    text: 'Atualizar',
                    handler: () => {
                        this.updateProduct(productKey, productName, productValue);
                    }
                },
                {
                    text: 'Deletar',
                    role: 'destructive',
                    handler: () => {
                        this.removeProduct(productKey);
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel',
                }
            ]
        });
        actionSheet.present();
    }

    removeProduct(productKey: string) {
        let prompt = this.alertCtrl.create({
            title: 'Remover produto da lista?',
            message: 'Você realmente deseja remover este produto da lista de produtos?',
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
                        this.products.remove(productKey);
                    }
                }
            ]
        });
        prompt.present();
    }

    updateProduct(productId, productName, productValue) {
        let prompt = this.alertCtrl.create({
            title: 'Editar Produto',
            message: 'Atualize as informações deste produto.',
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Nome do produto',
                    value: productName,
                },
                {
                    name: 'value',
                    type: 'number',
                    placeholder: 'Valor unitário',
                    value: productValue,
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                },
                {
                    text: 'Salvar',
                    handler: data => {
                        this.products.update(productId, {
                            name: data.name,
                            value: data.value,
                        })
                    }
                }
            ]
        });
        prompt.present();
    }
}
