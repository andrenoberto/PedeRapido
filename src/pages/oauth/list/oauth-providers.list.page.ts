import {Component} from '@angular/core';
import {OAuthService} from '../oauth.service';
import {App, MenuController, NavController, Platform} from "ionic-angular";
import {User} from "../../../providers/user";
import {ProductList} from "../../product-list/product-list";
import {HomePage} from "../../home/home";
import {OAuthProfile} from "../models/oauth-profile.model";
import {Profile} from "../../profile/profile";

@Component({
    templateUrl: 'oauth-providers.list.html',
    providers: [OAuthService]
})
export class OAuthProvidersListPage {
    private oauthService: OAuthService;
    private nav: NavController;
    profile: OAuthProfile;

    constructor(oauthService: OAuthService, public user: User, public app: App, public platform: Platform, public navCtrl: NavController, public menuCtrl: MenuController) {
        this.oauthService = oauthService;
        this.user.initialize();
        this.profile = this.user.profile;
    }

    ionViewWillEnter() {
        this.changePage();
    }

    changePage() {
        if (this.profile != null) {
            this.navCtrl.setRoot(Profile);
        }
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

    public login(source: string) {
        this.oauthService.login(source)
            .then(() => {
                this.oauthService.getProfile().then((profile) => this.user.profile = profile);
                this.nav.setRoot(ProductList);
            });
    }
}