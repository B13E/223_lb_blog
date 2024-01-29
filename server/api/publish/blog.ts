import { Database } from '../../database/database';

interface PostData {
    post_id: number;
    username: string;
    content: string;
}

export class Post {
    database: Database;

    constructor() {
        this.database = new Database();
    }

    public async savePost(userId: number, message: string): Promise<void> {
        await this.database.executeSQL(`INSERT INTO posts (user_id, content) VALUES (?, ?)`, [userId, message]);
    }

    public async getPost(): Promise<PostData[]> {
        const postData = await this.database.executeSQL(
            `SELECT posts.id AS post_id, users.username AS username, posts.content AS content FROM posts JOIN users ON users.id = posts.user_id`
        );
        return postData as PostData[];
    }

    public async editPost(postId: number, newContent: string): Promise<void> {
        await this.database.executeSQL(`UPDATE posts SET content = ? WHERE id = ?`, [newContent, postId]);
    }

    public async deletePost(postId: number): Promise<void> {
        await this.database.executeSQL(`DELETE FROM posts WHERE id = ?`, [postId]);
    }

    public async toggleLike(postId: number, userId: number): Promise<void> {
        const likeStatus = await this.database.executeSQL(
            `SELECT * FROM likes WHERE post_id = ? AND user_id = ?`, [postId, userId]
        );

        if (likeStatus.length > 0) {
            await this.database.executeSQL(`DELETE FROM likes WHERE post_id = ? AND user_id = ?`, [postId, userId]);
        } else {
            await this.database.executeSQL(`INSERT INTO likes (post_id, user_id) VALUES (?, ?)`, [postId, userId]);
        }
    }

    public async getLikesCount(postId: number): Promise<number> {
        const result = await this.database.executeSQL(
            `SELECT COUNT(*) AS likesCount FROM likes WHERE post_id = ?`, [postId]
        );
        return result[0]?.likesCount || 0;
    }
}
