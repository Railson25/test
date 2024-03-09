require("dotenv/config");
const postgres = require("postgres");

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const conn = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: "require",
});

async function createClientTable() {
  await conn`
     CREATE TABLE IF NOT EXISTS client (
      id SERIAL PRIMARY KEY,
      name VARCHAR (20)  NOT NULL,
      address VARCHAR (50)  NOT NULL,
      created_at TIMESTAMP DEFAULT now(),
      updated_at TIMESTAMP
    )
  `;
}

createClientTable().then(() => {
  console.log("success");
  conn.close();
});

async function dropDatabase() {
  await conn`
    DROP TABLE client
  `;
}

// dropDatabase().then(() => {
//   console.log("deletou");
//   conn.close();
// });

// function selectAll() {
//   return conn.query("SELECT * FROM hello_world");
// }
// await conn`
// ALTER TABLE client
// ADD CONSTRAINT uniquePerson UNIQUE (name, address);`;
