"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const email_service_1 = require("../../src/services/email.service");
describe('Testando servico de email', () => {
    test('Testando envio de email - valido', () => __awaiter(void 0, void 0, void 0, function* () {
        const contentConfig = {
            conteudo: 'Olá este email e um secundario seu! espero que esteja funcionando.',
            remetente: 'edp@gmail.com',
            destinatario: 'jefferson@gmail.com',
            titulo: 'Testando nova config de menssagem',
        };
        yield expect((0, email_service_1.sendEmail)(contentConfig)).resolves.not.toThrow();
    }));
});
