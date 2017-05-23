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
import {UserList} from "../pages/user-list/user-list";
import {MyOrders} from "../pages/my-orders/my-orders";
import {BackgroundMode} from "@ionic-native/background-mode";
import {Notifications} from "../providers/notifications";
import {AdministrateOrders} from "../pages/administrate-orders/administrate-orders";
import {HeaderColor} from "@ionic-native/header-color";
//import {LocalNotifications} from "@ionic-native/local-notifications";

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
                private backgroundMode: BackgroundMode,
                private notifications: Notifications,
                private headerColor: HeaderColor,
                //private localNotifications: LocalNotifications
    ) {
        if (this.platform.is('cordova')) {
            this.splashScreen.show();
        }
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
            {title: 'Conectar-se', component: OAuthProvidersListPage, icon: 'log-in'},
            {title: 'Meu Perfil', component: Profile, icon: 'contact'},
        ];
        this.adminPages = [
            {title: 'Pedidos Em Espera', component: AdministrateOrders, icon: 'cube'},
            {title: 'Usuários', component: UserList, icon: 'people'},
        ];
    }

    initializeApp() {
        this.user.initialize();
        this.buildMenu();

        this.platform.ready().then(() => {
            /*
             Background mode default actions
             */
            if (this.platform.is('cordova')) {
                this.notifications.initialize();
                this.backgroundMode.enable();
                this.backgroundMode.configure({silent: true});
                this.headerColor.tint('#e74c3c');
                /*this.backgroundMode.on('activate').subscribe(() => {
                 this.localNotifications.schedule({
                 id: 1,
                 title: "back",
                 text: 'estou nas costas usando subscribe',
                 at: new Date(new Date().getTime() + 1),
                 icon: 'http://aux.iconpedia.net/uploads/box-big-icon-32.png'
                 })
                 });*/
                /*
                 Other necessary stuff
                 */
                this.statusBar.styleDefault();
                this.statusBar.backgroundColorByHexString('#C92918');
                this.splashScreen.hide();
            }
        });
    }

    openPage(page) {
        this.nav.setRoot(page.component, {}, {animate: true, direction: 'forward'});
    }
}

