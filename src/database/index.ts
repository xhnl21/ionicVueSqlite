// src/services/database.ts
import { SQLiteConnection, CapacitorSQLite } from '@capacitor-community/sqlite';
import { defineComponent } from 'vue';
// import { Plugins } from '@capacitor/core'
import JSZip from 'jszip';
export default defineComponent({
    data() {
        return {
            sqlite: [] as any,
            db: [] as any,
        }
    },
    methods: {
        async createDatabase(nameDb = "db_vite") {
            const sqlite = new SQLiteConnection(CapacitorSQLite);
            this.db = await sqlite.createConnection(nameDb, false, "no-encryption", 1, false);
            await this.db.open();
            const query = `
                        CREATE TABLE IF NOT EXISTS test (
                        id INTEGER PRIMARY KEY NOT NULL,
                        name TEXT NOT NULL
                        );
                    `
            const res = await this.db.execute(query);
            console.log(`res: ${JSON.stringify(res)}`);
            if (res.changes && res.changes.changes && res.changes.changes < 0) {
                throw new Error(`Error: execute failed`);
            }
        },
        async openDatabase(nameDb = "db_vite") {
            try {
                const sqlite = new SQLiteConnection(CapacitorSQLite);
                const ret = await sqlite.checkConnectionsConsistency();
                const isConn = (await sqlite.isConnection(nameDb, false)).result;
                let db = [] as any;
                if (ret.result && isConn) {
                    db = await sqlite.retrieveConnection(nameDb, false);
                } else {
                    db = await sqlite.createConnection(nameDb, false, "no-encryption", 1, false);
                }
                this.sqlite = sqlite;
                this.db = db;
                console.log('Database opened successfully');
            } catch (error) {
                console.error('Error opening database:', error);
            }
        },
        async closeDatabase() {
            if (this.sqlite) {
                this.db.close()
                    .then(() => {
                        console.log('Database closed successfully');
                    })
                    .catch((error: any) => {
                        console.error('Error closing database:', error);
                    });
            }

            if (!this.db) {
                console.log('Database already closed');
                return;
            }
        },
        async readData() {
            await this.db.open();
            const select = await this.db.query(`SELECT * FROM test`);
            console.log(`res: ${JSON.stringify(select)}`);
            await this.db.close();
        },
        async executeSql(sql: string, params: any[] = []) {
            await this.openDatabase("db_vite");
            if (!this.db) {
                console.warn('Database not open');
                return;
            }
            await this.db.open();
            const select = await this.db.query(sql, params);
            // const select = await this.db.query(sql);
            await this.db.close();
            return select;
        },
        async exportDatabase(nameDb = "db_vite") {
            try {
                const sqlite = new SQLiteConnection(CapacitorSQLite);
                const ret = await sqlite.checkConnectionsConsistency();
                const isConn = (await sqlite.isConnection(nameDb, false)).result;
                let db = [] as any;
                if (ret.result && isConn) {
                    db = await sqlite.retrieveConnection(nameDb, false);
                } else {
                    db = await sqlite.createConnection(nameDb, false, "no-encryption", 1, false);
                }
                await db.open("db_vite");
                const exportResult = await db.exportToJson('full');

                let retExport = true;
                if (Object.keys(exportResult.export).length === 0) { retExport = false; }
                const jsObj: string = JSON.stringify(exportResult.export);
                await db.close();
                
                const zip = new JSZip();
                zip.file('exported_database.json', jsObj);
                const zipFile = await zip.generateAsync({ type: 'blob' });
                const saveLink = document.createElement('a');
                saveLink.href = URL.createObjectURL(zipFile);
                saveLink.download = 'exported_database.zip';
                saveLink.click();

                console.log('Database exported and saved as a ZIP file');
            } catch (error) {
                console.error('Error exporting database:', error);
            }
        }


    }
});