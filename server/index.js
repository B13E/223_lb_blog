"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viteNodeApp = void 0;
// Importieren der notwendigen Module und Klassen.
// Express wird für die Webserver-Funktionalität verwendet.
var express_1 = require("express");
var api_1 = require("./api/api");
var http = require("http");
var path_1 = require("path");
var database_1 = require("./database/database");
// Definition der Backend-Klasse, die als Kern des Backends dient.
var Backend = /** @class */ (function () {
    // Konstruktor, der bei der Erstellung einer Instanz der Backend-Klasse aufgerufen wird.
    function Backend() {
        // Initialisierung der Express-App, der Datenbank und der API.
        this._app = (0, express_1.default)();
        this._database = new database_1.Database();
        this._api = new api_1.API(this._app);
        // Festlegen der Umgebungsvariablen auf den Wert der Systemumgebung oder 'development', falls nicht gesetzt.
        this._env = process.env.NODE_ENV || 'development';
        // Aufruf von Methoden zum Einrichten der Serverkonfiguration.
        this.setupStaticFiles();
        this.setupRoutes();
        this.startServer();
    }
    Object.defineProperty(Backend.prototype, "app", {
        // Getter-Methoden für den Zugriff auf die App, API und Datenbankinstanzen von außerhalb der Klasse.
        get: function () {
            return this._app;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Backend.prototype, "api", {
        get: function () {
            return this._api;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Backend.prototype, "database", {
        get: function () {
            return this._database;
        },
        enumerable: false,
        configurable: true
    });
    // Methode zum Einrichten eines Verzeichnisses für statische Dateien, hier 'client'.
    Backend.prototype.setupStaticFiles = function () {
        this._app.use(express_1.default.static('client'));
    };
    // Methode zum Einrichten von Routen, hier eine einfache Route für die Root-URL.
    Backend.prototype.setupRoutes = function () {
        this._app.get('/', function (req, res) {
            // Verwendung von 'resolve' und 'dirname' zur Ermittlung des Pfades zur Index-HTML-Datei.
            var __dirname = (0, path_1.resolve)((0, path_1.dirname)(''));
            res.sendFile(__dirname + '/client/index.html');
        });
    };
    // Methode zum Starten des HTTP-Servers, wenn die App im Produktionsmodus läuft.
    Backend.prototype.startServer = function () {
        if (this._env === 'production') {
            // Erstellen und Starten eines HTTP-Servers auf Port 3000.
            http.createServer(this.app).listen(3000, function () {
                console.log('Server is listening!');
            });
        }
    };
    return Backend;
}());
// Erstellen einer Backend-Instanz und Exportieren der Express-App für eventuelle weitere Verwendungen.
var backend = new Backend();
exports.viteNodeApp = backend.app;
