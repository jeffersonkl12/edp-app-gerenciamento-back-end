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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserDetailsRegister_dto_1 = __importDefault(require("../../src/dtos/userDetails/UserDetailsRegister.dto"));
const uuid_1 = require("uuid");
const register_service_1 = require("../../src/services/register.service");
jest.mock('../../src/repositorys/userDetails.repository', () => ({
    __esModule: true,
    save: jest.fn().mockImplementation(newUser => (Object.assign(Object.assign({ id: (0, uuid_1.v7)() }, newUser), { nome: 'jefferson', createDate: new Date(), updateDate: new Date() }))),
    existByEmail: jest.fn().mockReturnValue(false),
}));
jest.mock('../../src/services/email.service', () => ({
    sendEmail: jest.fn().mockReturnValue({ response: 'ENVINHADO' }),
}));
beforeEach(() => {
    jest.clearAllMocks();
});
describe('Teste de servico do registro de usuario', () => {
    test('Test de registro de novo usuario - valido', () => __awaiter(void 0, void 0, void 0, function* () {
        const userDetailsDTO = new UserDetailsRegister_dto_1.default('jeffersonkl99@gmail.com', (0, uuid_1.v7)());
        yield expect((0, register_service_1.registerUser)(userDetailsDTO)).resolves.toEqual('ENVINHADO');
    }));
});
