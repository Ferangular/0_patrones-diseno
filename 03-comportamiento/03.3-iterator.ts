/**
 * Patrón Iterator
 *
 * El patrón Iterator es un patrón de diseño estructural que permite recorrer los elementos de una colección
 * sin exponer la estructura interna de dicha colección. Este patrón proporciona una forma estándar de acceder
 * a los elementos de un objeto agregando una capa de abstracción sobre el acceso directo.
 *
 * En resumen, se utiliza para iterar sobre colecciones de elementos sin necesidad de conocer la implementación
 * interna de las mismas. En el contexto de JavaScript, esto se puede implementar de manera eficiente utilizando
 * generadores y el protocolo `Symbol.iterator`, lo que facilita la iteración de objetos de una manera más limpia.
 *
 * Documentación adicional sobre el patrón:
 * https://refactoring.guru/es/design-patterns/iterator
 */

// Clase que representa una Carta de la baraja
class Card {
  // Propiedades que almacenan el nombre y el valor de la carta
  name: string;
  value: number;

  /**
   * Constructor que inicializa el nombre y el valor de la carta.
   *
   * @param name - El nombre de la carta (ejemplo: "As de Corazones").
   * @param value - El valor numérico asociado a la carta (ejemplo: 1 para As, 11 para Jota, etc.).
   */
  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}

// Clase que representa una colección de Cartas
class CardCollection {
  // Array privado que almacena las cartas de la baraja
  private cards: Card[] = [];

  /**
   * Método para agregar una carta a la colección.
   *
   * @param card - Objeto de tipo `Card` que se desea agregar a la colección.
   */
  addCard(card: Card): void {
    this.cards.push(card);
  }

  /**
   * Implementación del iterador utilizando el símbolo `Symbol.iterator` para hacer que la colección sea
   * iterable mediante el uso de `for...of` o cualquier otro método que acepte un iterable.
   *
   * Esto permite recorrer las cartas de la colección sin exponer directamente su estructura interna.
   *
   * @returns Un generador que itera sobre las cartas de la colección.
   *
   * Se utiliza `yield*` para delegar el control del generador a la colección interna de cartas.
   * Alternativamente, se podría haber utilizado un bucle `for...of` directamente (comentado a continuación).
   */
  *[Symbol.iterator](): IterableIterator<Card> {
    yield* this.cards; // Delegamos la iteración a la colección interna de cartas.
    // Para mayor claridad, también se podría implementar de la siguiente forma:
    // for( const card of this.cards ) {
    //   yield card;
    // }
  }

  /**
   * Otra forma de implementar un iterador personalizado utilizando generadores.
   * Este método también devuelve un generador que permite iterar sobre las cartas de la colección.
   *
   * @returns Un generador que itera sobre las cartas de la colección.
   *
   * La diferencia con el iterador anterior es que este método se llama explícitamente,
   * mientras que el primero es llamado automáticamente cuando se utiliza `for...of`.
   */
  getCard(): IterableIterator<Card> {
    for (const card of this.cards) {
      yield card;
    }
  }
}

// Código Cliente para probar el iterador

/**
 * Función principal que simula el uso de un deck de cartas.
 * Se agrega una serie de cartas a la colección y se recorre utilizando el iterador.
 */
function main(): void {
  // Crear una instancia de la colección de cartas
  const deck = new CardCollection();

  // Agregar algunas cartas a la colección utilizando el método `addCard`
  deck.addCard(new Card('As de Corazones', 1));
  deck.addCard(new Card('Rey de Corazones', 13));
  deck.addCard(new Card('Reina de Corazones', 12));
  deck.addCard(new Card('Jota de Corazones', 11));

  // Recorrer la colección de cartas utilizando el iterador en un bucle `for...of`
  console.log('Recorriendo la colección de cartas:');
  for (const card of deck) {
    // Para cada carta, mostrar su nombre y valor
    console.log(`Carta: ${card.name}, Valor: ${card.value}`);
  }
}

// Llamar a la función `main` para ejecutar el código cliente
main();
