/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto (Subject),
 * y otros objetos, llamados observadores (Observers). Los observadores son
 * notificados y actualizados automáticamente por el sujeto cuando se producen
 * cambios en su estado, sin que el sujeto conozca detalles específicos de los
 * observadores.
 *
 * Este patrón es útil en situaciones donde varios objetos deben reaccionar a
 * cambios en el estado de un único objeto, y se desea mantener la independencia
 * entre ellos.
 *
 * ! No confundir con los RXJS Observables, que aunque comparten la idea de
 * suscripción y notificación, forman parte de una librería distinta usada en
 * Angular y otros frameworks de JavaScript.
 *
 * Más detalles sobre el patrón:
 * https://refactoring.guru/es/design-patterns/observer
 */

import { COLORS } from '../helpers/colors.ts'; // Importa un conjunto de colores predefinidos para los mensajes en consola.

// Interfaz Observer: define el contrato que todos los observadores deben cumplir.
interface Observer {
  update(weatherData: string): void;  // Método que cada observador debe implementar para recibir actualizaciones.
}

// Clase Subject - WeatherStation: representa el sujeto (el cual notifica a sus observadores).
// En este caso, la estación meteorológica que tiene un estado (el clima) que cambia y
// notifica a sus aplicaciones (observadores) sus actualizaciones.
class WeatherStation {
  private observers: Observer[] = [];  // Lista de observadores suscritos a la estación meteorológica.
  private weatherData: string = 'Soleado';  // Estado actual del clima.

  // Método para suscribir a un nuevo observador (una nueva aplicación).
  // Cada vez que un nuevo observador se suscribe, se le notifica inmediatamente
  // con el estado actual del clima.
  subscribe(observer: Observer): void {
    this.observers.push(observer);  // Se añade el observador a la lista.
    observer.update(this.weatherData);  // Se le envía la actualización inicial.

    console.log(
        '%cNueva aplicación suscrita al sistema meteorológico.',
        COLORS.green  // Se utiliza el color verde para destacar el mensaje.
    );
  }

  // Método para eliminar un observador de la lista de suscriptores.
  // Esto puede ser útil cuando una aplicación ya no necesita recibir actualizaciones.
  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter((sub) => sub !== observer);  // Se elimina de la lista.
    console.log(`%cUna aplicación se ha dado de baja`, COLORS.red);  // Mensaje en rojo para destacar que un observador fue eliminado.
  }

  // Método para cambiar el clima y notificar a todos los observadores.
  setWeather(weatherData: string): void {
    console.log(`\nClima actualizado: %c${weatherData}`, COLORS.blue);  // Mensaje de actualización con color azul.

    this.weatherData = weatherData;  // Actualiza el estado del clima.
    this.notifyObservers();  // Notifica a todos los observadores sobre el cambio.
  }

  // Método privado que recorre la lista de observadores y les envía la actualización.
  private notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update(this.weatherData);  // Llama al método update de cada observador.
    }
  }
}

// Clase Observer - WeatherApp: esta clase representa un observador (una aplicación meteorológica).
// Cada aplicación puede recibir notificaciones sobre el clima y procesarlas.
class WeatherApp implements Observer {
  private name: string;  // Nombre de la aplicación.

  constructor(name: string) {
    this.name = name;  // Inicializa el nombre de la aplicación.
  }

  // Implementación del método update para recibir notificaciones de cambios en el clima.
  // Cada vez que se actualiza el clima, esta función imprime un mensaje con el clima actualizado.
  update(weatherData: string): void {
    console.log(
        `%c${this.name} %cha recibido notificación del clima: %c${weatherData}`,
        COLORS.red,  // Nombre de la aplicación en color rojo.
        COLORS.white,  // Texto normal en color blanco.
        COLORS.yellow  // El clima en color amarillo para resaltarlo.
    );
  }
}

// Código Cliente para Probar
// En este bloque de código se simula cómo interactúan las clases en la práctica.
function main(): void {
  const weatherStation = new WeatherStation();  // Crea una nueva instancia de la estación meteorológica.

  // Crea varias aplicaciones que actúan como observadores.
  const flutterWeatherApp = new WeatherApp('Flutter WeatherApp');
  const reactNativeWeatherApp = new WeatherApp('React Native WeatherApp');
  const weatherTrackerApp = new WeatherApp('Weather Tracker App');

  // Suscribir aplicaciones a la estación meteorológica.
  weatherStation.subscribe(flutterWeatherApp);  // Suscribe Flutter WeatherApp.
  weatherStation.subscribe(reactNativeWeatherApp);  // Suscribe React Native WeatherApp.

  // Cambiar el clima y notificar a los observadores.
  weatherStation.setWeather('Lluvioso');  // Actualiza el clima a "Lluvioso".

  // Agregar una nueva aplicación y notificar el cambio de clima.
  weatherStation.subscribe(weatherTrackerApp);  // Suscribe Weather Tracker App.
  weatherStation.setWeather('Nublado');  // Actualiza el clima a "Nublado".

  // Una de las aplicaciones se da de baja (ya no recibe actualizaciones).
  weatherStation.unsubscribe(reactNativeWeatherApp);  // Desuscribe React Native WeatherApp.
  weatherStation.setWeather('Tormenta eléctrica');  // Actualiza el clima a "Tormenta eléctrica".
}

main();  // Ejecuta la función principal para probar el comportamiento del patrón Observer.
