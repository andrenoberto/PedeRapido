import {Component} from '@angular/core';
import {App, IonicPage, MenuController, NavController, NavParams, Platform} from 'ionic-angular';
import {HomePage} from "../home/home";
import {FirebaseListObservable} from "angularfire2";
import {LoadingMessage} from "../../providers/loading-message";
import {OrderListData} from "../../providers/order-list-data";
import {Geolocation} from '@ionic-native/geolocation';
import {Http} from "@angular/http";

@IonicPage()
@Component({
    selector: 'page-administrate-orders',
    templateUrl: 'administrate-orders.html',
})

export class AdministrateOrders {
    private orders: FirebaseListObservable<any>;
    private customersOrders;
    private subscription;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private platform: Platform,
                private menuCtrl: MenuController,
                private app: App,
                private http: Http,
                private geolocation: Geolocation,
                private orderListData: OrderListData,
                private loadingMessage: LoadingMessage) {
        loadingMessage.presentGenericMessage();
        this.orders = this.orderListData.getUnorderedList();
        this.orders.subscribe((data) => {
            this.customersOrders = [];
            for (let i = 0; i < data.length; i++) {
                this.customersOrders[i] = data[i];
                this.customersOrders[i].spinner = true;
                this.subscription = this.geolocation.watchPosition()
                    .subscribe(position => {
                        let lat: string = position.coords.latitude.toString();
                        let lng: string = position.coords.longitude.toString();
                        this.calculateDistance(lat, lng, data[i].pos.lat, data[i].pos.lng, data[i].$key);
                    });
            }
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

    calculateDistance(originLat: string, originLng: string, lat: string, lng: string, key: any) {
        this.http.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metrics&origins=${originLat},${originLng}&destinations=${lat}%2C${lng}&language=pt-BR&key=AIzaSyBiVQFS3FmWwHjen4W9M_51csqxJbpEn9Q`)
            .toPromise().then((response) => {
            let distanceDetails = response.json();

            let index = this.customersOrders.findIndex(order => order.$key == key);
            this.customersOrders[index].distance = distanceDetails.rows[0].elements[0].distance.text;
            this.customersOrders[index].distanceValue = distanceDetails.rows[0].elements[0].distance.value;
            this.customersOrders[index].duration = distanceDetails.rows[0].elements[0].duration.text;
            this.customersOrders[index].spinner = false;
        });
    }

    getMapAddress(lat: string, lng: string) {
        return `https://maps.googleapis.com/maps/api/staticmap?markers=color:red%7C${lat},${lng}&zoom=18&format=png&maptype=roadmap&size=600x250`;
        //return "https://maps.googleapis.com/maps/api/staticmap?markers=color:yellow%7C" + lat + "," + lng + "&zoom=18&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0x242f3e&style=element:labels.text.fill%7Ccolor:0x746855&style=element:labels.text.stroke%7Ccolor:0x242f3e&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:poi.park%7Celement:geometry%7Ccolor:0x263c3f&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x6b9a76&style=feature:road%7Celement:geometry%7Ccolor:0x38414e&style=feature:road%7Celement:geometry.stroke%7Ccolor:0x212a37&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x9ca5b3&style=feature:road.highway%7Celement:geometry%7Ccolor:0x746855&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0x1f2835&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0xf3d19c&style=feature:transit%7Celement:geometry%7Ccolor:0x2f3948&style=feature:transit.station%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:water%7Celement:geometry%7Ccolor:0x17263c&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x515c6d&style=feature:water%7Celement:labels.text.stroke%7Ccolor:0x17263c&size=600x250"
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
