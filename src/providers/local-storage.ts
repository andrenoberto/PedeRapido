import {Injectable} from '@angular/core';
import {NativeStorage} from "@ionic-native/native-storage";

@Injectable()
export class LocalStorage {

  constructor(private storage: NativeStorage) {
  }

  get skipIntroPage(): Promise<any> {
    return this.storage.getItem('skipIntroPage');
  }

  set skipIntroPage(val) {
    this.storage.setItem('skipIntroPage', val);
  }

  get unit(): Promise<any> {
    return this.storage.getItem('unit');
  }

  set unit(val) {
    this.storage.setItem('unit', val);
  }

  get mapStyle(): Promise<any> {
    return this.storage.getItem('mapStyle');
  }

  set mapStyle(val) {
    this.storage.setItem('mapStyle', val);
  }

  get distance(): Promise<any> {
    return this.storage.getItem('distance');
  }

  set distance(val) {
    this.storage.setItem('distance', val);
  }

  get lang(): Promise<any> {
    return this.storage.getItem('lang');
  }

  set lang(val) {
    this.storage.setItem('lang', val);
  }
}
