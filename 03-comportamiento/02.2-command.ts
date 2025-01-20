/**
 * ! Patrón Command
 * El patrón Command encapsula una solicitud como un objeto. Esto permite parametrizar objetos con diferentes solicitudes,
 * encolar solicitudes, registrar solicitudes y soportar operaciones que pueden deshacerse.
 *
 * Este patrón es útil cuando necesitamos desacoplar el objeto que invoca una operación del objeto que sabe cómo realizarla.
 *
 * **Ventajas**:
 * - Desacopla el origen de una solicitud del objeto que la procesa.
 * - Permite la creación de operaciones que pueden ser deshechas (undo).
 * - Facilita la encolación o el registro de solicitudes.
 *
 * Fuente:
 * - Refactoring Guru: https://refactoring.guru/es/design-patterns/command
 */

// Importamos un conjunto de colores predefinidos para mejorar la legibilidad de los mensajes en consola
import { COLORS } from '../helpers/colors.ts';

// 1. Interfaz Command
// Define una interfaz común para todos los comandos concretos. Cada comando debe implementar el método `execute`.
interface Command {
  execute(): void;
}

// 2. Clase Receptor - TextEditor
// El TextEditor es el receptor de las solicitudes. Es quien realiza las operaciones efectivas: escribir, copiar, pegar y deshacer.

class TextEditor {
  private text: string = ''; // Almacena el texto actual en el editor.
  private clipboard: string = ''; // Almacena el texto copiado (portapapeles).
  private history: string[] = []; // Pila de estados anteriores para soportar la funcionalidad de deshacer.

  // Método para agregar texto al editor, guardando el estado anterior para permitir deshacer.
  type(text: string): void {
    this.history.push(this.text); // Guardamos el estado antes de realizar el cambio.
    this.text += text; // Actualizamos el texto con la nueva entrada.
  }

  // Método para copiar el texto actual al portapapeles.
  copy(): void {
    this.clipboard = this.text; // Guardamos el texto en el portapapeles.
    console.log(
        `Texto copiado al portapapeles: \n%c"${this.clipboard}"`,
        COLORS.blue
    );
  }

  // Método para pegar el texto desde el portapapeles al editor.
  paste(): void {
    this.history.push(this.text); // Guardamos el estado antes de pegar.
    this.text += this.clipboard; // Pegamos el contenido del portapapeles.
    console.log(`Texto después de pegar: \n%c"${this.text}"`, COLORS.blue);
  }

  // Método para deshacer la última acción, restaurando el texto al estado anterior.
  undo(): void {
    if (this.history.length > 0) {
      this.text = this.history.pop()!; // Restauramos el último estado guardado en la pila.
      console.log(`Texto después de deshacer: \n%c"${this.text}"`, COLORS.blue);
      return;
    }

    console.log('No hay nada para deshacer.'); // Si no hay historial, no podemos deshacer.
  }

  // Método para obtener el texto actual del editor.
  getText(): string {
    return this.text;
  }
}

// 3. Clases de Comandos Concretos
// Implementamos comandos específicos que invocan acciones del receptor (TextEditor).

class CopyCommand implements Command {
  private editor: TextEditor;

  constructor(textEditor: TextEditor) {
    this.editor = textEditor;
  }

  // Implementación del comando execute para copiar el texto.
  execute(): void {
    this.editor.copy(); // Llamamos al método copy() del TextEditor.
  }
}

class PasteCommand implements Command {
  private editor: TextEditor;

  constructor(textEditor: TextEditor) {
    this.editor = textEditor;
  }

  // Implementación del comando execute para pegar el texto.
  execute(): void {
    this.editor.paste(); // Llamamos al método paste() del TextEditor.
  }
}

class UndoCommand implements Command {
  private editor: TextEditor;

  constructor(textEditor: TextEditor) {
    this.editor = textEditor;
  }

  // Implementación del comando execute para deshacer la última acción.
  execute(): void {
    this.editor.undo(); // Llamamos al método undo() del TextEditor.
  }
}

// 4. Clase Cliente - Toolbar
// La barra de herramientas (Toolbar) actúa como el invocador de los comandos. Se encarga de asignar los comandos a los botones
// y ejecutarlos cuando se hace clic en los mismos.

class Toolbar {
  private commands: Record<string, Command> = {}; // Mapa de comandos asignados a botones.

  // Método para asignar un comando a un botón específico.
  setCommand(button: string, command: Command): void {
    this.commands[button] = command;
  }

  // Método para simular el clic de un botón. Ejecuta el comando asociado al botón.
  clickButton(button: string): void {
    if (this.commands[button]) {
      this.commands[button].execute(); // Ejecutamos el comando asignado.
      return;
    }

    console.error(`No hay un comando asignado al botón "${button}"`); // Si no se encuentra un comando asignado.
  }
}

// 5. Código Cliente para probar el patrón Command
// Este es el punto de entrada que simula el uso de un editor de texto y la barra de herramientas. Se prueba la creación de comandos
// y su ejecución a través de la barra de herramientas.

function main() {
  const editor = new TextEditor(); // Creamos una instancia del editor de texto.
  const toolbar = new Toolbar(); // Creamos una instancia de la barra de herramientas.

  // Creamos comandos concretos para las acciones de copiar, pegar y deshacer.
  const copyCommand = new CopyCommand(editor);
  const pasteCommand = new PasteCommand(editor);
  const undoCommand = new UndoCommand(editor);

  // Asignamos los comandos a los botones de la barra de herramientas.
  toolbar.setCommand('copy', copyCommand);
  toolbar.setCommand('paste', pasteCommand);
  toolbar.setCommand('undo', undoCommand);

  // Simulación de edición de texto.
  editor.type('H');
  editor.type('o');
  editor.type('l');
  editor.type('a');
  editor.type(' ');
  editor.type('M');
  editor.type('u');
  editor.type('n');
  editor.type('d');
  editor.type('o');
  editor.type('!');
  console.log(`Texto actual: %c"${editor.getText()}"`, COLORS.green);

  // Usamos los comandos a través de la barra de herramientas.
  console.log('\nCopiando texto:');
  toolbar.clickButton('copy');

  console.log('\nPegando texto:');
  toolbar.clickButton('paste');

  console.log('\nDeshaciendo la última acción:');
  toolbar.clickButton('undo');

  console.log('\nDeshaciendo de nuevo:');
  toolbar.clickButton('undo');

  console.log(`\nTexto final: "${editor.getText()}"`);
}

// Llamamos a la función main para ejecutar el ejemplo.
main();
