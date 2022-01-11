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
exports.apiPostJSON = exports.fetch = void 0;
const importDynamic = new Function("modulePath", "return import(modulePath)");
function fetch(...args) {
    return __awaiter(this, void 0, void 0, function* () {
        const module = yield importDynamic("node-fetch");
        return module.default(...args);
    });
}
exports.fetch = fetch;
const apiPostJSON = ({ url, body }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fetch(url, {
        method: "post",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
    });
});
exports.apiPostJSON = apiPostJSON;
