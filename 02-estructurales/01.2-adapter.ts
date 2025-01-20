/**
 * ! Patrón Adapter
 * El patrón Adapter permite que objetos con interfaces incompatibles trabajen juntos.
 * Es especialmente útil cuando necesitamos usar clases externas (como servicios de terceros)
 * que no cumplen con la interfaz que nuestra aplicación requiere.
 *
 * * Casos comunes de uso:
 *   - Reutilización de clases existentes con interfaces no compatibles.
 *   - Creación de una capa de abstracción sobre servicios o librerías de terceros.
 *
 * En este ejemplo, integramos servicios de pago de terceros (PayPal, Stripe y MercadoPago)
 * bajo una interfaz común, `PaymentProcessor`, para procesar pagos de manera uniforme en
 * el código cliente.
 *
 * Más información: https://refactoring.guru/es/design-patterns/adapter
 */

import { COLORS } from '../helpers/colors.ts'; // Importamos colores para mejorar la legibilidad en la consola.

// 1. Interfaz PaymentProcessor
/**
 * Define la interfaz estándar que debe implementar cualquier clase que procese pagos.
 * Esta interfaz actúa como un contrato que asegura que todas las implementaciones
 * tengan el método `processPayment`.
 */
interface PaymentProcessor {
  processPayment(amount: number): void;
}

// 2. Clases de Servicios de Pago Externos
/**
 * Estas clases simulan servicios de pago externos. Cada una tiene una implementación
 * propia y métodos que no cumplen con la interfaz `PaymentProcessor`.
 */

// Servicio de PayPal
class PayPalService {
  sendPayment(amount: number): void {
    console.log(`Procesando pago de $${amount} con %cPayPal`, COLORS.blue);
  }
}

// Servicio de Stripe
class StripeService {
  makeCharge(amount: number): void {
    console.log(`Procesando pago de $${amount} con %cStripe`, COLORS.purple);
  }
}

// Servicio de MercadoPago
class MercadoPagoService {
  pay(amount: number): void {
    console.log(`Procesando pago de $${amount} con %cMercadoPago`, COLORS.yellow);
  }
}

// 3. Clases Adaptadoras
/**
 * Cada clase adaptadora implementa la interfaz `PaymentProcessor` y adapta un
 * servicio de pago externo específico, permitiendo que el código cliente los utilice
 * de forma uniforme.
 */

// Adaptador para PayPal
class PayPalAdapter implements PaymentProcessor {
  private paypalService: PayPalService;

  constructor(service: PayPalService) {
    this.paypalService = service;
  }

  /**
   * Adapta el método `sendPayment` de `PayPalService` al contrato `processPayment`.
   */
  processPayment(amount: number): void {
    this.paypalService.sendPayment(amount);
  }
}

// Adaptador para Stripe
class StripeAdapter implements PaymentProcessor {
  private stripeService: StripeService;

  constructor(service: StripeService) {
    this.stripeService = service;
  }

  /**
   * Adapta el método `makeCharge` de `StripeService` al contrato `processPayment`.
   */
  processPayment(amount: number): void {
    this.stripeService.makeCharge(amount);
  }
}

// Adaptador para MercadoPago
class MercadoPagoAdapter implements PaymentProcessor {
  private mercadoPagoService: MercadoPagoService;

  constructor(service: MercadoPagoService) {
    this.mercadoPagoService = service;
  }

  /**
   * Adapta el método `pay` de `MercadoPagoService` al contrato `processPayment`.
   */
  processPayment(amount: number): void {
    this.mercadoPagoService.pay(amount);
  }
}

// 4. Código Cliente para probar el Adapter
/**
 * Función principal que simula el uso del patrón Adapter para procesar pagos
 * con diferentes servicios externos de manera uniforme.
 */
function main() {
  const paymentAmount = 100;

  // Instanciamos los adaptadores, encapsulando la lógica de cada servicio de pago externo.
  const paypalProcessor: PaymentProcessor = new PayPalAdapter(new PayPalService());
  const stripeProcessor: PaymentProcessor = new StripeAdapter(new StripeService());
  const mercadoPagoProcessor: PaymentProcessor = new MercadoPagoAdapter(new MercadoPagoService());

  // Procesamos pagos utilizando los adaptadores.
  // Nótese que el cliente interactúa solo con la interfaz `PaymentProcessor`.
  console.log('Usando PayPal:');
  paypalProcessor.processPayment(paymentAmount);

  console.log('\nUsando Stripe:');
  stripeProcessor.processPayment(paymentAmount);

  console.log('\nUsando MercadoPago:');
  mercadoPagoProcessor.processPayment(paymentAmount);
}

// Ejecutamos la función principal.
main();
