const mysql = require("mysql2");
const dotenv = require("dotenv");
const Tasks = require("../modal/Tasks");
dotenv.config();

const createTables = async (connection, tables) => {
  await Promise.all(tables.map((tableQuery) => connection.query(tableQuery)));
};

const connection = mysql
  .createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.MYSQL_PORT,
    connectTimeout: 300000,
  })
  .promise();

const pool = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.MYSQL_PORT,
    connectTimeout: 300000,
  })
  .promise();

const setUpDBConnection = async () => {
  try {
    await connection.connect();
    const createDBQuery = `create database if not exists \`${process.env.DATABASE_NAME}\``;
    await connection.query(createDBQuery);
    await connection.query(`use \`${process.env.DATABASE_NAME}\``);
    createTables(connection, Tasks);
    console.log("Database connection established");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  } finally {
    await connection.end();
  }
};

module.exports = { setUpDBConnection, connection, pool };
