import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {
  constructor(
    private storage:Storage,
    private router:Router
    ){}

  async canActivate(){
    this.storage.create();
    const isIntroShowed = await this.storage.get('isIntroShowed')
    if(isIntroShowed){
      return true;
    }else{
      return this.router.navigateByUrl('/intro');
    }

  }



}
