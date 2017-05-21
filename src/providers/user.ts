import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {OAuthProfile} from "../pages/oauth/models/oauth-profile.model";
import {OAuthService} from "../pages/oauth/oauth.service";
import {ProfileMenu} from "./profile-menu";

@Injectable()
export class User {
    private oAuthService: OAuthService;
    profile: OAuthProfile = null;

    constructor(private oauthService: OAuthService,
                private profileMenu: ProfileMenu) {
        this.initialize();
    }

    initialize() {
        if (this.profile == null) {
            this.oAuthService = this.oauthService;
            this.oauthService.getProfile()
                .then(profile => {
                    this.profile = profile;
                    this.profileMenu.autoChangeStatus(true);
                    alert('Status: ' + this.profileMenu.userOnlineStatus);
                }).catch(error => {
                //alert(error)
            });
        }
    }
}