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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
var mariadb_1 = require("mariadb");
var schema_1 = require("./schema");
var Database = /** @class */ (function () {
    function Database() {
        // Erstellt eine Verbindungspool-Instanz für die Datenbank
        this._pool = mariadb_1.default.createPool({
            database: process.env.DB_NAME || 'minitwitter', // Datenbankname (Standardwert: 'minitwitter')
            host: process.env.DB_HOST || 'localhost', // Datenbank-Host (Standardwert: 'localhost')
            user: process.env.DB_USER || 'minitwitter', // Datenbank-Benutzername (Standardwert: 'minitwitter')
            password: process.env.DB_PASSWORD || 'supersecret123', // Datenbank-Passwort (Standardwert: 'supersecret123')
            connectionLimit: 5, // Maximale Anzahl gleichzeitiger Verbindungen zur Datenbank
        });
        // Initialisiert das Datenbankschema beim Erstellen einer Instanz dieser Klasse
        this.initializeDBSchema();
    }
    Database.prototype.initializeDBSchema = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Initializing DB schema...');
                        // Führt SQL-Anweisungen aus, um die Tabellen im Datenbankschema zu erstellen
                        return [4 /*yield*/, this.executeSQL(schema_1.USER_TABLE)];
                    case 1:
                        // Führt SQL-Anweisungen aus, um die Tabellen im Datenbankschema zu erstellen
                        _a.sent(); // Erstellt die Benutzertabelle
                        return [4 /*yield*/, this.executeSQL(schema_1.POST_TABLE)];
                    case 2:
                        _a.sent(); // Erstellt die Beitragstabelle
                        return [4 /*yield*/, this.executeSQL(schema_1.COMMENT_TABLE)];
                    case 3:
                        _a.sent(); // Erstellt die Kommentartabelle
                        return [4 /*yield*/, this.executeSQL(schema_1.LIKE_TABLE)];
                    case 4:
                        _a.sent(); // Erstellt die Liketabelle
                        return [2 /*return*/];
                }
            });
        });
    };
    // Führt eine SQL-Anweisung auf der Datenbank aus
    Database.prototype.executeSQL = function (query, values) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, res, _a, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, this._pool.getConnection()];
                    case 1:
                        conn = _b.sent();
                        if (!values) return [3 /*break*/, 3];
                        return [4 /*yield*/, conn.query(query, values)];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, conn.query(query)];
                    case 4:
                        _a = _b.sent();
                        _b.label = 5;
                    case 5:
                        res = _a;
                        return [4 /*yield*/, conn.end()];
                    case 6:
                        _b.sent(); // Gibt die Verbindung zurück in den Pool
                        return [2 /*return*/, res]; // Gibt das Ergebnis der SQL-Anweisung zurück
                    case 7:
                        err_1 = _b.sent();
                        console.error(err_1);
                        throw err_1; // Wirft einen Fehler, wenn ein Problem auftritt
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return Database;
}());
exports.Database = Database;
