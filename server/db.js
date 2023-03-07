const POOL = require("pg").Pool;
const pool = new POOL({
    // connectionString: process.env.DATABASE_URL
    user: "playabook",
    database: "career",
    host: "localhost",
    password: "8896",
    port: 5432
});



module.exports = pool;