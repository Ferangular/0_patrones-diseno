/**
 * ! Patrón Bridge
 * Este patrón estructural permite desacoplar una abstracción de su implementación,
 * de modo que ambas puedan evolucionar de manera independiente.
 *
 * * ¿Cuándo usar el patrón Bridge?
 * - Cuando una clase tiene múltiples variantes de implementación (como diferentes tipos de canales de notificación).
 * - Cuando quieres evitar un crecimiento excesivo de jerarquías de clases (evitar combinaciones como EmailAlert, SMSAlert, etc.).
 * - Cuando deseas dividir responsabilidades, por ejemplo, separar la lógica de negocio (abstracción) de los detalles de implementación.
 *
 * * En este ejemplo:
 * - `NotificationChannel` actúa como una interfaz que define el comportamiento base para los canales de comunicación.
 * - Las clases concretas (`EmailChannel`, `SMSChannel`, etc.) implementan esa interfaz.
 * - La clase abstracta `Notification` define la relación entre una notificación y los canales,
 *   permitiendo que cada canal sea configurado dinámicamente.
 *
 * Más información: https://refactoring.guru/es/design-patterns/bridge
 */

import { COLORS } from '../helpers/colors.ts'; // Ayuda para colorear logs en consola (COLORS.red, por ejemplo).

// 1. Interfaz NotificationChannel
/**
 * Define el contrato base para los canales de comunicación.
 * Cada canal debe implementar el método `send`, que enviará un mensaje.
 */
interface NotificationChannel {
  /**
   * Envía un mensaje utilizando un canal específico de comunicación.
   * @param message - Mensaje a ser enviado.
   */
  send(message: string): void;
}

// 2. Implementaciones de Canales de Comunicación

/**
 * Implementación concreta de un canal de comunicación que envía notificaciones por correo electrónico.
 */
class EmailChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando correo electrónico: ${message}`);
  }
}

/**
 * Implementación concreta de un canal de comunicación que envía notificaciones por SMS.
 */
class SMSChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando SMS: ${message}`);
  }
}

/**
 * Implementación concreta de un canal de comunicación que envía notificaciones como Push Notifications.
 */
class PushNotificationChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando Push: ${message}`);
  }
}

// 3. Clase Abstracta Notification
/**
 * Clase abstracta que actúa como la "abstracción" en el patrón Bridge.
 * Contiene una referencia a uno o más `NotificationChannel`, que representan la "implementación".
 */
abstract class Notification {
  protected channels: NotificationChannel[]; // Lista de canales para enviar notificaciones.

  /**
   * Constructor de la clase abstracta `Notification`.
   * @param channels - Lista de canales iniciales que utilizará la notificación.
   */
  constructor(channels: NotificationChannel[]) {
    this.channels = channels;
  }

  /**
   * Método abstracto para enviar notificaciones.
   * Cada subclase debe implementar su propia lógica de notificación.
   * @param message - Mensaje a ser enviado.
   */
  abstract notify(message: string): void;

  /**
   * Método abstracto para agregar dinámicamente un canal de comunicación.
   * @param channel - Canal que se agregará a la lista de canales.
   */
  abstract addChannel(channel: NotificationChannel): void;
}

/**
 * Implementación concreta de una notificación de alerta.
 * Usa todos los canales configurados para enviar un mensaje de alerta.
 */
class AlertNotification extends Notification {
  /**
   * Envía un mensaje de alerta a través de todos los canales configurados.
   * @param message - Mensaje de alerta a ser enviado.
   */
  override notify(message: string): void {
    console.log('\n%cNotificación de alerta', COLORS.red); // Mensaje formateado en consola.
    this.channels.forEach((channel) => channel.send(message)); // Itera sobre los canales y envía el mensaje.
  }

  /**
   * Agrega un nuevo canal de comunicación a la lista de canales.
   * @param channel - Canal que se agregará.
   */
  override addChannel(channel: NotificationChannel): void {
    this.channels.push(channel);
  }
}

// Ejecución del ejemplo principal.
function main() {
  // Crea una lista de canales de comunicación.
  const channels = [
    new EmailChannel(),
    new SMSChannel(),
    new PushNotificationChannel(),
    new PushNotificationChannel(), // Ejemplo con canales duplicados (puede ser intencional para representar diferentes destinos).
    new PushNotificationChannel(),
    new SMSChannel(),
    new EmailChannel(),
  ];

  // Crea una notificación de alerta con los canales configurados.
  const alert = new AlertNotification(channels);

  // Envía una alerta con un mensaje.
  alert.notify('Alguien en frente de la casa');

  console.log('\n'); // Línea en blanco para mejor legibilidad en consola.
}

// Llamada a la función principal.
main();
