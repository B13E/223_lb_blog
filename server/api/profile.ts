import { Request, Response } from 'express';
import { Database } from '../database/database';

export class Profile {
    private database: Database;

    constructor() {
        this.database = new Database(); 
    }

    public async updateUsername(userId: number, newUsername: string): Promise<void> {
        await this.database.executeSQL(`UPDATE users SET username = ? WHERE id = ?`, [newUsername, userId]);
    }

    public updateUsernameHandler = async (req: Request, res: Response): Promise<void> => {
        const { userId, newUsername } = req.body; 
        try {
            await this.updateUsername(userId, newUsername); 
            res.json({ message: 'Benutzername aktualisiert.' }); 
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' }); 
        }
    }
}
