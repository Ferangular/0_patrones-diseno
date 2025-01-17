/**
 *
 * Aquí tienes una versión sintetizada y estructurada para incluir en un manual práctico y eficiente, manteniendo claridad y concisión:
 *
 * Patrón de Diseño: Inmutabilidad con Copia
 * La inmutabilidad es una buena práctica en el desarrollo de aplicaciones, ya que previene cambios indeseados en el estado. Sin embargo, no siempre es posible implementarla de forma estricta. En estos casos, podemos aplicar el patrón de copia con modificación, que consiste en crear una nueva instancia del objeto con los cambios deseados, manteniendo la integridad del estado original.
 *
 * Ventajas
 * Historial de Estados: Facilita el manejo de historiales en aplicaciones interactivas, permitiendo funcionalidades como deshacer (undo) y rehacer (redo).
 * Seguridad: Reduce errores derivados de modificaciones inesperadas en los datos.
 * Claridad: Promueve un código más legible y predecible.
 */

import { COLORS } from '../helpers/colors.ts';

class CodeEditorState {
  readonly content: string;
  readonly cursorPosition: number;
  readonly unsavedChanges: boolean;

  constructor(
    content: string,
    cursorPosition: number,
    unsavedChanges: boolean
  ) {
    this.content = content;
    this.cursorPosition = cursorPosition;
    this.unsavedChanges = unsavedChanges;
  }
  /**
   * ! Copia del estado con modificaciones específicas
   * Este método permite crear una nueva instancia del estado
   * aplicando los cambios deseados sin modificar el estado original.
   */
  copyWith({
    content,
    cursorPosition,
    unsavedChanges,
  }: Partial<CodeEditorState>): CodeEditorState {
    return new CodeEditorState(
      content ?? this.content,
      cursorPosition ?? this.cursorPosition,
      unsavedChanges ?? this.unsavedChanges
    );
  }
  /**
   * ! Muestra el estado actual
   * Representación amigable para debugging y revisión.
   */
  displayState() {
    console.log('\n%cEstado del editor:', COLORS.green);
    console.log(`
        Contenido: ${this.content}
        Cursor Pos: ${this.cursorPosition}
        Unsaved changes: ${this.unsavedChanges}
    `);
  }
}

class CodeEditorHistory {
  private history: CodeEditorState[] = [];
  private currentIndex: number = -1; // 0,1,2,3,4,5,6
  /**
   * ! Guardar estado
   * Añade el estado actual al historial y elimina estados futuros si se sobrescriben.
   */
  save(state: CodeEditorState): void {
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.splice(0, this.currentIndex + 1);
    }

    this.history.push(state);
    this.currentIndex++;
  }

  /**
   * ! Deshacer (Undo)
   * Retrocede al estado anterior si es posible.
   */
  undo(): CodeEditorState | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    }
    return null;
  }

  /**
   * ! Rehacer (Redo)
   * Avanza al siguiente estado si existe.
   */
  redo(): CodeEditorState | null {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }
    return null;
  }
}

// Ejemplo práctico
function main() {
  const history = new CodeEditorHistory();
  let editorState = new CodeEditorState("console.log('Hola Mundo');", 2, false);

  history.save(editorState);
  console.log('%cEstado inicial', COLORS.blue);
  editorState.displayState();

  // Primer cambio
  editorState = editorState.copyWith({
    content: "console.log('Hola Mundo'); \nconsole.log('Nueva línea');",
    cursorPosition: 3,
    unsavedChanges: true,
  });
  history.save(editorState);

  console.log('\n%cDespués del primer cambio', COLORS.blue);
  editorState.displayState();

  // Mover cursor
  console.log('\n%cDespués de mover el cursor', COLORS.blue);
  editorState = editorState.copyWith({ cursorPosition: 5 });
  history.save(editorState);
  editorState.displayState();

  // Deshacer
  console.log('\n%cDespués del Undo', COLORS.blue);
  editorState = history.undo()!;
  editorState.displayState();

  // Rehacer
  console.log('\n%cDespués del Redo', COLORS.blue);
  editorState = history.redo()!;
  editorState.displayState();
}

main();