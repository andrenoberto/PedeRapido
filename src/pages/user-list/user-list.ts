import {Component} from '@angular/core';
import {FirebaseListObservable} from "angularfire2";
import {
    ActionSheetController, AlertController, App, IonicPage, MenuController, NavController, NavParams,
    Platform
} from 'ionic-angular';
import {UserListData} from "../../providers/user-list-data";
import {LoadingMessage} from "../../providers/loading-message";
//import CryptoJS from 'crypto-js';
import {HomePage} from "../home/home";

/**
 * Generated class for the UserList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-user-list',
    templateUrl: 'user-list.html',
})
export class UserList {
    private users: FirebaseListObservable<any>;

    constructor(public navCtrl: NavController, public navParams: NavParams, public userListData: UserListData, public loadingMessage: LoadingMessage, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController,
                public app: App, public platform: Platform, public menuCtrl: MenuController) {
        loadingMessage.presentGenericMessage();
        this.users = userListData.getList();
        this.users.subscribe(() => {
            loadingMessage.dismissAll();
        })
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

    showOptions(user) {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Escolha uma ação',
            buttons: [
                {
                    text: 'Permissões Administrativas',
                    handler: () => {
                        this.updateAdministrativePermissions(user);
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel',
                }
            ]
        });
        actionSheet.present();
    }

    /*addUser() {
        let prompt = this.alertCtrl.create({
            title: 'Novo usuário',
            message: 'Informe os dados do usuário a ser cadastrado.',
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Identificação'
                },
                {
                    name: 'username',
                    placeholder: 'Login'
                },
                {
                    name: 'email',
                    type: 'email',
                    placeholder: 'Email'
                },
                {
                    name: 'password',
                    type: 'password',
                    placeholder: 'Senha'
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                },
                {
                    text: 'Salvar',
                    handler: data => {
                        let password = CryptoJS.SHA3(data.password);
                        this.users.push({
                            name: data.name,
                            username: data.username,
                            email: data.email,
                            password: password.toString(),
                            admin: false,
                            deliveryman: false
                        })
                    }
                }
            ]
        });
        prompt.present();
    }

    removeUser(userKey: string) {
        let prompt = this.alertCtrl.create({
            title: 'Remover usuário?',
            message: 'Você realmente deseja remover este usuário?',
            buttons: [
                {
                    text: 'Cancelar',
                    handler: () => {
                        return;
                    }
                },
                {
                    text: 'Remover',
                    handler: () => {
                        this.users.remove(userKey);
                    }
                }
            ]
        });
        prompt.present();
    }*/

    updateAdministrativePermissions(user) {
        let prompt = this.alertCtrl.create({
            title: 'Editar Usuário',
            message: 'Atualize as permissões administrativas deste usuários.',
            inputs: [
                {
                    name: 'admin',
                    label: 'Permissões administrativas?',
                    type: 'checkbox',
                    value: 'admin',
                    checked: user.admin
                },
                {
                    name: 'deliveryman',
                    label: 'Entrega de produtos?',
                    type: 'checkbox',
                    value: 'deliveryman',
                    checked: user.delivery
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                },
                {
                    text: 'Salvar',
                    handler: data => {
                        let administrativeAccess = false;
                        let deliveryManAccess = false;
                        for (let i = 0; i < data.length; i++) {
                            if (data[i] == 'admin') {
                                administrativeAccess = true;
                            } else if (data[i] == 'deliveryman') {
                                deliveryManAccess = true;
                            }
                        }
                        if (administrativeAccess) {
                            this.users.update(user.$key, {
                                admin: administrativeAccess
                            });
                        } else {
                            this.users.update(user.$key, {
                                admin: false
                            });
                        }
                        if (deliveryManAccess) {
                            this.users.update(user.$key, {
                                delivery: deliveryManAccess
                            });
                        } else {
                            this.users.update(user.$key, {
                                delivery: false
                            });
                        }
                    }
                }
            ]
        });
        prompt.present();
    }

    /*updateUser(user) {
        let prompt = this.alertCtrl.create({
            title: 'Editar Usuário',
            message: 'Atualize as informações deste usuário.',
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Identificação',
                    value: user.name
                },
                {
                    name: 'username',
                    placeholder: 'Login',
                    value: user.username
                },
                {
                    name: 'email',
                    type: 'email',
                    placeholder: 'Email',
                    value: user.email
                },
                {
                    name: 'password',
                    type: 'password',
                    placeholder: 'Senha'
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                },
                {
                    text: 'Salvar',
                    handler: data => {
                        this.users.update(user.$key, {
                            name: data.name,
                            username: data.username,
                            email: data.email,
                        });
                        if (data.password.length > 0) {
                            let encryptedPassword = CryptoJS.SHA3(data.password);
                            this.users.update(user.$key, {
                                password: encryptedPassword.toString()
                            });
                        }
                    }
                }
            ]
        });
        prompt.present();
    }*/

}