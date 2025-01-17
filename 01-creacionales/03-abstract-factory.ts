/**
 * Patrón de Diseño: Abstract Factory
 * ¿Qué es?
 * El patrón Abstract Factory permite la creación de familias de objetos relacionados sin especificar sus clases concretas.
 * Este patrón es ideal cuando necesitamos asegurarnos de que los objetos que se crean son compatibles entre sí.
 *
 * ¿Cuándo utilizarlo?
 * Cuando quieras crear una serie de objetos que formen parte de una misma familia y desees garantizar su compatibilidad y
 * cohesión sin depender de clases concretas.
 */
import { COLORS } from '../helpers/colors.ts';
/**
 *  El propósito del Abstract Factory es crear familias de objetos relacionados
 *  (en este caso, hamburguesas y bebidas) sin especificar las clases concretas
 *  de cada uno de esos objetos en el código principal.
 */
// Definimos las interfaces para los productos
interface Hamburger {
    prepare(): void;
}

interface Drink {
    pour(): void;
}

// Creamos implementaciones concretas de los productos
class ChickenHamburger implements Hamburger {
    prepare(): void {
        console.log('Preparando hamburguesa de %cPollo', COLORS.yellow);
    }
}

class BeefHamburger implements Hamburger {
    prepare(): void {
        console.log('Preparando hamburguesa de %cRes', COLORS.red);
    }
}

class Water implements Drink {
    pour(): void {
        console.log('Sirviendo un vaso de %cagua', COLORS.blue);
    }
}

class Soda implements Drink {
    pour(): void {
        console.log('Sirviendo un vaso de %cgaseosa', COLORS.pink);
    }
}

// Interfaz de la fábrica abstracta
interface RestaurantFactory {
    createHamburger(): Hamburger;
    createDrink(): Drink;
}

// Fábricas concretas
class FastFoodRestaurantFactory implements RestaurantFactory {
    createHamburger(): Hamburger {
        return new BeefHamburger();
    }

    createDrink(): Drink {
        return new Soda();
    }
}

class HealthyRestaurantFactory implements RestaurantFactory {
    createHamburger(): Hamburger {
        return new ChickenHamburger();
    }

    createDrink(): Drink {
        return new Water();
    }
}

// Función principal que utiliza la fábrica
function main(factory: RestaurantFactory) {
    const hamburger = factory.createHamburger();
    const drink = factory.createDrink();

    hamburger.prepare();
    drink.pour();
}

// Simulamos pedidos de diferentes restaurantes
console.log('\n%cPedido del menú regular:', COLORS.green);
main(new FastFoodRestaurantFactory());

console.log('\n\n%cPedido del menú saludable:', COLORS.green);
main(new HealthyRestaurantFactory());