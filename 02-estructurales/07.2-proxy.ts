/**
 * ! Patrón Proxy
 *
 * El patrón Proxy actúa como un intermediario o sustituto de un objeto real,
 * controlando su acceso. Este patrón se utiliza cuando se requiere un control
 * sobre las operaciones que se realizan sobre un objeto, por ejemplo, para
 * implementar restricciones de acceso o modificar el comportamiento de un
 * objeto antes de delegar la tarea al objeto real.
 *
 * En este ejemplo, se utiliza un Proxy para controlar el acceso a un
 * documento confidencial, asegurándose de que solo los usuarios con los
 * permisos adecuados puedan visualizar su contenido.
 *
 * Para más detalles sobre el patrón Proxy, puedes consultar el siguiente
 * enlace: https://refactoring.guru/es/design-patterns/proxy
 */

import { COLORS } from '../helpers/colors.ts';

// 1. Interfaz Document
/**
 * La interfaz `Document` define el contrato que deben seguir los objetos
 * que representen documentos. El método `displayContent()` es utilizado
 * para mostrar el contenido del documento, recibiendo un objeto `User`
 * que representa al usuario que intenta acceder a dicho documento.
 */
interface Document {
  displayContent(user: User): void;
}

// 2. Clase que representa el Documento Confidencial - ConfidentialDocument
/**
 * La clase `ConfidentialDocument` es una implementación concreta de la
 * interfaz `Document` que contiene el contenido confidencial de un
 * documento. Solo se le permite acceder a este contenido si se tienen
 * los permisos adecuados.
 *
 * El método `displayContent()` imprime el contenido del documento en
 * la consola.
 */
class ConfidentialDocument implements Document {
  private content: string;

  constructor(content: string) {
    this.content = content; // Contenido confidencial del documento
  }

  /**
   * Muestra el contenido del documento en consola.
   * @param user El usuario que intenta acceder al contenido del documento.
   */
  displayContent(): void {
    console.log(`Contenido del documento: \n%c${this.content}\n`, COLORS.blue);
  }
}

// 3. Clase Proxy - DocumentProxy
/**
 * La clase `DocumentProxy` actúa como un intermediario entre el cliente
 * y el documento real (`ConfidentialDocument`). Antes de permitir el
 * acceso al contenido del documento, el Proxy verifica si el usuario
 * tiene los permisos necesarios para visualizar dicho contenido.
 *
 * El Proxy recibe un arreglo de roles (`mustHaveRoles`) que define los
 * roles que tienen permisos para ver el contenido del documento.
 */
class DocumentProxy implements Document {
  private document: Document;
  private mustHaveRoles: string[];

  /**
   * Constructor que inicializa el Proxy con un documento real y los
   * roles que tienen permisos para acceder al contenido.
   * @param document El documento real que será gestionado por el Proxy.
   * @param mustHaveRoles Lista de roles que tienen permisos para ver
   * el contenido del documento.
   */
  constructor(document: Document, mustHaveRoles: string[] = []) {
    this.document = document;
    this.mustHaveRoles = mustHaveRoles;
  }

  /**
   * Verifica el rol del usuario y, si tiene el permiso adecuado,
   * delega la tarea al documento real para mostrar su contenido.
   * En caso contrario, muestra un mensaje de error indicando que
   * el acceso ha sido denegado.
   *
   * @param user El usuario que solicita acceder al contenido del documento.
   */
  displayContent(user: User): void {
    if (this.mustHaveRoles.includes(user.getRole())) {
      // Si el usuario tiene el rol adecuado, muestra el contenido
      this.document.displayContent(user);
      return;
    }

    // Si el usuario no tiene el rol adecuado, deniega el acceso
    console.log(
        `%cAcceso denegado. ${user.getName()}, no tienes permisos suficientes para ver este documento.`,
        COLORS.red
    );
  }
}

// 4. Clase que representa al Usuario - User
/**
 * La clase `User` representa a un usuario que puede tener uno de
 * dos roles: 'admin' o 'user'. Dependiendo de su rol, el usuario
 * podrá o no acceder a ciertos documentos.
 */
class User {
  private name: string;
  private role: 'admin' | 'user';

  constructor(name: string, role: 'admin' | 'user') {
    this.name = name;
    this.role = role;
  }

  /**
   * Obtiene el nombre del usuario.
   * @returns El nombre del usuario.
   */
  getName(): string {
    return this.name;
  }

  /**
   * Obtiene el rol del usuario ('admin' o 'user').
   * @returns El rol del usuario.
   */
  getRole(): string {
    return this.role;
  }
}

// 5. Código Cliente para probar el Proxy
/**
 * La función `main()` actúa como cliente que crea instancias de
 * documentos y usuarios, y demuestra cómo el Proxy controla el
 * acceso al documento confidencial basado en el rol del usuario.
 */
function main() {
  // Crear un documento confidencial con contenido secreto
  const confidentialDoc = new ConfidentialDocument(
      'Este es el contenido confidencial del documento.'
  );

  // Crear un Proxy para el documento confidencial que solo permite acceso a usuarios con rol 'admin'
  const proxy = new DocumentProxy(confidentialDoc, ['admin']);

  // Crear dos usuarios con diferentes roles
  const user1 = new User('Juan', 'user'); // Usuario sin acceso
  const user2 = new User('Ana', 'admin'); // Usuario con acceso

  // Intento de acceso por parte del usuario 1 (sin permisos)
  console.log('Intento de acceso del usuario 1:');
  proxy.displayContent(user1); // Debería denegar el acceso

  // Intento de acceso por parte del usuario 2 (con permisos)
  console.log('\nIntento de acceso del usuario 2:');
  proxy.displayContent(user2); // Debería permitir el acceso
}

// Ejecutar el código de ejemplo
main();
