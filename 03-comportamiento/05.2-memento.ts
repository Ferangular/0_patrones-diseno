/**
 * !Patrón de Diseño Memento
 * El patrón Memento permite capturar y externalizar el estado interno de un objeto,
 * de manera que el objeto pueda ser restaurado a ese estado más tarde.
 *
 * * Es útil cuando necesitamos guardar el estado de un objeto y permitir su restauración
 * * sin exponer su estructura interna.
 *
 * * Este patrón consta de tres componentes:
 *   - **Originator**: El objeto cuyo estado se va a guardar (en este caso, la pizarra).
 *   - **Memento**: El objeto que guarda el estado de un Originator.
 *   - **Caretaker**: El objeto que gestiona los Mementos, guardándolos y recuperándolos cuando sea necesario.
 *
 * Más información sobre el patrón: https://refactoring.guru/es/design-patterns/memento
 */

import { COLORS } from '../helpers/colors.ts';

// --- Clase Memento ---
// La clase `DrawingMemento` es responsable de almacenar una copia del estado de la pizarra
// en un momento específico, para poder restaurarlo más tarde.

class DrawingMemento {
  private shapes: string[];

  constructor(shapes: string[]) {
    // Almacenamos una copia del estado de las figuras, para prevenir modificaciones
    // posteriores que alteren el estado almacenado.
    this.shapes = [...shapes];
  }

  // Método para obtener una copia del estado almacenado
  getShapes(): string[] {
    return [...this.shapes];
  }
}

// --- Clase Originator ---
// La clase `DrawingBoard` representa el objeto cuyo estado queremos guardar y restaurar.
// En este caso, la pizarra en la que agregamos figuras.

class DrawingBoard {
  private shapes: string[] = [];

  // Método para agregar una figura a la pizarra
  addShape(shape: string): void {
    this.shapes.push(shape);
    console.log(`Figura agregada: ${shape}`);
  }

  // Método para mostrar el estado actual de la pizarra en la consola
  showBoard(): void {
    console.log('Pizarra actual:', this.shapes.join(', ') || 'Vacía');
  }

  // Método para guardar el estado actual de la pizarra en un Memento
  save(): DrawingMemento {
    return new DrawingMemento(this.shapes);
  }

  // Método para restaurar el estado de la pizarra a partir de un Memento
  restore(memento: DrawingMemento): void {
    // Restauramos el estado guardado previamente en el Memento
    this.shapes = memento.getShapes();
    console.log('%c\nEstado de la pizarra restaurado.', COLORS.blue);
  }
}

// --- Clase Caretaker ---
// La clase `History` gestiona el almacenamiento y recuperación de los Mementos.
// Actúa como el "cuidador" de los objetos Memento, permitiendo que el estado se
// guarde y se recupere en el futuro.

class History {
  private mementos: DrawingMemento[] = [];

  // Método para guardar un Memento en el historial
  // Este método se llama cada vez que se desea guardar el estado de la pizarra.
  push(memento: DrawingMemento): void {
    this.mementos.push(memento);
  }

  // Método para recuperar el último Memento guardado (efectivamente, "deshacer" el último cambio)
  // Si no hay Mementos guardados, devuelve undefined.
  pop(): DrawingMemento | undefined {
    return this.mementos.pop();
  }
}

// --- Código Cliente ---
// Este es el código que simula el uso del patrón Memento.
// Los usuarios agregan figuras a la pizarra, guardan su estado en el historial,
// y luego pueden restaurar ese estado en cualquier momento.

function main(): void {
  // Creamos una nueva pizarra y un objeto History para gestionar los Mementos.
  const drawingBoard = new DrawingBoard();
  const history = new History();

  // Agregar figuras a la pizarra y guardar el estado de la pizarra después de cada adición
  drawingBoard.addShape('Círculo');
  history.push(drawingBoard.save());  // Guardamos el estado actual de la pizarra

  drawingBoard.addShape('Cuadrado');
  history.push(drawingBoard.save());  // Guardamos el estado actualizado

  drawingBoard.addShape('Triángulo');
  drawingBoard.showBoard(); // Mostramos el estado actual de la pizarra

  // Restauramos el estado anterior, "deshaciendo" el último cambio
  drawingBoard.restore(history.pop()!);  // Recuperamos el último Memento y restauramos el estado
  drawingBoard.showBoard(); // Mostramos el estado después de deshacer el último cambio

  // Restauramos otro estado anterior
  drawingBoard.restore(history.pop()!);  // Recuperamos el segundo Memento y restauramos el estado
  drawingBoard.showBoard(); // Mostramos el estado después de deshacer nuevamente

  // (Este código está comentado ya que es un ejemplo de más deshacer)
  // drawingBoard.restore(history.pop()!);
  // drawingBoard.showBoard(); // Mostrar estado después de deshacer nuevamente
}

// Ejecutamos el código de ejemplo
main();