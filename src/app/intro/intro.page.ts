import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  slideOpt = {
    initialSlide : 0,
    slidesPerView : 1,
    centeredSlides : true,
    speed: 400

  }

  slides = [
    {
    imageSrc:"assets/img/logo.png",
    imageAlt:"Platzi Music Logo",
    title:"Este es el titulo",
    subTitle:"Este es el subtitle",
    description:"Esta es la descripcion",
    icon:"play"
  },
  {
    imageSrc:"assets/img/logo.png",
    imageAlt:"Platzi Music Logo",
    title: "Disfruta de nuestro reproductor",
    subTitle: "DE VIDEOS INCREIBLES",
    description:"Entra al modo video de nuestro reproductor y obten acceso a clips, documentales y making offs increibles de tus artistas favoritos",
    icon:"videocam"
  },
  {
    imageSrc:"assets/img/logo.png",
    imageAlt:"Platzi Music Logo",
    title: "Accede Al Exclusivo",
    subTitle: "MODO DEPORTE",
    description:"Crea un Playlist basado en tu actividad fisica <br/> Ten reportes y acceso a lo que necesites, integrado con GPS",
    icon:"bycicle"
  }
  ]
  constructor(
    private storage:Storage,
    private router:Router,
  ) { }


  async ngOnInit() {
    await this.storage.create();
  }

  finish(){
    this.storage.set('isIntroShowed',true);
    this.router.navigateByUrl("/login");
  }

}
