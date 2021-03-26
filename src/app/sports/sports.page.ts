import { Component } from '@angular/core';
import {Plugins} from "@capacitor/core";
const {Geolocation} = Plugins;

@Component({
  selector: 'app-sports',
  templateUrl: './sports.page.html',
  styleUrls: ['./sports.page.scss'],
})
export class SportsPage  {

  // Definimos el centro por defecto de nuestro mapa --> 'currentCenter'
  currentCenter:any;
  // Definimos las coordenadas del mapa
  coordinates:any[] = [];
  defaultZoom = 14;
  constructor() { }

  ionViewDidEnter(){
    this.getCurrentPosition();
    this.watchPosition();

  }


  async getCurrentPosition(){
    // Guardamos las coordenadas en la variable "coordinates"
    const coordinates = await Geolocation.getCurrentPosition();
    //Especificamos "latitud" y "longitud" de coordenadas de nuestro punto actual (centro del mapa)
    this.currentCenter = {
      lat: coordinates.coords.latitude,
      lng : coordinates.coords.longitude
    }
  }

  watchPosition(){
    Geolocation.watchPosition({},position=>{
      this.currentCenter = {
        lat:position.coords.latitude,
        lng:position.coords.longitude
      }
    })
  }

}
