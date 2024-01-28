import { Database } from '../database/database';

export class UserManagement {
  private database: Database;

  constructor() {
    this.database = new Database(); // Initialisiert eine Datenbankinstanz
  }

  // Setzt die Benutzerrolle in der Datenbank
  public async setUserRole(userId: number, role: 'user' | 'moderator' | 'admin'): Promise<void> {
    await this.database.executeSQL(`UPDATE users SET role = ? WHERE id = ?`, [role, userId]);
  }

  // Ruft die Benutzerrolle aus der Datenbank ab
  public async getUserRole(userId: number): Promise<string> {
    const result = await this.database.executeSQL(`SELECT role FROM users WHERE id = ?`, [userId]);
    return result[0]?.role || 'user'; // Gibt die Benutzerrolle zurück oder 'user', wenn keine gefunden wurde
  }

  // Prüft, ob ein Benutzer Moderator ist
  public async isModerator(userId: number): Promise<boolean> {
    const role = await this.getUserRole(userId); // Ruft die Benutzerrolle ab
    return role === 'moderator'; // Gibt true zurück, wenn die Benutzerrolle 'moderator' ist, andernfalls false
  }

  // Prüft, ob ein Benutzer Administrator ist
  public async isAdmin(userId: number): Promise<boolean> {
    const role = await this.getUserRole(userId); // Ruft die Benutzerrolle ab
    return role === 'admin'; // Gibt true zurück, wenn die Benutzerrolle 'admin' ist, andernfalls false
  }
}
