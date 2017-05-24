import {Component} from '@angular/core';
import {App, IonicPage, MenuController, NavController, Platform} from 'ionic-angular';
import {HomePage} from "../home/home";
import {User} from "../../providers/user";
import {OAuthProfile} from "../oauth/models/oauth-profile.model";
import {OAuthService} from "../oauth/oauth.service";
import {UserListData} from "../../providers/user-list-data";
import {FirebaseListObservable} from "angularfire2";

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class Profile {
    private aux: FirebaseListObservable<any>;
    private oauthService: OAuthService;
    profile: OAuthProfile;

    constructor(public user: User, public app: App, public platform: Platform, public navCtrl: NavController, public menuCtrl: MenuController,
                private userListData: UserListData,
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
                    if (this.profile != undefined) {
                        this.aux = this.userListData.findUserByEmail(this.profile.email);
                        this.aux.subscribe((data) => {
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
                    this.navCtrl.setRoot(Profile);
                });
            });
    }

    logout() {
        this.user.logout();
    }
}
