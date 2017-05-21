import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserList } from './user-list';

@NgModule({
  declarations: [
    UserList,
  ],
  imports: [
    IonicPageModule.forChild(UserList),
  ],
  exports: [
    UserList
  ]
})
export class UserListModule {}
