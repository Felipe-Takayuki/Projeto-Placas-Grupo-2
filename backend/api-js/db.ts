import mysql from "mysql2/promise";
 import 'dotenv/config'

export async function connect(){
    const host = process.env.DB_HOST
    const user = process.env.DB_USER
    const password = process.env.DB_PASSWORD
    const dbName = process.env.DB_NAME

    const connection = await mysql.createConnection(
        `mysql://${password}:${user}@${host}:3306/${dbName}`
    );
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}