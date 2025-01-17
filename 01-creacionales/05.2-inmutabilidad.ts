/**
 * Sección: Inmutabilidad con Copia
 * Descripción:
 * La inmutabilidad es una práctica clave en el desarrollo de software que asegura que los objetos
 * no sean modificados directamente después de ser creados. Esto facilita el mantenimiento de un
 * historial de estados y la prevención de efectos secundarios no deseados. En situaciones donde
 * es necesario realizar cambios, se utiliza el patrón de "Copia con Modificaciones" (Copy-With),
 * que crea una nueva instancia del objeto con las modificaciones necesarias.

/**
 1.	Completen el método copyWith en la clase Player para que permita 
 crear una copia con cambios en name, score o level.
 
 2.	Usen el código cliente para probar el funcionamiento de copyWith, 
 haciendo cambios en el puntaje, nivel y nombre del jugador.
 */

import { COLORS } from '../helpers/colors.ts';

interface PlayerProps {
  name: string;
  score: number;
  level: number;
}

/**
 * Clase Player inmutable
 * Permite gestionar un jugador en un estado constante y realizar cambios
 * mediante el patrón de copia con modificaciones.
 */
class Player {
  readonly name: string;
  readonly score: number;
  readonly level: number;

  constructor({ level, name, score }: PlayerProps) {
    this.name = name;
    this.score = score;
    this.level = level;
  }

  /**
   * ! Método copyWith
   * Crea una copia del jugador con cambios opcionales en las propiedades.
   * Si no se especifica un valor, mantiene el valor actual.
   *
   * @param name - Nombre del jugador (opcional).
   * @param score - Puntaje del jugador (opcional).
   * @param level - Nivel del jugador (opcional).
   * @returns Nueva instancia de Player.
   */
  copyWith({ name, score, level }: Partial<Player>): Player {
    return new Player({
      level: level ?? this.level,
      name: name ?? this.name,
      score: score ?? this.score,
    });
  }

  /**
   * Muestra el estado actual del jugador en la consola con estilos.
   */
  displayState(): void {
    console.log(`\n%cJugador: ${this.name}`, COLORS.green);
    console.log(`%cPuntaje: ${this.score}`, COLORS.yellow);
    console.log(`%cNivel: ${this.level}`, COLORS.blue);
  }
}

// Código cliente para probar la funcionalidad
function main() {
  // Crear jugador inicial
  let player = new Player({
    level: 1,
    name: 'Carlos',
    score: 0,
  });
  console.log('Estado inicial:');
  player.displayState();

  // Incrementar el puntaje
  player = player.copyWith({ score: 10 });
  console.log('\nDespués de incrementar el puntaje:');
  player.displayState();

  // Subir de nivel
  player = player.copyWith({ level: 2 });
  console.log('\nDespués de subir de nivel:');
  player.displayState();

  // Cambiar el nombre del jugador
  player = player.copyWith({ name: 'Carlos Pro' });
  console.log('\nDespués de cambiar el nombre:');
  player.displayState();
}

main();
