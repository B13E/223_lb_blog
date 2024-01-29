import mariadb, { Pool } from 'mariadb';
import { USER_TABLE, POST_TABLE, COMMENT_TABLE, LIKE_TABLE } from "./schema";

export class Database {
  private _pool: Pool;

  constructor() {
    this._pool = mariadb.createPool({
      database: process.env.DB_NAME || 'minitwitter', 
      host: process.env.DB_HOST || 'localhost', 
      user: process.env.DB_USER || 'minitwitter', 
      password: process.env.DB_PASSWORD || 'supersecret123', 
      connectionLimit: 5, 
    });

    this.initializeDBSchema();
  }

  private async initializeDBSchema() {
    console.log('Initializing DB schema...');
    
    await this.executeSQL(USER_TABLE); 
    await this.executeSQL(POST_TABLE); 
    await this.executeSQL(COMMENT_TABLE);
    await this.executeSQL(LIKE_TABLE); 
  }

  public async executeSQL(query: string, values?: any[]): Promise<any> {
    try {
      const conn = await this._pool.getConnection(); 
      const res = values ? await conn.query(query, values) : await conn.query(query); 
      await conn.end(); 
      return res; 
    } catch (err) {
      console.error(err);
      throw err; 
    }
  }
}
