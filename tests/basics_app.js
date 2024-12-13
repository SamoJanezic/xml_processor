const sqlite3 = require('sqlite3').verbose();

let sql;

//connect
// const db = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE, (err) => {
//     if (err) return console.error(err.message);
// });
/************** create *************/

// sql = 'CREATE TABLE users(id INTEGER PRIMARY KEY, first_name, last_name, username, password, email)';
// db.run(sql);

/************** drop ***************/

// db.run('DROP TABLE users');

/************** insert *************/

// sql = 'INSERT INTO users (first_name,last_name,username,password,email) VALUES(?,?,?,?,?)';
// db.run(sql, 
//     ["bla", "blaen", "blabla", "bla1234", "bla@bla.bla"], 
//     (err) => {
//         if (err) return console.error(err.message);
//     }
// );

/************** update *************/

// sql = 'UPDATE users SET first_name = ? WHERE id = ?';
// db.run(sql, ['Jake', 1], (err) => {
//     if (err) return console.error(err.message);
// });

/************** delete *************/

// sql = 'DELETE FROM users WHERE id= ?';
// db.run(sql, [2], (err) => {
//     if (err) return console.error(err.message);
// })

/************** query **************/

sql = 'SELECT * FROM users';
db.all(sql, (err, rows) => {
    if (err) return console.error(err.message);

    console.log(rows);
});