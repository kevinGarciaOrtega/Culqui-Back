import { Pool } from 'pg';
import { isLuhnValid } from '../utils/luhnAlgorithm';

// Configuración de la base de datos (puede provenir de variables de entorno)
const dbConfig = {
    user: 'tu_usuario',
    password: 'tu_contraseña',
    host: 'tu_host',
    database: 'tu_base_de_datos',
    port: 5432,
};

// Crea un pool de conexiones
const pool = new Pool(dbConfig);

// Función para crear un token
export async function createToken(email: string, cardNumber: string, cvv: string, expirationYear: string, expirationMonth: string): Promise<void> {
    const client = await pool.connect();
    try {
        // Validaciones
        validateEmail(email);
        validateCardNumber(cardNumber);
        validateCVV(cvv);
        validateExpirationYear(expirationYear);
        validateExpirationMonth(expirationMonth);

        // Realiza la inserción en la base de datos
        await client.query('INSERT INTO cards (email, card_number, cvv, expiration_year, expiration_month) VALUES ($1, $2, $3, $4, $5)', [email, cardNumber, cvv, expirationYear, expirationMonth]);
    } finally {
        client.release();
    }
}

// Función para obtener datos de tarjeta por token
export async function getCardData(token: string): Promise<any> {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM cards WHERE token = $1', [token]);

        if (result.rows.length === 0) {
            throw new Error('Tarjeta no encontrada');
        }

        return result.rows[0]; // Retorna los datos de la tarjeta (sin CVV)
    } finally {
        client.release();
    }
}



// Funciones de validación

export function validateEmail(email: string): string | void {
    if (email.length < 5 || email.length > 100) {
        throw new Error('Email no válido o dominio no permitido');
    }

    const allowedDomains = ['gmail.com', 'hotmail.com', 'yahoo.es'];
    const emailParts = email.split('@');

    if (emailParts.length !== 2 || !allowedDomains.includes(emailParts[1])) {
        throw new Error('Email no válido o dominio no permitido');
    }
}

export function validateCardNumber(cardNumber: string): string | void {
    if (cardNumber.length < 13 || cardNumber.length > 16 || !isLuhnValid(cardNumber)) {
        throw new Error('Número de tarjeta no válido');
    }
}

export function validateCVV(cvv: string): string | void {
    const cvvPattern = /^[0-9]{3,4}$/;
    if (!cvvPattern.test(cvv)) {
        return 'CVV no válido';
    }
}

export function validateExpirationYear(expirationYear: string): string | void {
    const currentYear = new Date().getFullYear();
    const expirationYearInt = parseInt(expirationYear, 10);
  
    if (expirationYear.length !== 4 || isNaN(expirationYearInt) || expirationYearInt < currentYear || expirationYearInt > currentYear + 5) {
        throw new Error('Año de vencimiento no válido');
    }
}

export function validateExpirationMonth(expirationMonth: string): string | void {
    const expirationMonthInt = parseInt(expirationMonth, 10);
  
    if (expirationMonth.length < 1 || expirationMonth.length > 2 || isNaN(expirationMonthInt) || expirationMonthInt < 1 || expirationMonthInt > 12) {
        throw new Error('Mes de vencimiento no válido');
    }
}
