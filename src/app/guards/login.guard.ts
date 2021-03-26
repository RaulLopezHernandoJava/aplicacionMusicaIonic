import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {Storage} from "@ionic/storage-angular";



@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private storage:Storage,
    private router:Router
    ){}

  async canActivate(){
    this.storage.create();
    const isUserLoggedIn = await this.storage.get('isUserLoggedIn')
    if(isUserLoggedIn){
      return true;
    }else{
      return this.router.navigateByUrl('/login');
    }
  }
}
