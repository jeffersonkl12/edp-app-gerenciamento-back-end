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
const token_service_1 = require("../../src/services/token.service");
const verify_service_1 = require("../../src/services/verify.service");
const userDetailsReposiotryf = __importStar(require("../../src/repositorys/userDetails.repository"));
describe('Teste do servico de verificacao da conta', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('Teste de verificacao de conta - valido', () => __awaiter(void 0, void 0, void 0, function* () {
        const newUserDetails = {
            id: '1',
            nome: 'jefferson',
            email: 'jeffersonkl@gmail.com',
            status: global_interfaces_1.TYPESTATUSUSER.DISABLED.toString(),
            password: '1234',
            createDate: new Date(),
            updateDate: new Date(),
        };
        const mockFindUserDetails = jest
            .spyOn(userDetailsReposiotryf, 'findUserDetailsById')
            .mockResolvedValue(newUserDetails);
        const mockSaveUserDetails = jest
            .spyOn(userDetailsReposiotryf, 'save')
            .mockResolvedValue(Object.assign(Object.assign({}, newUserDetails), { status: global_interfaces_1.TYPESTATUSUSER.ACTIVATE.toString() }));
        const token = (0, token_service_1.createToken)({ userId: '1', type: global_interfaces_1.TYPETOKEN.ACTIVATION }, { expiresIn: '1d', audience: '1' });
        const userDetails = yield (0, verify_service_1.verifyActivateAccout)('1', token);
        const calls = mockFindUserDetails.mock.calls;
        expect(calls[0][0]).toEqual('1');
        expect(userDetails === null || userDetails === void 0 ? void 0 : userDetails.status).toEqual(global_interfaces_1.TYPESTATUSUSER.ACTIVATE.toString());
    }));
});
