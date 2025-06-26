import mysql from "mysql2/promise";
 import 'dotenv/config'

export async function connect(){
    const host = process.env.DB_HOST
    const user = process.env.DB_USER
    const password = process.env.DB_PASSWORD
    const dbName = process.env.DB_NAME


    const connection = await mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: dbName,
    port: 3306,
    timezone: '-03:00' ,
    typeCast: function (field, next) {
        if (field.type === 'DATETIME' || field.type === 'TIMESTAMP') {
        return new Date(field.string() + 'Z');
        }
        return next();
    }

    });

    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}