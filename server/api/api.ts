import { Request, Response, Express } from 'express';
import bodyParser from 'body-parser';
import { Database } from '../database/database';
import { Post } from './publish/blog';
import { Comment } from './publish/comment';
import { UserManagement } from './usermanagement'; 

export class API {
    app: Express;
    database: Database;
    post: Post;
    comment: Comment;
    userManagement: UserManagement;

    constructor(app: Express) {
        this.app = app;
        this.database = new Database(); // Initialisiert eine Datenbankinstanz
        this.post = new Post(); // Initialisiert eine Instanz der Post-Klasse
        this.comment = new Comment(); // Initialisiert eine Instanz der Comment-Klasse
        this.userManagement = new UserManagement(); // Initialisiert eine Instanz der UserManagement-Klasse

        this.app.use(bodyParser.json()); // Verwendet das bodyParser-Middleware, um JSON-Anfragedaten zu verarbeiten
    }
}
