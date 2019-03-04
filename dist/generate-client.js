"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
/* tslint:disable:no-console */
var handlebars = require("handlebars");
var request = require("superagent");
var fs_1 = require("./fs");
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
var template = function (namespace) { return handlebars.compile("/* tslint:disable */\n/**\n * This is generated by openapi-ts-client-gen - do not edit directly!\n */\nimport moment from 'moment';\n\nexport interface IRequestParams {\n  method: string;\n  url: string;\n  queryParameters?: { [key: string]: string | boolean | number | Date | undefined };\n  body?: Object;\n}\n\nexport abstract class ApiService {\n  constructor(public request: Function) {\n  }\n  protected executeRequest<T>(params: IRequestParams) {\n    return new Promise<T>((resolve, reject) => {\n      let req = this.request(params.method, params.url)\n        .set('Content-Type', 'application/json');\n\n      const queryParameters = params.queryParameters;\n      if (queryParameters) {\n        Object.keys(queryParameters).forEach(key => {\n          const value = queryParameters[key];\n          if (Object.prototype.toString.call(value) === '[object Date]') {\n            queryParameters[key] = moment(value as Date).format();\n          }\n        });\n\n        req = req.query(queryParameters);\n      }\n      if (params.body) { req.send(params.body); }\n\n      req.end((error: any, response: any) => {\n        if (error || !response.ok) {\n          if (response && response.body) {\n            const customError: any = new Error(response.body.message);\n            customError.status = response.body.status;\n            customError.type = response.body.type;\n            reject(customError);\n            return;\n          }\n\n          reject(error);\n        } else {\n          resolve(response.body);\n        }\n      });\n    });\n  }\n}\n\nexport namespace " + namespace + " {\n  let baseApiUrl: string;\n\n  export const Initialize = (params: { host: string; protocol?: string; }) => {\n    baseApiUrl = `${params.protocol || 'https'}://${params.host}`;\n  };\n\n  {{#models}}\n\n    {{#if description}}\n    /**\n     * {{description}}\n     */\n    {{/if}}\n    export interface {{name}} {\n      {{#properties}}\n      {{#if description}}\n      /**\n       * {{description}}\n       */\n      {{/if}}\n      {{propertyName}}: {{propertyType}};\n      {{/properties}}\n    }\n    {{/models}}\n\n    {{#services}}\n    {{#operations}}\n    {{#if hasParameters}}\n\n    export interface {{paramsInterfaceName}} {\n      {{#parameters}}\n      {{#if description}}\n      /**\n       * {{description}}\n       */\n      {{/if}}\n      {{parameterName}}: {{parameterType}};\n      {{/parameters}}\n    }\n    {{/if}}\n    {{/operations}}\n    {{/services}}\n    {{#services}}\n    export class {{name}} extends ApiService {\n      constructor(request: Function) {\n        super(request);\n      }\n\n      {{#operations}}\n\n      {{#if description}}\n      /**\n       * {{description}}\n       */\n      {{/if}}\n      public async {{id}}({{signature}}) {\n        const requestParams: IRequestParams = {\n          method: '{{method}}',\n          url: `${baseApiUrl}{{../../apiPath}}{{urlTemplate}}`\n        };\n        {{#if queryParameters}}\n\n        requestParams.queryParameters = {\n        {{#queryParameters}}\n          {{this}}: _params.{{this}},\n        {{/queryParameters}}\n        };\n        {{/if}}\n        {{#if hasBodyParameter}}\n\n        requestParams.body = _params.{{bodyParameter}};\n        {{/if}}\n        return this.executeRequest<{{returnType}}>(requestParams);\n      }\n      {{/operations}}\n    }\n    {{/services}}\n}\n"); };
var stringifyNumberEnum = function (enumValue) { return enumValue.map(function (s) { return "" + s; }).join(' | '); };
var getTypeFromRef = function ($ref) {
    return "" + $ref.replace('#/definitions/', '');
};
var getPropertyTypeFromSwaggerProperty = function (property) {
    if (!property) {
        return 'void';
    }
    if (property.type) {
        if (property.type === 'integer' || property.format === 'double') {
            if (property.format === 'int64') {
                return 'string';
            }
            if (property["enum"]) {
                return stringifyNumberEnum(property["enum"]);
            }
            return 'number';
        }
        if (property.type === 'boolean') {
            return 'boolean';
        }
        if (property.type === 'string') {
            return property.format === 'date-time' ? 'Date' : 'string';
        }
        if (property.type === 'array') {
            var items = property.items;
            if (!items) {
                throw new Error();
            }
            if (items.type) {
                return "any[]";
            }
            return getTypeFromRef(items.$ref) + "[]";
        }
    }
    if (property.$ref) {
        return getTypeFromRef(property.$ref);
    }
    return 'any';
};
var getTypeScriptTypeFromSwaggerType = function (schema) {
    if (schema.type === 'integer' || schema.type === 'number') {
        if (schema["enum"]) {
            return stringifyNumberEnum(schema["enum"]);
        }
        return 'number';
    }
    if (schema.type === 'boolean') {
        return 'boolean';
    }
    if (schema.type === 'string') {
        return schema.format === 'date-time' ? 'Date' : 'string';
    }
    return undefined;
};
var getPropertyTypeFromSwaggerParameter = function (parameter) {
    var queryParameter = parameter;
    if (queryParameter.type) {
        var tsType = getTypeScriptTypeFromSwaggerType(queryParameter);
        if (tsType) {
            return tsType;
        }
    }
    var bodyParameter = parameter;
    var schema = bodyParameter.schema;
    if (schema) {
        if (schema.$ref) {
            return getTypeFromRef(schema.$ref);
        }
        if (schema.type === 'array') {
            var items = schema.items;
            if (items.$ref) {
                return getTypeFromRef(items.$ref) + "[]";
            }
            if (items.type) {
                var tsType = getTypeScriptTypeFromSwaggerType(items);
                if (tsType) {
                    return tsType + "[]";
                }
            }
        }
    }
    return 'any';
};
var getNormalizedDefinitionKey = function (key) {
    if (key.includes('[]')) {
        return key;
    }
    return key.replace('[', '').replace(']', '');
};
var getTemplateView = function (swagger, baseUrl) {
    var definitions = swagger.definitions;
    if (!definitions) {
        throw new Error('No definitions.');
    }
    var paths = swagger.paths;
    if (!paths) {
        throw new Error('No paths.');
    }
    var serviceMap = {};
    Object.keys(paths)
        .forEach(function (pathKey) {
        var methods = ['get', 'post', 'delete', 'patch', 'put', 'options', 'head'];
        var path = paths[pathKey];
        Object.keys(path)
            .filter(function (operationKey) { return methods.find(function (m) { return m === operationKey; }); })
            .forEach(function (operationKey) {
            var operation = path[operationKey];
            if (!operation.operationId || !operation.tags) {
                throw new Error('no tags for ' + JSON.stringify(path));
            }
            var tag = operation.tags[0];
            var service = serviceMap[tag] = serviceMap[tag] || { name: tag + "Service", operations: [] };
            var operationId = operation.operationId.replace('_', '');
            if (tag) {
                operationId = operationId.replace(tag, '');
            }
            var parameters = operation.parameters;
            var operationParameters = new Array();
            // /api/{someParam}/{anotherParam} => /api/${someParam}/${anotherParam}
            var urlTemplate = ("" + pathKey).replace(/\{/g, '${');
            var signature = '';
            var paramsInterfaceName = '';
            var queryParameters = undefined;
            var bodyParameter;
            var hasBodyParameter = false;
            if (parameters && parameters.length) {
                paramsInterfaceName = "I" + tag + (operationId.charAt(0).toUpperCase() + operationId.slice(1)) + "Params";
                signature = "_params: " + paramsInterfaceName;
                parameters.forEach(function (parameter) {
                    var parameterName = parameter.name;
                    operationParameters.push({
                        parameterName: "" + parameterName + (parameter.required === false ? '?' : ''),
                        parameterType: getPropertyTypeFromSwaggerParameter(parameter),
                        description: parameter.description
                    });
                    if (parameter["in"] === 'path') {
                        urlTemplate = urlTemplate.replace(parameter.name, "_params." + parameterName);
                        return;
                    }
                    if (parameter["in"] === 'query') {
                        queryParameters = queryParameters || new Array();
                        queryParameters.push(parameterName);
                        return;
                    }
                    if (parameter["in"] === 'body') {
                        hasBodyParameter = true;
                        bodyParameter = parameterName;
                    }
                });
            }
            var returnType = 'void';
            if (operation.responses['200']) {
                returnType = getNormalizedDefinitionKey(getPropertyTypeFromSwaggerProperty(operation.responses['200'].schema));
            }
            service.operations.push({
                id: operationId.charAt(0).toLowerCase() + operationId.slice(1),
                method: operationKey.toUpperCase(),
                signature: signature,
                urlTemplate: urlTemplate,
                parameters: operationParameters,
                hasParameters: !!operationParameters.length,
                bodyParameter: bodyParameter,
                queryParameters: queryParameters,
                returnType: returnType,
                paramsInterfaceName: paramsInterfaceName,
                hasBodyParameter: hasBodyParameter,
                description: operation.description
            });
        });
    });
    return {
        baseUrl: baseUrl,
        apiPath: swagger.basePath,
        services: Object.keys(serviceMap).map(function (key) { return serviceMap[key]; }),
        models: Object.keys(definitions).map(function (definitionKey) {
            var definition = definitions[definitionKey];
            if (!definition) {
                throw new Error('No definition found.');
            }
            var properties = definition.properties;
            if (!properties) {
                console.log(definition);
                throw new Error('No definition properties found.');
            }
            return {
                name: "" + getNormalizedDefinitionKey(definitionKey),
                description: definition.description,
                properties: Object.keys(properties).map(function (propertyKey) {
                    var property = properties[propertyKey];
                    var isRequired = definition.required && definition.required.find(function (propertyName) { return propertyName === propertyKey; });
                    return {
                        propertyName: "" + propertyKey + (isRequired ? '' : '?'),
                        propertyType: getPropertyTypeFromSwaggerProperty(property),
                        description: property.description
                    };
                })
            };
        })
    };
};
var specFetch = {
    url: function (url) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    request
                        .get(url)
                        .set('Accept', 'application/json')
                        .end(function (err, res) {
                        if (err) {
                            return reject(err);
                        }
                        resolve(res.body);
                    });
                })];
        });
    }); },
    file: function (path) { return __awaiter(_this, void 0, void 0, function () {
        var raw;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_1.fsReadFile(path)];
                case 1:
                    raw = _a.sent();
                    return [2 /*return*/, JSON.parse(raw.toString('utf8'))];
            }
        });
    }); }
};
exports.generate = function (_a) {
    var type = _a.type, srcPath = _a.srcPath, destPath = _a.destPath, baseUrl = _a.baseUrl, namespace = _a.namespace, spec = _a.spec;
    return __awaiter(_this, void 0, void 0, function () {
        var fetcher, compiled, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!!spec) return [3 /*break*/, 2];
                    fetcher = specFetch[type];
                    if (!fetcher) {
                        throw new Error("unknown source type: " + type);
                    }
                    return [4 /*yield*/, fetcher(srcPath)];
                case 1:
                    spec = _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    compiled = template(namespace)(getTemplateView(spec, baseUrl || spec.host || ''));
                    return [4 /*yield*/, fs_1.fsWriteFile(destPath, compiled)];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _b.sent();
                    console.log(err_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
};