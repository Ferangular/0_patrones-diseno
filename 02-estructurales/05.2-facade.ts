/**
 * ! Patrón Facade
 * Este patrón de diseño tiene como objetivo proporcionar una interfaz simplificada para interactuar
 * con un subsistema complejo.
 *
 * La Facade actúa como una capa intermedia que expone una API de alto nivel,
 * ocultando la complejidad de las interacciones entre los componentes internos.
 *
 * * Ventajas:
 * 1. Simplifica el uso de subsistemas complicados.
 * 2. Mejora la mantenibilidad al desacoplar los clientes del subsistema.
 * 3. Proporciona un punto único de interacción, útil para implementar lógica de inicialización y cierre.
 *
 * Documentación recomendada: https://refactoring.guru/es/design-patterns/facade
 */

// ! Tarea: Implementar el sistema de encendido y apagado de una computadora usando el Patrón Facade.
// Las clases del subsistema representan componentes internos (CPU, Memoria, Disco Duro).

import { COLORS } from '../helpers/colors.ts'; // Utilidad para formatear la salida en consola

// 1. Clases del Subsistema
// * Estas clases modelan componentes internos de la computadora y sus operaciones básicas.

class CPU {
  /**
   * Detiene todas las operaciones del procesador.
   */
  stopOperations(): void {
    console.log('CPU: Deteniendo operaciones.');
  }

  /**
   * Ajusta el contador de instrucciones para saltar a una posición específica en memoria.
   * @param position - Dirección de memoria a la que se desea saltar.
   */
  jump(position: number): void {
    console.log(`CPU: Saltando a la posición de memoria ${position}.`);
  }

  /**
   * Ejecuta las instrucciones en el procesador.
   */
  execute(): void {
    console.log('CPU: Ejecutando instrucciones.');
  }
}

class HardDrive {
  /**
   * Lee una cantidad de datos desde una posición específica del disco.
   * @param position - Dirección inicial en el disco.
   * @param size - Número de bytes a leer.
   * @returns Cadena binaria que representa los datos leídos.
   */
  read(position: number, size: number): string {
    console.log(
        `HardDrive: Leyendo ${size} bytes desde la posición ${position}.`
    );
    return '001010001010100';
  }

  /**
   * Detiene las operaciones del disco duro.
   */
  close(): void {
    console.log('HardDrive: Deteniendo disco duro.');
  }
}

class Memory {
  /**
   * Carga datos en una posición específica de la memoria.
   * @param position - Dirección de memoria.
   * @param data - Datos a almacenar.
   */
  load(position: number, data: string): void {
    console.log(`Memory: Cargando datos en la posición ${position} ${data}.`);
  }

  /**
   * Libera los recursos de memoria utilizados.
   */
  free(): void {
    console.log('Memory: Liberando memoria.');
  }
}

// 2. Clase Facade - ComputerFacade
// * La Facade expone métodos de alto nivel para gestionar las operaciones complejas del subsistema.

class ComputerFacade {
  // Componentes del subsistema encapsulados por la Facade.
  private cpu: CPU = new CPU();
  private memory: Memory = new Memory();
  private hardDrive: HardDrive = new HardDrive();

  /**
   * Constructor para inicializar la Facade con instancias de los componentes internos.
   */
  constructor() {}

  /**
   * Realiza todas las operaciones necesarias para encender la computadora.
   */
  startComputer(): void {
    console.log('\n%cIniciando la computadora...', COLORS.cyan);

    // Secuencia de inicialización: carga datos en memoria, ajusta la CPU y ejecuta instrucciones.
    this.memory.load(0, this.hardDrive.read(0, 1024));
    this.cpu.jump(0);
    this.cpu.execute();

    console.log('Computadora lista para usar.\n');
  }

  /**
   * Realiza todas las operaciones necesarias para apagar la computadora.
   */
  shutDownComputer(): void {
    console.log('\n%cApagando la computadora...', COLORS.red);
    console.log('Cerrando procesos y guardando datos...');

    // Secuencia de apagado: detiene la CPU, libera memoria y detiene el disco duro.
    this.cpu.stopOperations();
    this.memory.free();
    this.hardDrive.close();

    console.log('Computadora apagada.\n');
  }
}

// 3. Código Cliente para Usar la Facade
// * El cliente solo interactúa con los métodos de la Facade, sin conocer la lógica interna del subsistema.

function main() {
  // Creación de la Facade
  const computer = new ComputerFacade();

  // Encender la computadora usando la Facade
  computer.startComputer();

  // Apagar la computadora usando la Facade
  computer.shutDownComputer();
}

main();