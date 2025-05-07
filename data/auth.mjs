import { db } from "../db/database.mjs";

// let users = [
//   {
//     id: "1",
//     userid: "apple",
//     password: "1111",
//     name: "김사과",
//     email: "apple@apple.com",
//     url: "https://randomuser.me/api/portraits/women/32.jpg",
//   },
//   {
//     id: "2",
//     userid: "banana",
//     password: "2222",
//     name: "반하나",
//     email: "banana@banana.com",
//     url: "https://randomuser.me/api/portraits/women/44.jpg",
//   },
//   {
//     id: "3",
//     userid: "orange",
//     password: "3333",
//     name: "오렌지",
//     email: "orange@orange.com",
//     url: "https://randomuser.me/api/portraits/men/11.jpg",
//   },
//   {
//     id: "4",
//     userid: "berry",
//     password: "4444",
//     name: "배애리",
//     email: "orange@orange.com",
//     url: "https://randomuser.me/api/portraits/women/52.jpg",
//   },
//   {
//     id: "5",
//     userid: "melon",
//     password: "5555",
//     name: "이메론",
//     email: "orange@orange.com",
//     url: "https://randomuser.me/api/portraits/men/29.jpg",
//   },
// ];

export async function createUser(user) {
  const { userid, password, name, email, url } = user;
  return db
    .execute(
      "insert into users(userid,password,name,email,url) values (?,?,?,?,?)",
      [userid, password, name, email, url]
    )
    .then((result) => result[0].insertId);
}

export async function login(userid, password) {
  const user = users.find(
    (user) => user.userid === userid && user.password === password
  );
  return user;
}

// export async function findByUserid(userid) {
//   return users.find((user) => user.userid === userid);
// }

export async function findByUserid(userid) {
  return db
    .execute("select * from users where userid = ?", [userid])
    .then((result) => result[0][0]);
  // console.log(db.execute("select * from users where userid = ?", [userid]));
}

export async function findByid(idx) {
  return db
    .execute("select * from users where idx=?", [idx])
    .then((result) => result[0][0]);
}
