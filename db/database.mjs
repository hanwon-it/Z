/*
  Mongoose
  - mongoDB + node.jsdyd ORM
  - 스키마를 정의
  입력, 수정, 조회, 삭제 모두 안정적이고 코드를 간결하게 작성
*/

import { config } from "../config.mjs";
import Mongoose from "mongoose";

export async function connectDB() {
  return Mongoose.connect(config.db.host);
}

export function useVirtualId(schema) {
  schema.virtual("id").get(function () {
    return this._id.toString();
  });
  schema.set("toJSON", { virtual: true });
  schema.set("toObject", { virtual: true });
}
// export async function connectDB() {
//   return MongoDb.MongoClient.connect(config.db.host).then((client) => {
//     db = client.db();
//     // console.log(db);
//   });
// }

// export function getUsers() {
//   return db.collection("users");
// }

// export function getPosts() {
//   return db.collection("posts");
// }
