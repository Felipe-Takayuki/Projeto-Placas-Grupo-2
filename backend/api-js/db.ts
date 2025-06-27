import mysql from "mysql2/promise";
import 'dotenv/config'

export async function connect(){
    const host = process.env.DB_HOST
    const user = process.env.DB_USER
    const password = process.env.DB_PASSWORD
    const dbName = process.env.DB_NAME

    console.log({host, user, password, dbName})

    const connection = await mysql.createConnection(
        `mysql://${user}:${password}@${host}:3306/${dbName}`
    );
    console.log("Conectou no MySQL!");

    return connection;
}