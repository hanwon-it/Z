import { useVirtualId } from "../db/database.mjs";
import * as UserRepository from "./auth.mjs";
//const ObjectID = MongoDb.ObjectId;
import Mongoose from "mongoose";

const postSchema = new Mongoose.Schema(
  {
    userid: { type: String, require: true },
    name: { type: String, require: true },
    url: String,
    text: { type: String, require: true },
    userId: { type: String, require: true },
  },
  { timestamps: true }
);

useVirtualId(postSchema);

const Post = Mongoose.model("Post", postSchema);

// 모든 포스트를 리턴
export async function getAll() {
  return Post.find().sort({ createdAt: -1 });
}

// 사용자 아이디(userid)에 대한 포스트를 리턴
// filter -> 조건을 만족하는 모든 요소를 배열로 리턴
export async function getAllByUserid(userid) {
  return Post.find({ userid }).sort({ createAt: -1 });
}

// 글 번호(id)에 대한 포스트를 리턴
// find -> 조건을 만족하는 첫 번째 요소 하나를 리턴
export async function getById(id) {
  return Post.findById(id);
}

// 포스트 작성
export async function create(text, userId) {
  return UserRepository.findByid(userId).then((user) =>
    new Post({
      userid: user.userid,
      name: user.name,
      userId,
      text,
    }).save()
  );
}

// 포스트 변경
export async function update(id, text) {
  return getPosts()
    .findOneAndUpdate(
      { _id: new ObjectID(id) },
      { $set: { text } },
      { returnDocument: "after" }
    )
    .then((result) => result);
}

// 포스트 삭제
export async function remove(id) {
  return getPosts().deleteOne({ _id: new ObjectID(id) });
}

function mapOptionalPost(post) {
  return post ? { ...post, id: post._id.toString() } : post;
}
