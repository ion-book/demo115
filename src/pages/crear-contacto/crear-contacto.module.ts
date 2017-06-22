import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrearContacto } from './crear-contacto';
import { Contacts } from '@ionic-native/contacts';
@NgModule({
  declarations: [
    CrearContacto,
  ],
  imports: [
    IonicPageModule.forChild(CrearContacto),
  ],
  exports: [
    CrearContacto
  ],
  providers:[Contacts]
})
export class CrearContactoModule {}
