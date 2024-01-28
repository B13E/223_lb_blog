import { Request, Response } from 'express';
import { Database } from '../database/database';
import * as bcrypt from 'bcrypt';

export class Profile {
    private database: Database;

    constructor() {
        this.database = new Database(); // Initialisiert eine Datenbankinstanz
    }

    // Aktualisiert den Benutzernamen in der Datenbank
    public async updateUsername(userId: number, newUsername: string): Promise<void> {
        await this.database.executeSQL(`UPDATE users SET username = ? WHERE id = ?`, [newUsername, userId]);
    }

    // Aktualisiert das Passwort in der Datenbank und verschlüsselt es mit bcrypt
    public async updatePassword(userId: number, newPassword: string): Promise<void> {
        const salt = await bcrypt.genSalt(10); // Generiert ein Salz für die Passwortverschlüsselung
        const hashedPassword = await bcrypt.hash(newPassword, salt); // Verschlüsselt das Passwort
        await this.database.executeSQL(`UPDATE users SET password = ? WHERE id = ?`, [hashedPassword, userId]);
    }

    // Express Route Handler für das Aktualisieren des Benutzernamens
    public updateUsernameHandler = async (req: Request, res: Response): Promise<void> => {
        const { userId, newUsername } = req.body; // Extrahiert userId und newUsername aus der Anfrage
        try {
            await this.updateUsername(userId, newUsername); // Ruft die Methode zum Aktualisieren des Benutzernamens auf
            res.json({ message: 'Benutzername aktualisiert.' }); // Sendet eine Erfolgsmeldung als JSON zurück
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' }); // Bei einem Fehler wird ein 500 Internal Server Error zurückgegeben
        }
    }

    // Express Route Handler für das Aktualisieren des Passworts
    public updatePasswordHandler = async (req: Request, res: Response): Promise<void> => {
        const { userId, newPassword } = req.body; // Extrahiert userId und newPassword aus der Anfrage
        try {
            await this.updatePassword(userId, newPassword); // Ruft die Methode zum Aktualisieren des Passworts auf
            res.json({ message: 'Passwort aktualisiert.' }); // Sendet eine Erfolgsmeldung als JSON zurück
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' }); // Bei einem Fehler wird ein 500 Internal Server Error zurückgegeben
        }
    }
}
