/**
 * ! Patrón Flyweight
 * El patrón Flyweight es un patrón de diseño estructural que busca minimizar
 * el consumo de memoria compartiendo objetos comunes entre varias instancias.
 *
 * * Este patrón es especialmente útil cuando trabajamos con un gran número
 * * de objetos que comparten características similares (como color, forma,
 * * daño en este caso), permitiendo reducir considerablemente el uso de memoria.
 *
 * Este ejemplo simula un sistema de disparos donde diferentes balas comparten
 * un "tipo" común (Flyweight) para optimizar recursos.
 */

import { COLORS } from '../helpers/colors.ts'; // Utilidad para formatear salidas en consola

// 1. Clase que representa el tipo de bala - BulletType (Flyweight)
/**
 * * Clase que encapsula las propiedades compartidas de un tipo de bala:
 * * nombre, daño y color.
 *
 * Los objetos de esta clase son los "Flyweights" reutilizados por el sistema.
 */
class BulletType {
  private name: string; // Nombre del tipo de bala (e.g., "Pistola")
  private damage: number; // Daño que inflige la bala
  private color: string; // Color para representar visualmente el tipo de bala

  constructor(name: string, damage: number, color: string) {
    this.name = name;
    this.damage = damage;
    this.color = color;
  }

  // Métodos de acceso para las propiedades del tipo de bala
  getName(): string {
    return this.name;
  }

  getDamage(): number {
    return this.damage;
  }

  getColor(): string {
    return this.color;
  }
}

// 2. Fábrica de Flyweights - BulletTypeFactory
/**
 * * Clase que gestiona la creación y reutilización de objetos BulletType.
 *
 * Usa un registro interno (`bulletTypes`) para almacenar los objetos ya creados.
 * Si un tipo de bala con las mismas propiedades ya existe, lo reutiliza.
 * Esto asegura que no se creen instancias duplicadas innecesarias.
 */
class BulletTypeFactory {
  private bulletTypes: Record<string, BulletType> = {}; // Almacena Flyweights únicos

  /**
   * Devuelve una instancia reutilizada de BulletType o crea una nueva si no existe.
   * @param name Nombre del tipo de bala
   * @param damage Daño que inflige la bala
   * @param color Color para identificar el tipo de bala
   * @returns Una instancia de BulletType
   */
  getBulletType(name: string, damage: number, color: string): BulletType {
    const key = `${name}-${damage}-${color}`; // Clave única para identificar el Flyweight

    if (!this.bulletTypes[key]) {
      console.log(`%cCreando una instancia ${key}`, COLORS.red);
      this.bulletTypes[key] = new BulletType(name, damage, color);
    }

    return this.bulletTypes[key];
  }
}

// 3. Clase que representa una Bala - Bullet
/**
 * * Clase que representa una bala específica en el juego.
 *
 * Cada bala tiene coordenadas (`x`, `y`), una dirección, y una referencia
 * a un BulletType, que encapsula sus propiedades compartidas.
 */
class Bullet {
  private x: number; // Coordenada X de la bala
  private y: number; // Coordenada Y de la bala
  private direction: number; // Dirección en la que se mueve la bala (en grados)
  private bulletType: BulletType; // Referencia al Flyweight

  constructor(x: number, y: number, direction: number, bulletType: BulletType) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.bulletType = bulletType;
  }

  /**
   * Muestra en consola las propiedades de la bala, incluyendo las del tipo compartido.
   */
  display(): void {
    const text = `
      Bala del tipo: %c"${this.bulletType.getName()}" 
      %cCoords: (${this.x}, ${this.y})
      Dirección ${this.direction}
      Daño: ${this.bulletType.getDamage()} 
      Color: ${this.bulletType.getColor()}
    `;

    console.log(text, COLORS.green, COLORS.white);
  }
}

// 4. Sistema de Disparos - ShootingSystem
/**
 * * Clase que administra las balas disparadas y utiliza la fábrica de tipos.
 *
 * Se encarga de crear balas, asignarles un tipo compartido a través de la fábrica,
 * y mantener un registro de las balas disparadas.
 */
class ShootingSystem {
  private bullets: Bullet[] = []; // Lista de balas activas
  private factory: BulletTypeFactory; // Fábrica de BulletType para reutilización

  constructor(factory: BulletTypeFactory) {
    this.factory = factory;
  }

  /**
   * Crea y dispara una nueva bala, utilizando el Flyweight correspondiente.
   * @param x Coordenada X de inicio
   * @param y Coordenada Y de inicio
   * @param direction Dirección del disparo
   * @param type Nombre del tipo de bala
   * @param damage Daño que inflige la bala
   * @param color Color para identificar la bala
   */
  shoot(
      x: number,
      y: number,
      direction: number,
      type: string,
      damage: number,
      color: string
  ): void {
    const bulletType = this.factory.getBulletType(type, damage, color); // Obtener el Flyweight
    const bullet = new Bullet(x, y, direction, bulletType); // Crear una bala específica
    this.bullets.push(bullet);
    bullet.display(); // Mostrar información de la bala
  }

  /**
   * Devuelve la cantidad de balas disparadas.
   * @returns Número de balas
   */
  getBulletCount(): number {
    return this.bullets.length;
  }
}

// 5. Código Cliente para probar el Flyweight
/**
 * Función principal que simula un sistema de disparos utilizando el patrón Flyweight.
 *
 * Se crean varias balas, algunas de las cuales reutilizan el mismo tipo (Flyweight),
 * demostrando la optimización de memoria.
 */
function main() {
  const factory = new BulletTypeFactory(); // Crear la fábrica de Flyweights
  const shootingSystem = new ShootingSystem(factory); // Crear el sistema de disparos

  // Disparar varias balas de diferentes tipos
  shootingSystem.shoot(10, 20, 0, 'Pistola', 10, 'Gris');
  shootingSystem.shoot(15, 25, 90, 'Escopeta', 20, 'Rojo');
  shootingSystem.shoot(20, 30, 180, 'Rifle', 15, 'Verde');
  shootingSystem.shoot(10, 20, 45, 'Pistola', 10, 'Gris'); // Reutiliza Flyweight
  shootingSystem.shoot(25, 35, 270, 'Escopeta', 20, 'Rojo'); // Reutiliza Flyweight

  console.log(
      `Total de balas disparadas: %c${shootingSystem.getBulletCount()}\n`,
      COLORS.yellow
  );
}

main(); // Ejecutar la función principal