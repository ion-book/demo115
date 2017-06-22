import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
/**
 * PLUGINS IONIC NATIVE
 */
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

/**
 * PAGINAS
 */
import { CrearContacto } from '../crear-contacto/crear-contacto';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  /**
   * listaContactos => se encarga de almacenar el listado de contactos recuperados del dispositivo
   * y pinta la lista que se ve en la vista.
   */
  listaContactos:any[]=[];
  avatar:string="./assets/icon/avatar.png";
  constructor(public navCtrl: NavController, private contacts:Contacts, private modalCtrl:ModalController) {
    this.cargarListaContactos();
  }
  /**
   * Funcion encargada de cargar la lista de contactos del celular, en mi caso filtrare y mostrare solo
   * los objetos que tienen valor en los campos dislplayName, photos, phoneNumbers. Con estos cargare
   * la lista a mostrar.
   */
  cargarListaContactos(){
    this.contacts.find(["*"])
    .then(res => {
      console.log({funcion:'CargarListaContactos',res:res})
      let datosMostar:any[]=[];
      res.map((item) =>{
        if(item.displayName != null && item.photos != null && item.phoneNumbers != null){
          datosMostar.push({displayName:item.displayName,photos:[{value:this.avatar}],phoneNumbers:item.phoneNumbers})
        }        
      })
      console.log({funcion:'CargarListaContactos',datosMostar:datosMostar})
      this.listaContactos = datosMostar;
    },error => {
      console.log({error:error})
    })
  }
  /**
   * Abre una ventana modal para ingresar la informacion del contacto a crear
   */
  modalNuevoContacto(){
    let modal = this.modalCtrl.create(CrearContacto);
    modal.onDidDismiss(data => {
      console.log({dataOnDidDismiss:data});
      if(data.estado){
        console.log(data)
        this.listaContactos.push({displayName:data.contacto.displayName,photos:[{value:this.avatar}],phoneNumbers:data.contacto.phoneNumbers});
      }
    });
    modal.present();
  }
}
