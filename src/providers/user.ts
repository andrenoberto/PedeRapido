import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {OAuthProfile} from "../pages/oauth/models/oauth-profile.model";
import {OAuthService} from "../pages/oauth/oauth.service";

@Injectable()
export class User {
    private oAuthService: OAuthService;
    profile: OAuthProfile = null;

    constructor(private oauthService: OAuthService) {
        this.initialize();
    }

    initialize() {
        if (this.profile == null) {
            this.oAuthService = this.oauthService;
            this.oauthService.getProfile()
                .then(profile => {
                    this.profile = profile;
                }).catch(error => {
                //alert(error);
            });
        }
    }
}