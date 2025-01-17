/**
 * Patrón Singleton
 * El Singleton es un patrón de diseño creacional que asegura que una clase tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * 📌 ¿Cuándo usarlo?
 * Cuando necesitas una única instancia para compartir información o gestionar un recurso centralizado.
 * Ejemplo: Control de configuraciones, conexión a bases de datos o manejo de estado global.
 * 🌟 Ventajas
 * Control de Instancias: Solo se crea una única instancia.
 * Fácil Acceso Global: Centraliza la administración.
 * Ahorro de Recursos: Evita múltiples inicializaciones innecesarias
 * https://refactoring.guru/es/design-patterns/singleton
 */

/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * Más información: https://refactoring.guru/es/design-patterns/singleton
 */

import { COLORS } from '../helpers/colors.ts';

class DragonBalls {
  // Atributo estático para guardar la instancia única
  private static instance: DragonBalls;
  private ballsCollected: number; // Estado interno de las bolas recolectadas

  // Constructor privado: evita que se creen instancias fuera de la clase
  private constructor() {
    this.ballsCollected = 0;
  }

  // Método estático para acceder a la instancia única
  public static getInstance(): DragonBalls {
    if (!DragonBalls.instance) {
      DragonBalls.instance = new DragonBalls();
      console.log('%cLas pelotas del Dragón han sido creadas!', COLORS.green);
    }

    return DragonBalls.instance;
  }

  // Método para recolectar bolas
  collectBall(): void {
    if (this.ballsCollected < 7) {
      this.ballsCollected++;
      console.log(
          `Pelota recolectada. Total de esferas: ${this.ballsCollected}`
      );
      return;
    }

    console.log(
        'Ya se han recolectado las 7 esferas del Dragón! Invoca a Shenlong'
    );
  }

  // Método para invocar a Shenlong
  summonShenlong(): void {
    if (this.ballsCollected === 7) {
      console.log('Shenlong ha sido invocado, ¡Pide tu deseo!');
      this.ballsCollected = 0; // Reinicia el estado
      return;
    }

    console.log(
        `\nAún faltan ${7 - this.ballsCollected} pelotas para invocar a Shenlong`
    );
  }
}

function main() {
  const gokuDragonBalls = DragonBalls.getInstance();

  gokuDragonBalls.collectBall();
  gokuDragonBalls.collectBall();
  gokuDragonBalls.collectBall();

  gokuDragonBalls.summonShenlong();

  const vegetaDragonBalls = DragonBalls.getInstance();
  vegetaDragonBalls.collectBall();
  vegetaDragonBalls.collectBall();
  vegetaDragonBalls.collectBall();
  vegetaDragonBalls.collectBall();

  gokuDragonBalls.summonShenlong();

  vegetaDragonBalls.summonShenlong();
}

main();
