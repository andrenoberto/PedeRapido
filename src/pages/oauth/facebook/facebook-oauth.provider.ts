import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {IOathProvider} from '../oauth.provider.interface';
import {OAuthProfile} from '../models/oauth-profile.model';
import {Facebook} from 'ng2-cordova-oauth/provider/facebook';
import {Config} from '../../../config';
import {OauthCordova} from "ng2-cordova-oauth/platform/cordova";

interface ILoginResponse {
    access_token: string;
}

interface IProfileResponse {
    name: string;
    email: string;
    picture: {
        data: {}
    };
    first_name: string;
    id: string;
}

@Injectable()
export class FacebookOauthProvider implements IOathProvider {
    private cordovaOauth: OauthCordova;
    private http: Http;
    private config: Config;
    private facebook: Facebook;

    constructor(http: Http,
                config: Config,) {
        this.http = http;
        this.config = config;
        this.facebook = new Facebook({clientId: config.facebook.clientId, appScope: config.facebook.appScope, redirectUri: config.facebook.redirectUri});
        this.cordovaOauth = new OauthCordova();
    }

    login(): Promise<string> {
        return this.cordovaOauth.login(this.facebook, {
            clearsessioncache: 'no',
            toolbarposition: 'top'
        }).then((x: ILoginResponse) => x.access_token);
    }

    getProfile(accessToken): Promise<OAuthProfile> {
        let query = `access_token=${accessToken}&format=json`;
        let url = `${this.config.facebook.apiUrl}me?${query}&fields=email,name,picture.height(961),first_name`;
        return this.http.get(url)
            .map(x => x.json())
            .map((x: IProfileResponse) => {
                return {
                    name: x.name,
                    email: x.email,
                    provider: 'Facebook',
                    first_name: x.first_name,
                    photo: x.picture.data['url']
                };
            })
            .toPromise();
    }
}