import express, { Express, Request, Response } from 'express'
import { API } from './api/api'
import * as http from 'http'
import { resolve, dirname } from 'path'
import { Database } from './database/database'

class Backend {
  private _app: Express
  private _api: API
  private _database: Database
  private _env: string

  public get app(): Express {
    return this._app
  }

  public get api(): API {
    return this._api
  }

  public get database(): Database {
    return this._database
  }

  constructor() {
    this._app = express()
    this._database = new Database()
    this._api = new API(this._app)
    this._env = process.env.NODE_ENV || 'development'

    this.setupStaticFiles()
    this.setupRoutes()
    this.startServer()
  }

  private setupStaticFiles(): void {
    this._app.use(express.static('client'))
  }

  private setupRoutes(): void {
    this._app.get('/', (req: Request, res: Response) => {
      const __dirname = resolve(dirname(''))
      res.sendFile(__dirname + '/client/index.html')
    })
  }

  private startServer(): void {
    if (this._env === 'production') {
      http.createServer(this.app).listen(3000, () => {
        console.log('Server is listening!')
      })
    }
  }
}

const backend = new Backend()
export const viteNodeApp = backend.app
