/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */

import { COLORS } from '../helpers/colors.ts';

interface Observer {
  notify(videoTitle: string): void;
}

class YouTubeChannel {
  private subscribers: Observer[] = [];
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  subscribe(observer: Observer): void {
    this.subscribers.push(observer);
    console.log(`Nuevo suscriptor al canal %c${this.name}`, COLORS.green);
  }

  unsubscribe(observer: Observer): void {
    this.subscribers = this.subscribers.filter((sub) => sub !== observer);
    console.log(`Un suscriptor se ha dado de baja "${this.name}"`);
  }

  uploadVideo(videoTitle: string): void {
    console.log(
      `Canal ${this.name} ha subido un nuevo video %c${videoTitle}`,
      COLORS.green
    );

    for (const subscriber of this.subscribers) {
      subscriber.notify(videoTitle);
    }
  }
}

class Subscriber implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  notify(videoTitle: string): void {
    console.log(
      `%c${this.name} %cha sido notificado: %cNuevo video ${videoTitle}`,
      COLORS.blue,
      COLORS.white,
      COLORS.yellow
    );
  }
}

function main() {
  const channel = new YouTubeChannel('Cocinando con Fernando');

  const melissa = new Subscriber('Melissa');
  const cesar = new Subscriber('César');
  const emin = new Subscriber('Emin');

  channel.subscribe(melissa);
  channel.subscribe(cesar);

  channel.uploadVideo('Receta de Tamales de Angular');

  channel.subscribe(emin);

  channel.uploadVideo('Receta de React al pastor');

  channel.unsubscribe(cesar);

  channel.uploadVideo('Receta de Vue de choclo');

  channel.unsubscribe(emin);

  channel.uploadVideo('Parrillada de NodeJS');

  channel.unsubscribe(melissa);
  channel.uploadVideo('Docker a la plancha');

  console.log('\n\n');
}

main();
