import { Database } from '../database/database';

export class UserManagement {
  private database: Database;

  constructor() {
    this.database = new Database(); 
  }

  public async setUserRole(userId: number, role: 'user' | 'moderator' | 'admin'): Promise<void> {
    await this.database.executeSQL(`UPDATE users SET role = ? WHERE id = ?`, [role, userId]);
  }

  public async getUserRole(userId: number): Promise<string> {
    const result = await this.database.executeSQL(`SELECT role FROM users WHERE id = ?`, [userId]);
    return result[0]?.role || 'user'; 
  }

  public async isModerator(userId: number): Promise<boolean> {
    const role = await this.getUserRole(userId); 
    return role === 'moderator'; 
  }

  public async isAdmin(userId: number): Promise<boolean> {
    const role = await this.getUserRole(userId); 
    return role === 'admin'; 
  }
}
