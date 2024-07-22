"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const global_interfaces_1 = require("../../src/interfaces/global.interfaces");
const uuid_1 = require("uuid");
const token_service_1 = require("../../src/services/token.service");
const tokenService = __importStar(require("../../src/services/token.service"));
describe('Teste de servico token', () => {
    test('Teste de criacao de token - valido', () => {
        const tokenBody = {
            jwtid: (0, uuid_1.v7)(),
            subject: 'teste_criacao',
            audience: 'eu',
            expiresIn: '60s',
            email: 'jeffersonkl99@gmail.com',
        };
        jest.spyOn(tokenService, 'readFileKey').mockReturnValue('senha1234');
        expect((0, token_service_1.createToken)(tokenBody)).not.toBeNull();
    });
    test('Teste de verificacao do token - valido', () => {
        const tokenBody = {
            jwtid: (0, uuid_1.v7)(),
            subject: 'teste_criacao',
            audience: 'eu',
            expiresIn: '60s',
            email: 'jeffersonkl99@gmail.com',
        };
        const token = (0, token_service_1.createToken)(tokenBody);
        expect(() => (0, token_service_1.verifyToken)(token)).not.toThrow();
    });
    test('Test de verificacao do token - invalido', () => __awaiter(void 0, void 0, void 0, function* () {
        const tokenBody = {
            email: 'jeffersonkl99@gmail.com',
        };
        const tokenConfig = {
            subject: 'teste_criacao',
            audience: 'eu',
            expiresIn: '1s',
        };
        const token = (0, token_service_1.createToken)(tokenBody, tokenConfig);
        const timeout = (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        };
        yield timeout(1000 * 5);
        expect(() => (0, token_service_1.verifyToken)(token)).toThrow();
    }), 1000 * 10);
    test('Teste de decodificacao do token - valido', () => {
        const tokenBody = {
            jwtid: (0, uuid_1.v7)(),
            subject: 'teste_criacao',
            audience: 'eu',
            expiresIn: '60s',
            email: 'jeffersonkl99@gmail.com',
        };
        const token = (0, token_service_1.createToken)(tokenBody);
        expect((0, token_service_1.decodeToken)(token)).not.toBeNull();
    });
    test('Testando reucperacao de vlaor de campo especifico', () => {
        const token = (0, token_service_1.createToken)({
            email: 'jeffersonkl@gmail.com',
            type: global_interfaces_1.TYPETOKEN.AUTHENTICATION,
            userId: '1',
        }, {
            audience: '1',
            expiresIn: '1s',
        });
        expect((0, token_service_1.getFieldToToken)(token, 'email')).toEqual('jeffersonkl@gmail.com');
        expect((0, token_service_1.getFieldToToken)(token, 'aud')).toEqual('1');
        expect((0, token_service_1.getFieldToToken)(token, 'salario')).toBeNull();
    });
});
