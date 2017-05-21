import {Component} from '@angular/core';
import {Events, IonicPage, MenuController, NavController, NavParams, Platform} from 'ionic-angular';
import {
    CameraPosition, Geocoder, GeocoderRequest, GeocoderResult, GoogleMap, GoogleMaps, GoogleMapsAnimation,
    GoogleMapsEvent,
    LatLng, Marker
} from "@ionic-native/google-maps";
import {Geolocation} from '@ionic-native/geolocation';
import {LoadingMessage} from "../../providers/loading-message";
import {DeliveryAddress} from "../../providers/delivery-address";
import {Order} from "../../providers/order";

@IonicPage()
@Component({
    selector: 'page-generic-map',
    templateUrl: 'generic-map.html',
})
export class GenericMap {
    public map: GoogleMap;
    posCords: LatLng = new LatLng(0, 0);
    isViewLoaded: boolean;
    searching: any = false;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private geocoder: Geocoder,
                private platform: Platform,
                private geolocation: Geolocation,
                private googleMaps: GoogleMaps,
                private events: Events,
                private menuCtrl: MenuController,
                private loadingMessage: LoadingMessage,
                private deliveryAddress: DeliveryAddress,
                public order: Order) {
        this.loadingMessage.presentGenericMessage();
        this.events.subscribe('onMenuOpened', (e) => {
            if (this.map) {
                this.map.setClickable(false);
            }
        });

        this.events.subscribe('onMenuClosed', (e) => {
            if (this.map) {
                this.map.setClickable(true);
            }
        });
    }

    ionViewDidLoad() {
        /*this.platform.registerBackButtonAction(() => {
         if (this.menuCtrl.isOpen()) {
         this.menuCtrl.close();
         }
         }, 100);*/

        if (this.platform.is('cordova')) {
            this.geolocation.getCurrentPosition().then((position) => {
                this.googleMaps.isAvailable().then(() => {
                    let location = new LatLng(position.coords.latitude, position.coords.longitude);

                    this.map = new GoogleMap('map', {
                        //'styles': MapStyle.light(),
                        'backgroundColor': 'white',
                        'controls': {
                            'compass': true,
                            'myLocationButton': true,
                            'indoorPicker': true,
                            'zoom': true
                        },
                        'gestures': {
                            'scroll': true,
                            'tilt': true,
                            'rotate': true,
                            'zoom': true
                        },
                        'camera': {
                            'latLng': location,
                            'tilt': 30,
                            'zoom': 18,
                            'bearing': 50
                        }
                    });
                    this.loadingMessage.dismissAll();

                    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
                        //Event listener for MAP_LONG_CLICK
                        let evtName = GoogleMapsEvent.MAP_LONG_CLICK;
                        this.map.on(evtName).subscribe((latLng) => {
                            this.addMarker(latLng);
                        });
                    });
                });
            });
        } else {
            console.warn('Native: tried calling google Maps.isAvailable, but Cordova is not available. Make sure to include cordova.js or run in a device/simulator');
        }
    }

    onSearchAddress(event: any) {
        if (this.platform.is('cordova')) {
            if (event.target.value.length > 0) {
                this.searching = true;
            }

            let query = event.target.value;

            let request: GeocoderRequest = {
                address: query
            };

            this.geocoder.geocode(request).then((results: GeocoderResult) => {
                let target: LatLng = new LatLng(
                    results[0].position.lat,
                    results[0].position.lng
                );

                let position: CameraPosition = {
                    target: target,
                    zoom: 18,
                    tilt: 30
                };

                this.map.moveCamera(position);
                this.addMarker(target);
                this.searching = false;
            });

        } else {
            console.warn('Native: tried calling google Maps.isAvailable, but Cordova is not available. Make sure to include cordova.js or run in a device/simulator');
        }
    }

    addMarker(target) {
        this.map.clear();
        this.posCords = target;
        this.map.addMarker({
            'position': target,
            'draggable': true,
            'animation': GoogleMapsAnimation.DROP
        }).then((marker: Marker) => {
            marker.addEventListener(GoogleMapsEvent.MARKER_DRAG_END).subscribe(
                data => {
                    marker.getPosition().then((LatLng) => {
                        this.posCords = LatLng;
                    });
                });
        });
    }

    onUseThisLocationButtonTapped() {
        if (this.platform.is('cordova')) {
            let position = this.posCords;

            let request: GeocoderRequest = {
                position: {
                    lat: position.lat,
                    lng: position.lng
                }
            };

            this.loadingMessage.presentGenericMessage();
            this.map.setClickable(false);
            this.geocoder.geocode(request).then((results: GeocoderResult) => {
                if (results) {
                    let result = results[0];
                    let address = [
                        //result.subThoroughfare || "",
                        result.thoroughfare || "",
                        result.locality || "",
                        result.adminArea || "",
                        //result.postalCode || "",
                        result.country || ""].join(", ");

                    this.deliveryAddress.setDeliveryAddress(address);
                    this.deliveryAddress.lat = position.lat;
                    this.deliveryAddress.lng = position.lng;
                    this.map.setClickable(true);
                    this.loadingMessage.dismissAll();
                    this.navCtrl.pop();
                }
            });
        } else {
            console.warn('Native: tried calling GoogleMaps.getCameraPosition, but Cordova is not available. Make sure to include cordova.js or run in a device/simulator');
        }
    }

    onMyLocationButtonTapped() {
        this.searching = true;
        if (this.platform.is('cordova')) {
            this.geolocation.getCurrentPosition().then((position) => {
                let target: LatLng = new LatLng(position.coords.latitude, position.coords.longitude);
                let camPosition: CameraPosition = {
                    target: target,
                    zoom: 18,
                    tilt: 30
                };
                this.searching = false;
                this.map.moveCamera(camPosition);
                this.addMarker(target);
            });
        } else {
            console.warn('Native: tried calling GoogleMaps.getCameraPosition, but Cordova is not available. Make sure to include cordova.js or run in a device/simulator');
        }
    }
}