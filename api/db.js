const Pool = require("pg").Pool;

const pool = new Pool({
    user: "csozan",
    password: "mysecretpassword",
    database : "dbms22_summer",
    host: "localhost",
    port: 5432
});

module.exports = pool;