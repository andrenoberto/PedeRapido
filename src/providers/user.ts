import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {OAuthProfile} from "../pages/oauth/models/oauth-profile.model";
import {OAuthService} from "../pages/oauth/oauth.service";
import {UserListData} from "./user-list-data";
import {FirebaseListObservable} from "angularfire2";

@Injectable()
export class User {
    private oAuthService: OAuthService;
    profile: OAuthProfile = null;
    public admin = false;
    public delivery = false;
    public ordersPage = false;
    public adminPage = false;
    public adminArea = false;
    private aux: FirebaseListObservable<any>;

    constructor(private oauthService: OAuthService, private userListData: UserListData) {
        this.initialize();
    }

    initialize() {
        if (this.profile == null) {
            this.oAuthService = this.oauthService;
            this.oauthService.getProfile()
                .then(profile => {
                    this.profile = profile;
                    if (this.profile != undefined) {
                        this.aux = this.userListData.findUserByEmail(this.profile.email);
                        this.aux.subscribe((data) => {
                            if (data[0] != undefined) {
                                this.admin = data[0].admin;
                                this.delivery = data[0].delivery;
                                if (this.admin || this.delivery) {
                                    this.adminArea = true;
                                    this.ordersPage = true;
                                    if (this.admin) {
                                        this.adminPage = true;
                                    }
                                } else {
                                    this.ordersPage = false;
                                    this.adminPage = false;
                                    this.adminArea = false;
                                }
                            }
                        });
                    }
                }).catch(error => {
                //alert(error);
            });
        } else {
            if (this.profile != undefined) {
                this.aux = this.userListData.findUserByEmail(this.profile.email);
                this.aux.subscribe((data) => {
                    if (data[0] != undefined) {
                        this.admin = data[0].admin;
                        this.delivery = data[0].delivery;
                        if (this.admin || this.delivery) {
                            this.adminArea = true;
                            this.ordersPage = true;
                            if (this.admin) {
                                this.adminPage = true;
                            }
                        } else {
                            this.ordersPage = false;
                            this.adminPage = false;
                            this.adminArea = false;
                        }
                    }
                });
            }
        }
    }

    logout() {
        this.oauthService.logout();
        this.profile = null;
    }
}