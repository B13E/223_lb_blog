"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API = void 0;
var body_parser_1 = require("body-parser");
var database_1 = require("../database/database");
var blog_1 = require("./publish/blog");
var comment_1 = require("./publish/comment");
var usermanagement_1 = require("./usermanagement");
var API = /** @class */ (function () {
    function API(app) {
        this.app = app;
        this.database = new database_1.Database(); // Initialisiert eine Datenbankinstanz
        this.post = new blog_1.Post(); // Initialisiert eine Instanz der Post-Klasse
        this.comment = new comment_1.Comment(); // Initialisiert eine Instanz der Comment-Klasse
        this.userManagement = new usermanagement_1.UserManagement(); // Initialisiert eine Instanz der UserManagement-Klasse
        this.app.use(body_parser_1.default.json()); // Verwendet das bodyParser-Middleware, um JSON-Anfragedaten zu verarbeiten
    }
    return API;
}());
exports.API = API;
