import { NavController } from '@ionic/angular';
import { AuthenticateService } from './../services/authenticate.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm:FormGroup
  validation_messages = {
    email:[
      {type:"required",message:"El email es requerido"},
      {type:"pattern",message:"El email no es valido !!!"},
    ],
    password:[
      {type:"required",message:"El password es requerido"},
      {type:"minLength",message:"El email ha de contener mas de 5 caracteres !!!"},
    ]
  }

  errorMessage = "";
  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthenticateService,
    private navCtrl:NavController,
    private storage:Storage
  ) {
    this.loginForm = this.formBuilder.group({
      email:new FormControl("",Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ])),
      password:new FormControl("",Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ]))
    })
   }


  ngOnInit() {
  }

  loginUser(credentials){
    console.log(credentials);
    this.authService.loginUser(credentials).then(res => {
      this.errorMessage = "";
      this.storage.create()
      this.storage.set('isUserLoggedIn',true);
      this.navCtrl.navigateForward("/menu/home");
    }).catch(err =>{
      this.errorMessage = err;
    })
  }

  goToRegister(){
    this.navCtrl.navigateForward('/register')
  }
}
