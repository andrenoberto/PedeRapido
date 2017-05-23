import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ProductListData} from "../providers/product-list-data";
import {ProductListModule} from "../pages/product-list/product-list.module";
import {ProductDetailModule} from "../pages/product-detail/product-detail.module";
import {LoadingMessage} from "../providers/loading-message";
import {AngularFireModule} from "angularfire2";
import {Cart} from "../providers/cart";
import {DeliveryAddress} from "../providers/delivery-address";
import {Order} from "../providers/order";
import {OrderListData} from "../providers/order-list-data";
import {User} from "../providers/user";
import {UserListData} from "../providers/user-list-data";
import {LazyLoadImageModule} from "ng2-lazyload-image";
import {Config} from "../config";
import {OauthCordova} from "ng2-cordova-oauth/platform/cordova";
import {Oauth} from "ng2-cordova-oauth/oauth";
import {HttpModule} from "@angular/http";
import {OAuthModule} from "../pages/oauth/oauth.module";
import {ProfileModule} from "../pages/profile/profile.module";
import {Geocoder, GoogleMaps} from "@ionic-native/google-maps";
import {Geolocation} from '@ionic-native/geolocation';
import {CheckoutModule} from "../pages/checkout/checkout.module";
import {GenericMapModule} from "../pages/generic-map/generic-map.module";
import {MyCartModule} from "../pages/my-cart/my-cart.module";
import {OrderDoneModule} from "../pages/order-done/order-done.module";
import {UserListModule} from "../pages/user-list/user-list.module";
import {MyOrdersModule} from "../pages/my-orders/my-orders.module";
import {CallNumber} from "@ionic-native/call-number";
import {BackgroundMode} from "@ionic-native/background-mode";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {Notifications} from "../providers/notifications";
import {AdministrateOrdersModule} from "../pages/administrate-orders/administrate-orders.module";

export const firebaseConfig = {
    apiKey: "UuaOTyNBVo4EtTJRkTqsFHPQTh8CvqstE0puXyDY",
    authDomain: "bd-movel-dd4e2.firebaseapp.com",
    databaseURL: "https://bd-movel-dd4e2.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "865297122000"
};

@NgModule({
    declarations: [
        MyApp,
        HomePage
    ],
    imports: [
        HttpModule,
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig),
        LazyLoadImageModule,
        /*
         Pages
         */
        OAuthModule,
        ProfileModule,
        ProductListModule,
        ProductDetailModule,
        CheckoutModule,
        GenericMapModule,
        MyCartModule,
        OrderDoneModule,
        UserListModule,
        MyOrdersModule,
        AdministrateOrdersModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        /*
         Providers
         */
        Cart,
        DeliveryAddress,
        LoadingMessage,
        Order,
        OrderListData,
        ProductListData,
        User,
        UserListData,
        CallNumber,
        BackgroundMode,
        LocalNotifications,
        Notifications,
        /*
         Maps
         */
        Geolocation,
        GoogleMaps,
        Geocoder,
        /*
         OAuth
         */
        Oauth,
        OauthCordova,
        Config
    ]
})
export class AppModule {
}
