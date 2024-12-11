// sql = 'CREATE TABLE users(id INTEGER PRIMARY KEY, username, first_name, last_name, email, birthday, country)';
// db.run(sql);

sql = 'DROP TABLE izdelki';
db.run(sql);

//get data
// async function getData(url){
//     try {
//         const { data } = await axios.get(url);
//         data.forEach(d=>{
//             let userData = {
//                 username: d.username,
//                 first_name: d.first_name,
//                 last_name: d.last_name,
//                 email: d.email,
//                 birthday: d.date_of_birth,
//                 country: d.address.country
//             };
//             sql = 'INSERT INTO users(username, first_name, last_name, email, birthday, country) VALUES (?,?,?,?,?,?)';
//             db.run(sql, [
//                 userData.username, 
//                 userData.first_name,
//                 userData.last_name,
//                 userData.email,
//                 userData.birthday,
//                 userData.country
//             ], (err)=>{
//                 if(err)console.error(err.message);
//                 else console.log('success');
//             }
//         );
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }
// getData("https://random-data-api.com/api/users/random_user/?size=20");

/*************************** Query *********************/

// sql = "SELECT * FROM users";
// db.all(sql,[], (err, rows)=>{
//     if (err) return console.error(err);
//     rows.forEach(row => {
//         console.log(row)
//     })
// });