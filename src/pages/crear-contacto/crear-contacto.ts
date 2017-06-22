import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * PLUGINS IONIC NATIVE
 */
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

/**
 * Generated class for the CrearContacto page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-crear-contacto',
  templateUrl: 'crear-contacto.html',
})
export class CrearContacto {
  datos:any[]=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private contacts:Contacts,
              public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearContacto');
  }

  /**
   * Funsion para agregar un nuevo contacto a la lista de contactos del telefono.
   */
  crearContacto(){
    let contact: Contact = this.contacts.create();
    let avatar ="./assets/icon/avatar.png";
    contact.displayName = this.datos['nombre'];
    contact.phoneNumbers = [new ContactField(this.datos['tipoNumero'], this.datos['numero'])];
    contact.photos = [new ContactField('url',avatar,false)]
    contact.save().then(
      () => { 
        console.log('Contact Guardado!', contact)
        this.dismiss({estado:true,contacto:contact});
      },
      (error: any) => {
        console.error('Error al guardar el contacto.', error)
        this.dismiss({estado:false});
      }
    );
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

}
