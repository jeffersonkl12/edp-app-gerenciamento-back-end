"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const email_validation_1 = require("../../src/utils/validations/email.validation");
(0, globals_1.describe)('Testando validacao de email', () => {
    (0, globals_1.test)('Teste de email - valido', () => {
        const emailTest = 'jeffersonkl99@gmail.com';
        (0, globals_1.expect)((0, email_validation_1.validEmailCliente)(emailTest)).toEqual(true);
    });
    (0, globals_1.test)('Teste de email - invalido', () => {
        const emailTest = 'jeffersonkl99@.com';
        (0, globals_1.expect)((0, email_validation_1.validEmailCliente)(emailTest)).toEqual(false);
    });
    (0, globals_1.test)('Teste dominio de email - valido', () => {
        const emailTest = 'jeffersonkl99@Edp.com.br';
        (0, globals_1.expect)((0, email_validation_1.validEmailDominio)(emailTest)).toEqual(true);
    });
    (0, globals_1.test)('Teste de dominio de email - invalido', () => {
        const emailTest = 'jeffersonkl99@outlook.com';
        (0, globals_1.expect)((0, email_validation_1.validEmailDominio)(emailTest)).toEqual(false);
    });
});
