import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage-angular'

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(
    private storage:Storage
  ) { }

  loginUser(credential){
      return new Promise((accept,reject)=>{
        if(credential.email == "test@test.com" && credential.password == "12345"){
          accept("Login Correcto")
        }else{
          reject("Login Incorrecto");
        }
      })
  }
  registerUser(userData) {
    //Con "btoa" almacenamos la contraseña en el "storage" cifrada en "base64". El objeto del usuario
    // lo podemos ver desde la consola del navegador en "Aplicacion"--> "Almacenamiento" -->"indexedDB" -->
    // "_ionicstorage-http" -->"ionickv"
    userData.password = btoa(userData.password);
    this.storage.create();
    return this.storage.set("user", userData);
  }
}



