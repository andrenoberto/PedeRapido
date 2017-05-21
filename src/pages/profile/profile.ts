import {Component} from '@angular/core';
import {App, IonicPage, MenuController, NavController, NavParams, Platform} from 'ionic-angular';
import {HomePage} from "../home/home";
import {User} from "../../providers/user";
import {OAuthProfile} from "../oauth/models/oauth-profile.model";

/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class Profile {
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
