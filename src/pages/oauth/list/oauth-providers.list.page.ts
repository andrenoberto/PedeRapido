import {Component} from '@angular/core';
import {OAuthService} from '../oauth.service';
//import {OAuthProfilePage} from "../profile/oauth-profile.page";
import {App, MenuController, NavController, Platform} from "ionic-angular";
import {User} from "../../../providers/user";
import {ProductList} from "../../product-list/product-list";
import {HomePage} from "../../home/home";

@Component({
    templateUrl: 'oauth-providers.list.html',
    providers: [OAuthService]
})
export class OAuthProvidersListPage {
    private oauthService: OAuthService;
    private nav: NavController;

    constructor(oauthService: OAuthService, public user: User, public app: App, public platform: Platform, public navCtrl: NavController, public menuCtrl: MenuController) {
        this.oauthService = oauthService;
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