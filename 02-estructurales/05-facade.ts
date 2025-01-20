/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */

import { COLORS } from '../helpers/colors.ts';

class Projector {
  turnOn() {
    console.log('Proyector encendido');
  }

  turnOff() {
    console.log('Proyecto apagado');
  }
}

class SoundSystem {
  on() {
    console.log('Sistema de sonido encendido');
  }

  off() {
    console.log('Sistema de sonido apagado');
  }
}

class VideoPlayer {
  on() {
    console.log('Video player encendido');
  }

  play(movie: string) {
    console.log(`Reproduciendo %c${movie}`, COLORS.blue);
  }

  stop() {
    console.log('Película detenida');
  }

  off() {
    console.log('Video player apagado');
  }
}

class PopcornMaker {
  poppingPopcorn() {
    console.log('Haciendo palomitas');
  }

  turnOffPoppingPopcorn() {
    console.log('Deteniendo las palomitas');
  }
}

interface HomeTheaterFacadeOptions {
  projector: Projector;
  soundSystem: SoundSystem;
  videoPlayer: VideoPlayer;
  popcornMaker: PopcornMaker;
}

class HomeTheaterFacade {
  private projector: Projector;
  private soundSystem: SoundSystem;
  private videoPlayer: VideoPlayer;
  private popcornMaker: PopcornMaker;

  constructor({
    popcornMaker,
    projector,
    soundSystem,
    videoPlayer,
  }: HomeTheaterFacadeOptions) {
    this.projector = projector;
    this.popcornMaker = popcornMaker;
    this.videoPlayer = videoPlayer;
    this.soundSystem = soundSystem;
  }

  watchMovie(movie: string): void {
    console.log('%cPreparando para ver la película', COLORS.blue);
    this.projector.turnOn();
    this.soundSystem.on();
    this.popcornMaker.poppingPopcorn();
    this.videoPlayer.on();
    this.videoPlayer.play(movie);

    console.log('%cDisfrute la película', COLORS.blue);
  }

  endWatchingMovie(): void {
    console.log('%c\n\nPreparando para detener la película', COLORS.blue);
    this.projector.turnOff();
    this.soundSystem.off();
    this.popcornMaker.turnOffPoppingPopcorn();
    this.videoPlayer.stop();
    this.videoPlayer.off();

    console.log('%cSistema apagado\n', COLORS.blue);
  }
}

function main() {
  const projector = new Projector();
  const soundSystem = new SoundSystem();
  const videoPlayer = new VideoPlayer();
  const popcornMaker = new PopcornMaker();

  const homeTheater = new HomeTheaterFacade({
    projector,
    soundSystem,
    videoPlayer,
    popcornMaker,
  });

  homeTheater.watchMovie('Los Avengers');

  homeTheater.endWatchingMovie();
}

main();
