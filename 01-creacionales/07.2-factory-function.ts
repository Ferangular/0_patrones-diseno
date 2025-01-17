/**
 * ! Factory Function
 * Es un patrón de diseño que nos permite crear objetos o funciones de manera dinámica que serán
 * usados posteriormente en el código.
 *
 * * Es útil cuando necesitamos crear objetos o funciones de manera dinámica,
 * * es decir, en tiempo de ejecución y no en tiempo de compilación.
 *
 */

/**
 * ! Factory Function
 * Un patrón de diseño que permite la creación dinámica de objetos o funciones.
 *
 * * Es útil cuando necesitamos definir objetos o funciones de manera dinámica en tiempo de ejecución.
 */

import { COLORS } from '../helpers/colors.ts';

/**
 * Formatea una fecha a formato 'YYYY-MM-DD HH:mm:ss'
 * @param {Date} date - La fecha a formatear.
 * @returns {string} - La fecha formateada.
 */
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses empiezan desde 0
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * Crea un logger dinámico basado en el nivel de log (info, warn, error).
 * @param {LogLevel} level - Nivel de log ('info', 'warn', 'error').
 * @returns {function} - Función para manejar logs con el nivel y formato adecuado.
 */


// Función fábrica que crea un manejador de logs
type LogLevel = 'info' | 'warn' | 'error';

function createLogger(level: LogLevel) {
  // Define colores y prefijos para cada nivel de log
  const logColor = {
    info: COLORS.white,
    warn: COLORS.yellow,
    error: COLORS.red,
  };

  const prefix = {
    info: 'INFO',
    warn: 'WARNING',
    error: 'ERROR',
  };

  // Retorna una función que formatea y muestra el log
  return (message: string) => {
    const timestamp = formatDate(new Date()); // Obtiene la fecha formateada
    console.log(
        `%c[${prefix[level]}: ${timestamp}] ${message}`,  // Formato del mensaje
        logColor[level]  // Color específico según el nivel de log
    );
  };
}

// Ejemplo de uso de la función Factory para crear logs de diferentes niveles
function main() {
  const infoLogger = createLogger('info');  // Logger para 'info'
  const warnLogger = createLogger('warn');  // Logger para 'warn'
  const errorLogger = createLogger('error'); // Logger para 'error'

  infoLogger('Aplicación iniciada correctamente.');
  warnLogger('El uso de memoria está alto.');
  errorLogger('Error de conexión a la base de datos.');
}

main();
