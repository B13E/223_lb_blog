import mariadb, { Pool } from 'mariadb';
import { USER_TABLE, POST_TABLE, COMMENT_TABLE, LIKE_TABLE } from "./schema";

export class Database {
  private _pool: Pool;

  constructor() {
    // Erstellt eine Verbindungspool-Instanz für die Datenbank
    this._pool = mariadb.createPool({
      database: process.env.DB_NAME || 'minitwitter', // Datenbankname (Standardwert: 'minitwitter')
      host: process.env.DB_HOST || 'localhost', // Datenbank-Host (Standardwert: 'localhost')
      user: process.env.DB_USER || 'minitwitter', // Datenbank-Benutzername (Standardwert: 'minitwitter')
      password: process.env.DB_PASSWORD || 'supersecret123', // Datenbank-Passwort (Standardwert: 'supersecret123')
      connectionLimit: 5, // Maximale Anzahl gleichzeitiger Verbindungen zur Datenbank
    });

    // Initialisiert das Datenbankschema beim Erstellen einer Instanz dieser Klasse
    this.initializeDBSchema();
  }

  private async initializeDBSchema() {
    console.log('Initializing DB schema...');
    
    // Führt SQL-Anweisungen aus, um die Tabellen im Datenbankschema zu erstellen
    await this.executeSQL(USER_TABLE); // Erstellt die Benutzertabelle
    await this.executeSQL(POST_TABLE); // Erstellt die Beitragstabelle
    await this.executeSQL(COMMENT_TABLE); // Erstellt die Kommentartabelle
    await this.executeSQL(LIKE_TABLE); // Erstellt die Liketabelle
  }

  // Führt eine SQL-Anweisung auf der Datenbank aus
  public async executeSQL(query: string, values?: any[]): Promise<any> {
    try {
      const conn = await this._pool.getConnection(); // Holt eine Verbindung aus dem Pool
      const res = values ? await conn.query(query, values) : await conn.query(query); // Führt die SQL-Anweisung aus
      await conn.end(); // Gibt die Verbindung zurück in den Pool
      return res; // Gibt das Ergebnis der SQL-Anweisung zurück
    } catch (err) {
      console.error(err);
      throw err; // Wirft einen Fehler, wenn ein Problem auftritt
    }
  }
}
