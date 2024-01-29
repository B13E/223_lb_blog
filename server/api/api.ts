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
        this.database = new Database(); 
        this.post = new Post(); 
        this.comment = new Comment(); 
        this.userManagement = new UserManagement(); 

        this.app.use(bodyParser.json()); 
    }
}

