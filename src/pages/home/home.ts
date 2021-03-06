import {Component} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import {Facebook} from "ng2-cordova-oauth/core";
import {OauthCordova} from "ng2-cordova-oauth/platform/cordova";
import {CallNumber} from "@ionic-native/call-number";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public oauth: OauthCordova;
    private provider: Facebook;

    constructor(private navCtrl: NavController,
                private platform: Platform,
                private menuCtrl: MenuController,
                private callNumber: CallNumber) {
        this.oauth = new OauthCordova();
        this.provider = new Facebook({
            clientId: "295237230929584",
            appScope: ["email"]
        });
    }

    ionViewDidEnter() {
        this.platform.registerBackButtonAction(() => {
            if (this.menuCtrl.isOpen()) {
                this.menuCtrl.close();
            } else {
                window['plugins'].appMinimize.minimize();
            }
        }, 100);
    }

    callUs() {
        this.callNumber.callNumber('996648842', false);
    }
}
