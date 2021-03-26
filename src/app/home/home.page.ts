import { SongsModalPage } from './../songs-modal/songs-modal.page';
import { PlatziMusicService } from './../services/platzi-music.service';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IfStmt } from '@angular/compiler';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  slideOps = {
    initialSlide: 2,
    slidesPerView: 4,
    centeredSLides: true,
    speed: 400
  };
  songs: any[] = [];
  albums: any[] = [];
  artists: any[] = [];
  song: {
    preview_url: string;
    playing: boolean;
    name: string;
  } = {
      preview_url: "",
      playing: false,
      name: ""
    }
  currentSong: HTMLAudioElement;ç
  newTime;
  constructor(
    private musicService: PlatziMusicService,
    private modalController: ModalController
  ) { }

  // Metodo del Ciclo de Vida de Ionic
  // Este metodo se ejecuta cunado entras en la vista y el html esta cargado
  ionViewDidEnter() {
    this.musicService.getNewReleases().then((newReleases) => {
      this.artists = this.musicService.getArtists();
      this.songs = newReleases.albums.items.filter(e => e.album_type == "single")
      this.albums = newReleases.albums.items.filter(e => e.album_type == "album")
    })

  }

  async showSongs(artist) {
    const songs = await this.musicService.getArtistsTopTracks(artist.id)
    const modal = await this.modalController.create({
      component: SongsModalPage,
      //Sirve de intermediaria entre el componente"home" y el "songModalPage" (es decir el modal)
      componentProps: {
        songs: songs.tracks,
        artist: artist.name
      }
    })

    modal.onDidDismiss().then(dataReturned => {
      this.song = dataReturned.data
      console.log("Esta es la cancion")
      console.log(this.song)
    })
    return await modal.present();
  }

  play() {
    this.currentSong = new Audio (this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener("timeupdate",() =>{
      this.newTime =
        (this.currentSong.currentTime * (this.currentSong.duration /10 )) / 100;
    })
    this.song.playing = true;
  }

  pause() {
    this.currentSong.pause();
    this.song.playing = false;
  }

  parseTime(time: number) {
    if (time) {
      const partTime = parseInt(time.toString().split(".")[0])
      let minutes = Math.floor(partTime / 60).toString();
      if (minutes.length == 1) {
        minutes = "0" + minutes;
      }
      let seconds = (partTime % 60).toString();
      if (seconds.length == 1) {
        seconds = "0" + seconds;
      }
      return minutes + ":" + seconds;
    }
  }
}
