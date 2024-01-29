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
exports.Post = void 0;
var database_1 = require("../../database/database");
// Die Klasse Post für die Verwaltung von Beiträgen
var Post = /** @class */ (function () {
    function Post() {
        this.database = new database_1.Database(); // Initialisiert eine neue Datenbankinstanz.
    }
    // Methode zum Speichern eines Beitrags
    Post.prototype.savePost = function (userId, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Füge den Beitrag mit der Benutzer-ID und der Nachricht in die Datenbank ein.
                    return [4 /*yield*/, this.database.executeSQL("INSERT INTO posts (user_id, content) VALUES (?, ?)", [userId, message])];
                    case 1:
                        // Füge den Beitrag mit der Benutzer-ID und der Nachricht in die Datenbank ein.
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Methode zum Abrufen von Beiträgen
    Post.prototype.getPost = function () {
        return __awaiter(this, void 0, void 0, function () {
            var postData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.database.executeSQL("SELECT posts.id AS post_id, users.username AS username, posts.content AS content FROM posts JOIN users ON users.id = posts.user_id")];
                    case 1:
                        postData = _a.sent();
                        return [2 /*return*/, postData];
                }
            });
        });
    };
    // Methode zum Bearbeiten eines Beitrags
    Post.prototype.editPost = function (postId, newContent) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Aktualisiere den Inhalt des Beitrags in der Datenbank anhand der Beitrag-ID.
                    return [4 /*yield*/, this.database.executeSQL("UPDATE posts SET content = ? WHERE id = ?", [newContent, postId])];
                    case 1:
                        // Aktualisiere den Inhalt des Beitrags in der Datenbank anhand der Beitrag-ID.
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Methode zum Löschen eines Beitrags
    Post.prototype.deletePost = function (postId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Lösche den Beitrag aus der Datenbank anhand der Beitrag-ID.
                    return [4 /*yield*/, this.database.executeSQL("DELETE FROM posts WHERE id = ?", [postId])];
                    case 1:
                        // Lösche den Beitrag aus der Datenbank anhand der Beitrag-ID.
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Methode zum Aktivieren oder Deaktivieren eines "Gefällt mir"-Status für einen Beitrag
    Post.prototype.toggleLike = function (postId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var likeStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.database.executeSQL("SELECT * FROM likes WHERE post_id = ? AND user_id = ?", [postId, userId])];
                    case 1:
                        likeStatus = _a.sent();
                        if (!(likeStatus.length > 0)) return [3 /*break*/, 3];
                        // Wenn ein "Gefällt mir"-Status vorhanden ist, lösche ihn (deaktivieren).
                        return [4 /*yield*/, this.database.executeSQL("DELETE FROM likes WHERE post_id = ? AND user_id = ?", [postId, userId])];
                    case 2:
                        // Wenn ein "Gefällt mir"-Status vorhanden ist, lösche ihn (deaktivieren).
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: 
                    // Wenn kein "Gefällt mir"-Status vorhanden ist, füge einen hinzu (aktivieren).
                    return [4 /*yield*/, this.database.executeSQL("INSERT INTO likes (post_id, user_id) VALUES (?, ?)", [postId, userId])];
                    case 4:
                        // Wenn kein "Gefällt mir"-Status vorhanden ist, füge einen hinzu (aktivieren).
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // Methode zum Abrufen der Anzahl von "Gefällt mir"-Angaben für einen Beitrag
    Post.prototype.getLikesCount = function (postId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.database.executeSQL("SELECT COUNT(*) AS likesCount FROM likes WHERE post_id = ?", [postId])];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.likesCount) || 0];
                }
            });
        });
    };
    return Post;
}());
exports.Post = Post;
