import { validateEmail, validateCardNumber, validateCVV, validateExpirationYear, validateExpirationMonth }from '../src/services/cardService';
import { generateToken } from '../src/services/tokenService';
import { isLuhnValid } from '../src/utils/luhnAlgorithm';

test('isLuhnValid returns true for a valid card number', () => {
  expect(isLuhnValid('4111111111111111')).toBe(true);
});

test('isLuhnValid returns false for an invalid card number', () => {
  expect(isLuhnValid('1234567890123456')).toBe(false);
});

test('generateToken returns a string', async () => {
  const token = await generateToken();
  expect(typeof token).toBe('string');
}, 30000);


describe('validateEmail', () => {
    it('should not throw an error for a valid email', () => {
        const validEmail = 'example@gmail.com';
        expect(() => validateEmail(validEmail)).not.toThrow(); // La función no debe arrojar un error para un email válido
    });

    it('should throw an error for an invalid email', () => {
        const invalidEmail = 'invalidemail';
        expect(() => validateEmail(invalidEmail)).toThrow('Email no válido o dominio no permitido'); // La función debe arrojar un error con el mensaje correcto para un email no válido
    });
});

describe('validateCardNumber', () => {
    it('should not throw an error for a valid card number', () => {
        const validCardNumber = '4111111111111111';
        expect(() => validateCardNumber(validCardNumber)).not.toThrow(); // La función no debe arrojar un error para un número de tarjeta válido
    });

    it('should throw an error for an invalid card number', () => {
        const invalidCardNumber = '12345';
        expect(() => validateCardNumber(invalidCardNumber)).toThrow('Número de tarjeta no válido'); // La función debe arrojar un error con el mensaje correcto para un número de tarjeta no válido
    });
});

describe('validateCVV', () => {
    it('should return an error message for an invalid CVV', () => {
        const invalidCVV = '12345';
        const validationResult = validateCVV(invalidCVV);
        expect(validationResult).toBe('CVV no válido'); // La función debe devolver el mensaje de error correcto para un CVV no válido
    });

    it('should not return an error message for a valid CVV', () => {
        const validCVV = '123';
        const validationResult = validateCVV(validCVV);
        expect(validationResult).toBeUndefined(); // La función no debe devolver ningún mensaje de error para un CVV válido
    });
});

describe('validateExpirationYear', () => {
    it('should not throw an error for a valid expiration year', () => {
        const validYear = '2025';
        expect(() => validateExpirationYear(validYear)).not.toThrow(); // La función no debe arrojar un error para un año de vencimiento válido
    });

    it('should throw an error for an invalid expiration year', () => {
        const invalidYear = '2020';
        expect(() => validateExpirationYear(invalidYear)).toThrow('Año de vencimiento no válido'); // La función debe arrojar un error con el mensaje correcto para un año de vencimiento no válido
    });
});

describe('validateExpirationMonth', () => {
    it('should not throw an error for a valid expiration month', () => {
        const validMonth = '12';
        expect(() => validateExpirationMonth(validMonth)).not.toThrow(); // La función no debe arrojar un error para un mes de vencimiento válido
    });

    it('should throw an error for an invalid expiration month', () => {
        const invalidMonth = '13';
        expect(() => validateExpirationMonth(invalidMonth)).toThrow('Mes de vencimiento no válido'); // La función debe arrojar un error con el mensaje correcto para un mes de vencimiento no válido
    });
});



 
