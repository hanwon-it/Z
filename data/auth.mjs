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
import Mongoose from "mongoose";
import { useVirtualId } from "../db/database.mjs";

const userSchema = new Mongoose.Schema(
  {
    userid: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    url: String,
  },
  { versionKey: false }
);

useVirtualId(userSchema);

const User = Mongoose.model("User", userSchema);

export async function createUser(user) {
  return new User(user).save().then((data) => data.id);
}

// export async function login(userid, password) {
//   return User.findOne({ userid });
// }

export async function findByUserid(userid) {
  return User.findOne({ userid });
}

export async function findByid(id) {
  return User.findById(id);
}

function mapOptionalUser(user) {
  return user ? { ...user, id: user._id.toString() } : user;
}
