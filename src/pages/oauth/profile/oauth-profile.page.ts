import {Component} from '@angular/core';
import {OAuthProfile} from '../models/oauth-profile.model';
import {User} from "../../../providers/user";
import {App, MenuController, NavController, Platform} from "ionic-angular";
import {HomePage} from "../../home/home";

@Component({
    selector: 'page-oauth-profile',
    templateUrl: 'oauth-profile.html',
})

export class OAuthProfilePage {
    profile: OAuthProfile;

    constructor(public user: User, public app: App, public platform: Platform, public navCtrl: NavController, public menuCtrl: MenuController) {
        this.user.initialize();
        this.profile = this.user.profile;
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
}