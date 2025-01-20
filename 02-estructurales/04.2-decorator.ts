/**
 * ! Patrón Decorador
 * Este código implementa el patrón de diseño estructural conocido como "Decorador".
 *
 * * ¿Qué es?
 * El Decorador permite añadir comportamientos o funcionalidades adicionales a un objeto
 * de forma dinámica, sin modificar su estructura base. Esto se logra envolviendo el objeto
 * base dentro de objetos decoradores que amplían su funcionalidad.
 *
 * * Diferencias clave:
 * - No debe confundirse con los decoradores de TypeScript (por ejemplo, @Component),
 *   que son metadatos para clases, propiedades o métodos.
 *
 * * Casos de uso:
 * Es especialmente útil cuando:
 * - Necesitas añadir funcionalidades específicas a un objeto en tiempo de ejecución.
 * - Quieres evitar la proliferación de subclases para cada combinación de funcionalidades.
 *
 * Más información: https://refactoring.guru/es/design-patterns/decorator
 */

// 1. Interfaz Character
/**
 * Interfaz que define las operaciones principales para un personaje.
 * * Métodos:
 * - `getDescription`: Proporciona una descripción del personaje.
 * - `getStats`: Devuelve las estadísticas (ataque y defensa) del personaje.
 */
interface Character {
  getDescription(): string;
  getStats(): { attack: number; defense: number };
}

// 2. Clase BasicCharacter
/**
 * Implementación base de un personaje. Representa un personaje sin accesorios.
 * * Implementa la interfaz `Character`.
 * * Métodos:
 * - `getDescription`: Devuelve "Personaje básico".
 * - `getStats`: Proporciona estadísticas iniciales: ataque = 10, defensa = 10.
 */
class BasicCharacter implements Character {
  getDescription(): string {
    return 'Personaje básico';
  }

  getStats(): { attack: number; defense: number } {
    return { attack: 10, defense: 10 };
  }
}

// 3. Clase Decoradora CharacterDecorator
/**
 * Clase abstracta que actúa como base para todos los decoradores.
 * * Principio de diseño:
 * - Sigue el principio de sustitución de Liskov, ya que extiende la interfaz `Character`.
 *
 * * Propiedades:
 * - `character`: Objeto `Character` decorado (composición).
 *
 * * Métodos:
 * - Sobrescribe `getDescription` y `getStats` para delegar al objeto decorado.
 */
abstract class CharacterDecorator implements Character {
  protected character: Character;

  constructor(character: Character) {
    this.character = character;
  }

  getDescription(): string {
    return this.character.getDescription();
  }

  getStats(): { attack: number; defense: number } {
    return this.character.getStats();
  }
}

// 4. Decorador Concreto HelmetDecorator
/**
 * Decorador que añade un casco al personaje.
 * * Efecto:
 * - Aumenta la defensa en +5.
 *
 * * Implementación:
 * - Modifica el método `getStats` para incluir el incremento de defensa.
 * - Modifica el método `getDescription` para agregar "con Casco".
 */
class HelmetDecorator extends CharacterDecorator {
  override getDescription(): string {
    return this.character.getDescription() + '\n * con Casco';
  }

  override getStats(): { attack: number; defense: number } {
    const stats = this.character.getStats();
    return { attack: stats.attack, defense: stats.defense + 5 };
  }
}

// 5. Decorador Concreto ShieldDecorator
/**
 * Decorador que añade un escudo al personaje.
 * * Efecto:
 * - Aumenta la defensa en +10.
 */
class ShieldDecorator extends CharacterDecorator {
  override getDescription(): string {
    return this.character.getDescription() + '\n * con Escudo';
  }

  override getStats(): { attack: number; defense: number } {
    const stats = this.character.getStats();
    return { attack: stats.attack, defense: stats.defense + 10 };
  }
}

// 6. Decorador Concreto SwordDecorator
/**
 * Decorador que añade una espada al personaje.
 * * Efecto:
 * - Aumenta el ataque en +7.
 */
class SwordDecorator extends CharacterDecorator {
  override getDescription(): string {
    return this.character.getDescription() + '\n * con Espada';
  }

  override getStats(): { attack: number; defense: number } {
    const stats = this.character.getStats();
    return { attack: stats.attack + 7, defense: stats.defense };
  }
}

// 7. Decorador Concreto RingDecorator
/**
 * Decorador que añade un anillo al personaje.
 * * Efecto:
 * - Aumenta el ataque en +3.
 */
class RingDecorator extends CharacterDecorator {
  override getDescription(): string {
    return this.character.getDescription() + '\n * con Anillo';
  }

  override getStats(): { attack: number; defense: number } {
    const stats = this.character.getStats();
    return { attack: stats.attack + 3, defense: stats.defense };
  }
}

// 8. Código Cliente para Probar el Decorador
/**
 * Función principal que simula la creación de un personaje y le añade decoradores.
 *
 * * Proceso:
 * 1. Crea un personaje básico.
 * 2. Añade decoradores (casco, escudo, espada, anillo).
 * 3. Imprime la descripción y las estadísticas en cada paso.
 */
function main() {
  let character: Character = new BasicCharacter();
  console.log('\nPersonaje inicial:', character.getDescription());
  console.log('Estadísticas:', character.getStats());

  character = new HelmetDecorator(character);
  console.log('\nCon Casco:', character.getDescription());
  console.log('Estadísticas:', character.getStats());

  character = new ShieldDecorator(character);
  console.log('\nCon Escudo:', character.getDescription());
  console.log('Estadísticas:', character.getStats());

  character = new SwordDecorator(character);
  console.log('\nCon Espada:', character.getDescription());
  console.log('Estadísticas:', character.getStats());

  character = new RingDecorator(character);
  console.log('\nCon Anillo:', character.getDescription());
  console.log('Estadísticas:', character.getStats());
}

main();
