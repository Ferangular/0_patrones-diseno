/**
 * ! Patron Chain of Responsibility
 * Este es un patrón de diseño de comportamiento que permite pasar solicitudes a lo largo
 * de una cadena de manejadores (objeto que implementa la misma interfaz).
 *
 * Este patrón es útil cuando se necesita procesar datos de diversas maneras, pero no se sabe
 * de antemano qué tipo de procesamiento es necesario ni el orden en el que debe ocurrir.
 * El patrón asegura que cada manejador se encargue de la solicitud si le corresponde, o la pase
 * al siguiente manejador en la cadena si no es su responsabilidad.
 */

import { COLORS } from '../helpers/colors.ts';

// 1. Interfaz 'Approver' que define la estructura de los manejadores en la cadena
interface Approver {
  setNext(approver: Approver): Approver; // Establece el siguiente manejador en la cadena
  approveRequest(amount: number): void; // Aprobación de solicitud según el monto
}

// 2. Clase Abstracta 'BaseApprover' que implementa la interfaz 'Approver' y maneja la lógica de la cadena
abstract class BaseApprover implements Approver {
  private nextApprover: Approver | null = null; // El siguiente manejador en la cadena (puede ser nulo)

  /**
   * Este método configura el siguiente manejador en la cadena de responsabilidad.
   *
   * @param approver El siguiente manejador a ser configurado.
   * @returns El manejador que se acaba de establecer como el siguiente en la cadena.
   */
  setNext(approver: Approver): Approver {
    this.nextApprover = approver;
    return approver; // Permite encadenar llamadas
  }

  /**
   * Método abstracto 'approveRequest' que debe ser implementado por las subclases.
   *
   * Cada clase concreta decidirá si puede aprobar la solicitud basada en el monto
   * o la pasará al siguiente manejador en la cadena.
   *
   * @param amount Monto de la solicitud a aprobar.
   */
  abstract approveRequest(amount: number): void;

  /**
   * Método protegido que pasa la solicitud al siguiente manejador si existe.
   *
   * Si no hay un manejador siguiente, significa que la solicitud no pudo ser aprobada.
   *
   * @param amount Monto de la solicitud que debe ser procesado por la cadena.
   */
  protected next(amount: number): void {
    if (this.nextApprover) {
      this.nextApprover.approveRequest(amount); // Llama al siguiente manejador en la cadena
      return;
    }

    console.log('Solicitud no pudo ser aprobada.'); // Fin de la cadena sin aprobación
  }
}

// 3. Clases Concretas que implementan el comportamiento de aprobación según el monto

// Manejador 'Supervisor', que puede aprobar solicitudes de hasta 1000
class Supervisor extends BaseApprover {
  override approveRequest(amount: number): void {
    if (amount <= 1000) {
      console.log(
          `Supervisor aprueba la compra de %c$${amount}`,
          COLORS.yellow
      );
      return;
    }

    // Si no puede aprobar, pasa la solicitud al siguiente manejador
    this.next(amount);
  }
}

// Manejador 'Manager', que puede aprobar solicitudes de hasta 5000
class Manager extends BaseApprover {
  override approveRequest(amount: number): void {
    if (amount <= 5000) {
      console.log(
          `Manager aprueba la compra de %c$${amount}`,
          COLORS.yellow
      );
      return;
    }

    // Si no puede aprobar, pasa la solicitud al siguiente manejador
    this.next(amount);
  }
}

// Manejador 'Director', que puede aprobar cualquier solicitud sin límite
class Director extends BaseApprover {
  override approveRequest(amount: number): void {
    console.log(`Director aprueba la compra de %c$${amount}`, COLORS.yellow);
  }
}

// 4. Código Cliente para probar la cadena de responsabilidad
function main() {
  // Instanciar los diferentes manejadores (Supervisor, Manager, Director)
  const supervisor = new Supervisor();
  const manager = new Manager();
  const director = new Director();

  // Configurar la cadena de responsabilidad (Supervisor -> Manager -> Director)
  supervisor.setNext(manager).setNext(director);

  // Probar solicitudes de compra de diferentes montos
  console.log('Solicitud de compra de $500:');
  supervisor.approveRequest(500); // El Supervisor debe aprobar esta solicitud

  console.log('\nSolicitud de compra de $3000:');
  supervisor.approveRequest(3000); // El Manager debe aprobar esta solicitud

  console.log('\nSolicitud de compra de $7000:');
  supervisor.approveRequest(7000); // El Director debe aprobar esta solicitud
}

// Ejecutar el código cliente
main();
