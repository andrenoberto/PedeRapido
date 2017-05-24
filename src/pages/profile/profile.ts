import {Component} from '@angular/core';
import {App, IonicPage, MenuController, NavController, Platform} from 'ionic-angular';
import {HomePage} from "../home/home";
import {User} from "../../providers/user";
import {OAuthProfile} from "../oauth/models/oauth-profile.model";
import {OAuthService} from "../oauth/oauth.service";

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class Profile {
    private oauthService: OAuthService;
    profile: OAuthProfile;

    constructor(public user: User, public app: App, public platform: Platform, public navCtrl: NavController, public menuCtrl: MenuController,
    private oauthServ: OAuthService) {
        this.oauthService = oauthServ;
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

    facebookLogin(source: string) {
        this.oauthService.login(source)
            .then(() => {
                this.oauthService.getProfile().then((profile) => {
                    this.user.profile = profile;
                    alert('entrou');
                    this.navCtrl.setRoot(Profile);
                });
            });
    }

    logout() {
        this.user.logout();
    }
}
