import {Component} from '@angular/core';
import {App, MenuController, NavController, Platform} from 'ionic-angular';
import {Facebook} from "ng2-cordova-oauth/core";
import {OauthCordova} from "ng2-cordova-oauth/platform/cordova";
import {User} from "../../providers/user";
import {ProfileMenu} from "../../providers/profile-menu";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public oauth: OauthCordova;
    private provider: Facebook;

    constructor(private navCtrl: NavController,
                private platform: Platform,
                private menuCtrl: MenuController) {
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

    login() {
        this.platform.ready().then(() => {
            this.oauth.logInVia(this.provider).then((success) => {
                //Some success code
            }, (error) => {
                console.log(JSON.stringify(error));
            });
        });
    }
}
