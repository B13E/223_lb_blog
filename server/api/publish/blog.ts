import { Database } from '../../database/database';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

// Definition der erwarteten Struktur für Post-Daten
interface PostData {
    post_id: number;
    username: string;
    content: string;
}

// Die Klasse Post für die Verwaltung von Beiträgen
export class Post {
    database: Database; // Instanz der Datenbankklasse.

    constructor() {
        this.database = new Database(); // Initialisiert eine neue Datenbankinstanz.
    }

    // Methode zum Speichern eines Beitrags
    public async savePost(message: string, token: string): Promise<void> {
        // Stellen Sie sicher, dass TOKEN_SECRET vorhanden ist
        const secretOrKey = process.env.TOKEN_SECRET || 'defaultSecret';
        const decodedToken = jwt.verify(token, secretOrKey) as JwtPayload;
        const username = decodedToken.username;

        // Suchen Sie die Benutzer-ID anhand des Benutzernamens in der Datenbank.
        const userResult = await this.database.executeSQL(`SELECT id FROM users WHERE username = ?`, [username]);
        if (userResult.length > 0) {
            const userId = userResult[0].id;
            // Fügen Sie den Beitrag mit der Benutzer-ID und der Nachricht in die Datenbank ein.
            await this.database.executeSQL(`INSERT INTO posts (user_id, content) VALUES (?, ?)`, [userId, message]);
        } else {
            throw new Error('Benutzer nicht gefunden');
        }
    }

    // Methode zum Abrufen von Beiträgen
    public async getPost(): Promise<PostData[]> {
        // Führen Sie eine SQL-Abfrage aus, um Beiträge und Benutzernamen zu erhalten.
        const postData = await this.database.executeSQL(
            `SELECT posts.id AS post_id, users.username AS username, posts.content AS content FROM posts JOIN users ON users.id = posts.user_id`
        );
        return postData as PostData[];
    }

    // Methode zum Bearbeiten eines Beitrags
    public async editPost(postId: number, newContent: string): Promise<void> {
        // Aktualisieren Sie den Inhalt des Beitrags in der Datenbank anhand der Beitrag-ID.
        await this.database.executeSQL(`UPDATE posts SET content = ? WHERE id = ?`, [newContent, postId]);
    }

    // Methode zum Löschen eines Beitrags
    public async deletePost(postId: number): Promise<void> {
        // Löschen Sie den Beitrag aus der Datenbank anhand der Beitrag-ID.
        await this.database.executeSQL(`DELETE FROM posts WHERE id = ?`, [postId]);
    }

    // Methode zum Aktivieren oder Deaktivieren eines "Gefällt mir"-Status für einen Beitrag
    public async toggleLike(postId: number, userId: number): Promise<void> {
        // Überprüfen Sie den aktuellen Status des "Gefällt mir"-Status für den Beitrag und den Benutzer.
        const likeStatus = await this.database.executeSQL(
            `SELECT * FROM likes WHERE post_id = ? AND user_id = ?`, [postId, userId]
        );

        if (likeStatus.length > 0) {
            // Wenn ein "Gefällt mir"-Status vorhanden ist, löschen Sie ihn (deaktivieren).
            await this.database.executeSQL(`DELETE FROM likes WHERE post_id = ? AND user_id = ?`, [postId, userId]);
        } else {
            // Wenn kein "Gefällt mir"-Status vorhanden ist, fügen Sie einen hinzu (aktivieren).
            await this.database.executeSQL(`INSERT INTO likes (post_id, user_id) VALUES (?, ?)`, [postId, userId]);
        }
    }

    // Methode zum Abrufen der Anzahl von "Gefällt mir"-Angaben für einen Beitrag
    public async getLikesCount(postId: number): Promise<number> {
        // Zählen Sie die Anzahl der "Gefällt mir"-Angaben für einen Beitrag.
        const result = await this.database.executeSQL(
            `SELECT COUNT(*) AS likesCount FROM likes WHERE post_id = ?`, [postId]
        );
        return result[0]?.likesCount || 0;
    }
}
