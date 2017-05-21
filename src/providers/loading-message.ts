import {Injectable, Optional} from '@angular/core';
import {LoadingController} from "ionic-angular";

@Injectable()
export class LoadingMessage {
  public loadingCtrlInstance = null;

  constructor(public loadingCtrl: LoadingController) {
  }

  presentGenericMessage(@Optional() message: string = 'Carregando...') {
    this.genericLoader(message);
  }

  genericLoader(contentPhrase) {
    this.loadingCtrlInstance = this.loadingCtrl.create({
      content: contentPhrase
    });
    this.loadingCtrlInstance.present();

    setTimeout(() => {
      this.loadingCtrlInstance.dismissAll();
    }, 5000);
  }

  dismissAll() {
    this.loadingCtrlInstance.dismissAll();
  }
}