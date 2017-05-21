import { Injectable } from '@angular/core';

@Injectable()
export class Config {

    public facebook = {
        apiUrl: 'https://graph.facebook.com/v2.9/',
        clientId: '295237230929584',
        appScope: ['email'],
        redirectUri: 'http://localhost/callback',
        responseType: 'code'
    };
}