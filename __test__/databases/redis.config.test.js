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
const redis_config_1 = __importDefault(require("../../src/databases/configs/redis.config"));
describe('Testando configuracoes do redis', () => {
    test('Testando conneccao do redis', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(redis_config_1.default.connect()).resolves.not.toThrow();
        const timeout = (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        };
        yield timeout(1000 * 3);
        yield expect(redis_config_1.default.quit()).resolves.toEqual('OK');
    }));
});
