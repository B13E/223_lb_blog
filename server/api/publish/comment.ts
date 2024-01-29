import { Request, Response } from 'express';
import { Database } from '../../database/database';

export class Comment {
    private database: Database;

    constructor() {
        this.database = new Database();
    }

    public async createComment(postId: number, userId: number, commentText: string): Promise<void> {
        await this.database.executeSQL(
            `INSERT INTO comments (post_id, user_id, comment) VALUES (?, ?, ?)`,
            [postId, userId, commentText]
        );
    }

    public async editComment(commentId: number, newCommentText: string): Promise<void> {
        await this.database.executeSQL(
            `UPDATE comments SET comment = ? WHERE id = ?`,
            [newCommentText, commentId]
        );
    }

    public async deleteComment(commentId: number): Promise<void> {
        await this.database.executeSQL(
            `DELETE FROM comments WHERE id = ?`,
            [commentId]
        );
    }

    public createCommentHandler = async (req: Request, res: Response): Promise<void> => {
        const postId = Number(req.body.postId);
        const userId = Number(req.body.userId);
        const commentText = req.body.commentText;

        try {
            await this.createComment(postId, userId, commentText);
            res.json({ message: 'Kommentar erstellt' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}
