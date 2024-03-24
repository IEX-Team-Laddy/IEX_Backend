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
const Class_1 = require("../models/Class");
function matches(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Extract class name from request body (ex: ["NPS2001A"])
            console.log(req.body[0]);
            const className = req.body[0];
            const _class = yield Class_1.ClassModel.findOne({
                className,
            });
            if (!_class) {
                res.status(404).send("Class not found");
                return;
            }
            res.status(200).send(_class === null || _class === void 0 ? void 0 : _class.groupings);
        }
        catch (err) {
            console.error(err);
        }
    });
}
exports.default = matches;
