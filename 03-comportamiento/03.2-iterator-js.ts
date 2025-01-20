/**
 * ! Patrón Iterator
 * El patrón Iterator proporciona una forma de recorrer los elementos de una colección sin exponer la
 * estructura interna de dicha colección. Este patrón es útil cuando se necesita recorrer una colección
 * de objetos, pero sin preocuparse de cómo están organizados o almacenados internamente.
 *
 * * Ventajas del patrón Iterator:
 *   - Abstracción de la estructura interna de la colección.
 *   - Permite recorrer diferentes tipos de colecciones de manera uniforme.
 *   - Facilita la implementación de un recorrido secuencial sin preocuparse por el estado de la colección.
 *
 * * Enlace de referencia para profundizar en el patrón Iterator:
 *   - https://refactoring.guru/es/design-patterns/iterator
 */

// Clase que representa un Pokémon. Cada Pokémon tiene un nombre y un tipo.
class Pokemon {
  name: string;
  type: string;

  constructor(name: string, type: string) {
    this.name = name; // Asigna el nombre del Pokémon
    this.type = type; // Asigna el tipo del Pokémon (Ej: Eléctrico, Fuego, etc.)
  }
}

// Clase que representa la colección de Pokémons. Contiene una lista de objetos de tipo Pokémon.
class PokemonCollection {
  // Lista privada de Pokémons en la colección
  private pokemons: Pokemon[] = [];

  // Método para agregar un Pokémon a la colección
  addPokemon(pokemon: Pokemon): void {
    this.pokemons.push(pokemon); // Se agrega el Pokémon a la lista interna
  }

  // Método iterador utilizando una función generadora. Este método devuelve un iterador
  // que permite recorrer todos los elementos (Pokémons) de la colección de forma secuencial.
  // Se utiliza la palabra clave "yield" para devolver un Pokémon a la vez en el ciclo de iteración.
  *getPokemons(): IterableIterator<Pokemon> {
    for (const pokemon of this.pokemons) {
      yield pokemon; // Devuelve cada Pokémon de la colección, uno a uno
    }
  }

  // Implementación del iterador usando el método especial [Symbol.iterator], que convierte
  // a la clase PokemonCollection en un objeto iterable. Este es un enfoque más "estándar"
  // que puede ser utilizado en construcciones como "for...of".
  //
  // La clave aquí es el uso del operador "yield*" para delegar la iteración de la colección
  // al iterador que ya existe en la lista de Pokémons.
  *[Symbol.iterator](): IterableIterator<Pokemon> {
    // Delegación de la iteración al iterador interno de la colección de Pokémons
    yield* this.pokemons; // "yield*" permite delegar a otro iterador (en este caso, el de "pokemons")
  }
}

// Función principal para probar el uso de los iteradores con la colección de Pokémons.
function main(): void {
  // Creamos una nueva colección de Pokémons
  const pokedex = new PokemonCollection();

  // Agregamos varios Pokémons a la colección usando el método addPokemon
  pokedex.addPokemon(new Pokemon('Pikachu', 'Eléctrico'));
  pokedex.addPokemon(new Pokemon('Charmander', 'Fuego'));
  pokedex.addPokemon(new Pokemon('Squirtle', 'Agua'));
  pokedex.addPokemon(new Pokemon('Bulbasaur', 'Planta'));

  // Recorremos la colección de Pokémons utilizando el iterador implementado con Symbol.iterator.
  console.log('Recorriendo la colección de Pokemons:');

  // Usamos un bucle "for...of", que automáticamente llama al iterador definido en la colección
  for (const pokemon of pokedex) {
    console.log(`Pokémon: ${pokemon.name}, Tipo: ${pokemon.type}`);
  }
}

// Llamada a la función principal para ejecutar el código
main();
