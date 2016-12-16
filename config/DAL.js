import sqlite3 from 'sqlite3'

// TODO: Get all, delete one, create one, edit one

class SQL {
    constructor() {
        this.sql = sqlite3.verbose()
        this.db = new this.sql.Database('./secret/library')
    }
}
