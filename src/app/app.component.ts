import {Component, ViewChild} from '@angular/core';
import {Events, Platform, App, Nav} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {ProductList} from "../pages/product-list/product-list";
import {User} from "../providers/user";
import {OAuthProvidersListPage} from "../pages/oauth/list/oauth-providers.list.page";
import {Profile} from "../pages/profile/profile";
import {MyCart} from "../pages/my-cart/my-cart";
import {OrderDone} from "../pages/order-done/order-done";
import {UserList} from "../pages/user-list/user-list";
import {MyOrders} from "../pages/my-orders/my-orders";
import {BackgroundMode} from "@ionic-native/background-mode";

@Component({
    templateUrl: 'app.html'
})

export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;

    mainPages: Array<{ title: string, component: any, icon: string }>;
    storePages: Array<{ title: string, component: any, icon: string }>;
    profilePages: Array<{ title: string, component: any, icon: string }>;
    adminPages: Array<{ title: string, component: any, icon: string }>;

    constructor(private platform: Platform,
                private statusBar: StatusBar,
                private splashScreen: SplashScreen,
                private events: Events,
                private user: User,
                private app: App,
                private backgroudMode: BackgroundMode) {
        this.initializeApp();
    }

    onMenuOpened() {
        this.events.publish('onMenuOpened');
    }

    onMenuClosed() {
        this.events.publish('onMenuClosed');
    }

    buildMenu() {
        this.mainPages = [
            {title: 'Home', component: HomePage, icon: 'home'},
        ];
        this.storePages = [
            {title: 'Produtos', component: ProductList, icon: 'pricetags'},
            {title: 'Meu Carrinho', component: MyCart, icon: 'cart'},
            {title: 'Meus Pedidos', component: MyOrders, icon: 'cube'}
        ];
        this.profilePages = [
            {title: 'Minha Sessão', component: OAuthProvidersListPage, icon: 'log-in'},
            {title: 'Meu Perfil', component: Profile, icon: 'contact'},
        ];
        this.adminPages = [
            {title: 'Pedido Realizado', component: OrderDone, icon: 'home'},
            {title: 'Usuários', component: UserList, icon: 'people'},
        ];
    }

    initializeApp() {
        this.user.initialize();
        this.buildMenu();

        this.platform.ready().then(() => {
            this.backgroudMode.enable();
            this.statusBar.styleDefault();
            this.statusBar.backgroundColorByName('blue');
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        this.nav.setRoot(page.component, {}, {animate: true, direction: 'forward'});
    }
}

