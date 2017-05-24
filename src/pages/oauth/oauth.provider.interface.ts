import { OAuthProfile } from './models/oauth-profile.model';

export interface IOathProvider {
    logout();

    login(): Promise<string>;

    getProfile(accessToken: string): Promise<OAuthProfile>;
}