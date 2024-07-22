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
const uuid_1 = require("uuid");
const userDetailsRepository = __importStar(require("../../src/repositorys/userDetails.repository"));
const global_interfaces_1 = require("../../src/interfaces/global.interfaces");
const login_service_1 = require("../../src/services/login.service");
const has_utils_1 = require("../../src/utils/has.utils");
describe('Testando servico de login', () => {
    const userDetails = {
        id: (0, uuid_1.v7)(),
        nome: 'jefferson',
        email: 'jeffersonkl99@gmail.com',
        password: (0, has_utils_1.hash)('senha'),
        status: global_interfaces_1.TYPESTATUSUSER.ACTIVATE.toString(),
        createDate: new Date(),
        updateDate: new Date(),
    };
    jest
        .spyOn(userDetailsRepository, 'findByEmailAndPassword')
        .mockImplementation((email, password) => {
        return new Promise((resolve, reject) => {
            if (password === userDetails.password) {
                return resolve(userDetails);
            }
            return reject(new Error('Usuario inexistente!'));
        });
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('Testando login - valido', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = 'jeffersonkl99@gmail.com';
        const password = 'senha';
        const responseLogin = yield (0, login_service_1.login)(email, password);
        yield expect((0, login_service_1.login)(email, password)).resolves.not.toThrow();
        expect(responseLogin.userDetails.id).toEqual(userDetails.id);
    }));
    test('Testando login - invalido', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = 'jeffersonkl99@gmail.com';
        const password = 'senha1';
        yield expect((0, login_service_1.login)(email, password)).rejects.toThrow();
    }));
});
