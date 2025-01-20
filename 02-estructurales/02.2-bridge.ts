/**
 * ! Patrón Bridge
 * El patrón Bridge permite desacoplar una abstracción de su implementación,
 * lo que facilita que ambas puedan evolucionar de manera independiente.
 *
 * Este patrón es útil cuando:
 * - *Se necesita mantener separadas múltiples implementaciones de una misma abstracción.*
 * - *Es necesario desacoplar la lógica de negocio de la lógica de presentación.*
 * - *Se requiere flexibilidad para cambiar o extender los canales de comunicación sin
 *    modificar la lógica del cliente.*
 *
 * Este ejemplo implementa un sistema de notificaciones en el que se pueden
 * variar tanto el tipo de notificación (abstracta) como el canal de envío (implementación).
 */

import { COLORS } from '../helpers/colors.ts'; // Helper para aplicar colores a las salidas de consola.

// 1. Interfaz NotificationChannel
/**
 * Define el contrato que todos los canales de comunicación deben cumplir.
 * Cada canal necesita implementar el método `send`, encargado de procesar
 * el envío de mensajes.
 */
interface NotificationChannel {
  send(message: string): void; // Envía un mensaje utilizando el canal correspondiente.
}

// 2. Implementaciones de Canales de Comunicación

/**
 * Canal para el envío de notificaciones por correo electrónico.
 * Sobrescribe el método `send` para manejar la lógica específica de envío.
 */
class EmailChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando correo electrónico: ${message}`);
  }
}

/**
 * Canal para el envío de notificaciones por SMS.
 * Ideal para mensajes cortos y directos.
 */
class SMSChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando SMS: ${message}`);
  }
}

/**
 * Canal para el envío de notificaciones Push.
 * Usado comúnmente en dispositivos móviles para notificaciones instantáneas.
 */
class PushNotificationChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando Push: ${message}`);
  }
}

// 3. Clase Abstracta Notification
/**
 * Clase base que define una notificación.
 * Esta clase mantiene una referencia al canal de comunicación y
 * define métodos que las clases concretas deben implementar.
 */
abstract class Notification {
  protected channel: NotificationChannel; // Canal de comunicación usado por la notificación.

  constructor(channel: NotificationChannel) {
    this.channel = channel;
  }

  /**
   * Método abstracto que las subclases implementarán para definir
   * el comportamiento específico de notificación.
   *
   * @param message - Mensaje a enviar.
   */
  abstract notify(message: string): void;

  /**
   * Permite cambiar el canal de comunicación dinámicamente.
   *
   * @param channel - Nuevo canal de comunicación.
   */
  abstract setChannel(channel: NotificationChannel): void;
}

// 4. Clases Concretas de Notificaciones

/**
 * Notificación específica para alertas.
 * Usada típicamente para mensajes críticos o de alta prioridad.
 */
class AlertNotification extends Notification {
  override notify(message: string): void {
    console.log('\n%cNotificación de Alerta:', COLORS.red);
    this.channel.send(message); // Delegación del envío al canal configurado.
  }

  override setChannel(channel: NotificationChannel): void {
    this.channel = channel; // Actualización dinámica del canal de comunicación.
  }
}

/**
 * Notificación específica para recordatorios.
 * Usada para mensajes que informan sobre eventos próximos o tareas pendientes.
 */
class ReminderNotification extends Notification {
  notify(message: string): void {
    console.log('\n%cNotificación de Recordatorio:', COLORS.blue);
    this.channel.send(message);
  }

  setChannel(channel: NotificationChannel): void {
    this.channel = channel;
  }
}

/**
 * Notificación específica para mensajes Push.
 * Ideal para interactuar con usuarios en tiempo real.
 */
class PushNotification extends Notification {
  override notify(message: string): void {
    console.log('\n%cNotificación de Push:', COLORS.green);
    this.channel.send(message);
  }

  override setChannel(channel: NotificationChannel): void {
    this.channel = channel;
  }
}

// 5. Código Cliente para Probar el Patrón Bridge
/**
 * El cliente es responsable de crear las instancias de las notificaciones y los canales
 * y de configurarlas según sea necesario. Esto demuestra cómo el patrón Bridge permite
 * variar tanto la abstracción (Notification) como la implementación (NotificationChannel)
 * de forma independiente.
 */
function main() {
  // Crear una notificación de alerta utilizando el canal de correo electrónico.
  const alert = new AlertNotification(new EmailChannel());
  alert.notify('Alerta de seguridad: Se ha detectado un acceso no autorizado.');

  // Cambiar el canal a SMS y volver a enviar la alerta.
  alert.setChannel(new SMSChannel());
  alert.notify('Alerta de seguridad: Se ha detectado un acceso no autorizado.');

  // Crear una notificación de recordatorio utilizando el canal de SMS.
  const reminder = new ReminderNotification(new SMSChannel());
  reminder.notify('Recordatorio: Tu cita con el médico es mañana a las 10:00 a.m.');

  // Cambiar el canal del recordatorio a notificaciones push.
  reminder.setChannel(new PushNotificationChannel());
  reminder.notify('Recordatorio: Tu cita con el médico es mañana a las 10:00 a.m.');

  // Crear una notificación de push usando el canal de notificación push.
  const push = new PushNotification(new PushNotificationChannel());
  push.notify('Nueva actualización disponible. Haz clic para instalar.');
}

main(); // Ejecuta el flujo principal del programa.