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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const verifyActivateAccout = __importStar(require("../../src/services/verify.service"));
const src_1 = __importDefault(require("../../src"));
const global_interfaces_1 = require("../../src/interfaces/global.interfaces");
const token_service_1 = require("../../src/services/token.service");
const uuid_1 = require("uuid");
describe('Teste da rota de verificao de conta', () => {
    test('Teste verificacao de conta de usuario - valido', () => __awaiter(void 0, void 0, void 0, function* () {
        const uuidUser = (0, uuid_1.v7)();
        const userDetails = {
            id: uuidUser,
            nome: 'jefferson',
            email: 'jeffersonkl@gmail.com',
            password: '1234',
            status: '1',
            createDate: new Date(),
            updateDate: new Date(),
        };
        const mockVerifyActivateAccout = jest
            .spyOn(verifyActivateAccout, 'verifyActivateAccout')
            .mockResolvedValue(userDetails);
        const tokenBody = {
            type: global_interfaces_1.TYPETOKEN.ACTIVATION,
        };
        const tokenConfig = {
            audience: uuidUser,
            expiresIn: '10s',
        };
        const USERID = uuidUser;
        const TOKEN = (0, token_service_1.createToken)(tokenBody, tokenConfig);
        const response = yield (0, supertest_1.default)(src_1.default)
            .get(`/api/verify/${USERID}/${TOKEN}`)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json');
        expect(response.status).toEqual(200);
        expect(response.body.status).toBe(userDetails.status);
    }));
});
