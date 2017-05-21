import {Component, Input} from '@angular/core';
import {App, IonicPage, MenuController, NavController, Platform} from 'ionic-angular';
import {HomePage} from "../home/home";

/**
 * Generated class for the OrderDone page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-order-done',
    templateUrl: 'order-done.html',
})
export class OrderDone {

    @Input() text: string = 'Pedido enviado com sucesso!';
    @Input() icon: string = 'checkmark-circle';

    constructor(public navCtrl: NavController,
                public app: App,
                public platform: Platform,
                public menuCtrl: MenuController) {
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

    goToHomePage() {
        this.navCtrl.setRoot(HomePage);
    }
}
