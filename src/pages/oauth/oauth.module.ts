import {IonicModule} from 'ionic-angular';
import {NgModule} from '@angular/core';
import {OAuthProvidersListPage} from './list/oauth-providers.list.page';
import {OAuthService} from './oauth.service';
import {FacebookOauthProvider} from './facebook/facebook-oauth.provider';
import {OAuthProfilePage} from "./profile/oauth-profile.page";

@NgModule({
    imports: [IonicModule],
    declarations: [
        OAuthProvidersListPage,
        OAuthProfilePage
    ],
    entryComponents: [
        OAuthProvidersListPage,
        OAuthProfilePage
    ],
    providers: [
        OAuthService,
        FacebookOauthProvider
    ]
})

export class OAuthModule {
}