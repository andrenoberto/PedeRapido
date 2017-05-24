import {Component} from '@angular/core';
import {OAuthService} from '../oauth.service';
import {App, MenuController, NavController, Platform} from "ionic-angular";
import {User} from "../../../providers/user";
import {ProductList} from "../../product-list/product-list";
import {HomePage} from "../../home/home";
import {OAuthProfile} from "../models/oauth-profile.model";
import {UserListData} from "../../../providers/user-list-data";
import {FirebaseListObservable} from "angularfire2";

@Component({
    templateUrl: 'oauth-providers.list.html',
    providers: [OAuthService]
})
export class OAuthProvidersListPage {
    private aux: FirebaseListObservable<any>;
    private oauthService: OAuthService;
    private nav: NavController;
    profile: OAuthProfile;

    constructor(oauthService: OAuthService, public user: User, public app: App,
                public userListData: UserListData,
                public platform: Platform, public navCtrl: NavController, public menuCtrl: MenuController) {
        this.oauthService = oauthService;
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

    public login(source: string) {
        this.oauthService.login(source)
            .then(() => {
                this.oauthService.getProfile().then((profile) => {
                    this.user.profile = profile;
                    if (this.profile != undefined) {
                        let aux = this.userListData.findUserByEmail(this.profile.email);
                        aux.subscribe((data) => {
                            if (data[0] != undefined) {
                                this.user.admin = data[0].admin;
                                this.user.delivery = data[0].deliveryman
                            } else {
                                this.aux.push({
                                    name: this.profile.name,
                                    email: this.profile.email,
                                    admin: false,
                                    delivery: false
                                })
                            }
                        });
                    }
                    this.nav.setRoot(ProductList);
                });
            });
    }
}