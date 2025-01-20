/**
 * ! Patrón Composite
 * El patrón Composite es un patrón de diseño estructural que permite construir objetos
 * en estructuras jerárquicas similares a un árbol. Este patrón permite tratar de manera uniforme
 * a los objetos individuales y a las composiciones de estos objetos.
 *
 * Este patrón es útil cuando se necesita trabajar con estructuras jerárquicas, como menús,
 * carpetas de un sistema de archivos o jerarquías organizacionales.
 *
 * En este ejemplo, se utiliza el patrón Composite para representar un menú de restaurante
 * que puede contener ítems individuales (platillos, bebidas) y categorías que agrupan
 * estos ítems (Entradas, Bebidas, etc.).
 *
 * https://refactoring.guru/es/design-patterns/composite
 */

import { COLORS } from '../helpers/colors.ts';

// 1. Interfaz MenuComponent
// Define un contrato que tanto los ítems individuales como las categorías del menú deben cumplir.
// Esto permite que el cliente interactúe con todos los objetos de manera uniforme.
interface MenuComponent {
  /**
   * Muestra los detalles del componente del menú.
   * @param indent - Un prefijo opcional que ayuda a visualizar la jerarquía de forma indentada.
   */
  showDetails(indent?: string): void;
}

// 2. Clase MenuItem
// Representa un ítem individual del menú, como un platillo, bebida o postre.
// Implementa la interfaz MenuComponent para garantizar compatibilidad con el patrón Composite.
class MenuItem implements MenuComponent {
  private name: string; // Nombre del ítem del menú (Ej: "Ensalada").
  private price: number; // Precio del ítem del menú (Ej: 5.99).

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  /**
   * Muestra los detalles del ítem, incluyendo su nombre y precio.
   * Se utiliza un color específico para distinguir los ítems individuales.
   * @param indent - Prefijo para representar la jerarquía (por defecto, vacío).
   */
  showDetails(indent: string = ''): void {
    console.log(
        `${indent}- ${this.name}: %c$${this.price.toFixed(2)}`,
        COLORS.green
    );
  }
}

// 3. Clase MenuCategory
// Representa una categoría del menú, que puede contener otros ítems (MenuItem)
// o subcategorías (MenuCategory). Es una composición en la jerarquía.
class MenuCategory implements MenuComponent {
  private name: string; // Nombre de la categoría (Ej: "Entradas").
  private items: MenuComponent[] = []; // Lista de ítems o subcategorías contenidas.

  constructor(name: string) {
    this.name = name;
  }

  /**
   * Añade uno o más ítems o subcategorías a esta categoría.
   * @param item - Un ítem individual o una lista de ítems a añadir.
   */
  add(item: MenuComponent | MenuComponent[]): void {
    if (Array.isArray(item)) {
      // Si el argumento es una lista, añadir todos los elementos a la lista interna.
      this.items.push(...item);
      return;
    }

    // Si el argumento es un único ítem, añadirlo directamente.
    this.items.push(item);
  }

  /**
   * Muestra los detalles de la categoría, incluyendo todos los ítems y subcategorías que contiene.
   * Se utiliza un color específico para distinguir las categorías.
   * @param indent - Prefijo para representar la jerarquía (por defecto, vacío).
   */
  showDetails(indent: string = ''): void {
    console.log(`%c${indent}+ ${this.name}`, COLORS.blue);
    this.items.forEach((item) => item.showDetails(indent + ' '));
  }
}

// 4. Código Cliente para Probar el Composite
// Función principal que construye una estructura de menú y la muestra en la consola.
function main() {
  // Crear ítems individuales del menú
  const salad = new MenuItem('Ensalada', 5.99);
  const soup = new MenuItem('Sopa de tomate', 4.99);
  const steak = new MenuItem('Bistec', 15.99);
  const soda = new MenuItem('Refresco', 2.5);
  const dessert = new MenuItem('Pastel de chocolate', 6.5);
  const coffee = new MenuItem('Café', 1.99);
  const te = new MenuItem('Te', 0.99);

  // Crear categorías del menú y añadir ítems individuales
  const appetizers = new MenuCategory('Entradas');
  appetizers.add(salad);
  appetizers.add(soup);

  const mainCourse = new MenuCategory('Plato Principal');
  mainCourse.add(steak);

  const beverages = new MenuCategory('Bebidas');

  const hotBeverages = new MenuCategory('Calientes');
  const coldBeverages = new MenuCategory('Frías');

  coldBeverages.add(soda);

  hotBeverages.add(coffee);
  hotBeverages.add(te);

  beverages.add([coldBeverages, hotBeverages]);

  const desserts = new MenuCategory('Postres');
  desserts.add(dessert);

  // Crear un menú principal que contiene todas las categorías
  const mainMenu = new MenuCategory('Menú Principal');
  mainMenu.add([appetizers, beverages, desserts, mainCourse]);

  // Mostrar la estructura completa del menú
  console.log('Menú del Restaurante:');
  mainMenu.showDetails();
}

// Ejecutar la función principal
main();
