"use strict";
exports.__esModule = true;
var fs = require("fs");
var util_1 = require("util");
exports.fsExists = util_1.promisify(fs.exists);
exports.fsMkDir = util_1.promisify(fs.mkdir);
exports.fsWriteFile = util_1.promisify(fs.writeFile);
exports.fsReadFile = util_1.promisify(fs.readFile);
