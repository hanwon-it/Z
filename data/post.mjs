import { getPosts } from "../db/database.mjs";
import MongoDb from "mongodb";
import * as UserRepository from "./auth.mjs";

let posts = [
  {
    id: "1",
    name: "김사과",
    userid: "apple",
    text: "Node.js 배우는 중인데 Express 진짜 편하다!",
    createdAt: Date.now().toString(),
    url: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    id: "2",
    name: "반하나",
    userid: "banana",
    text: "오늘의 커피 + 코딩 = 최고의 조합!",
    createdAt: Date.now().toString(),
    url: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "3",
    name: "오렌지",
    userid: "orange",
    text: "Elasticsearch 연동 완료! 실시간 검색 API 짜릿해 :돋보기:",
    createdAt: Date.now().toString(),
    url: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    id: "4",
    name: "배애리",
    userid: "berry",
    text: "JavaScript 비동기 너무 어렵다... Promises, async/await, 뭐가 뭔지 :울음:",
    createdAt: Date.now().toString(),
    url: "https://randomuser.me/api/portraits/women/52.jpg",
  },
  {
    id: "5",
    name: "이메론",
    userid: "melon",
    text: "새 프로젝트 시작! Express + MongoDB + EJS 조합 좋아요 ",
    createdAt: Date.now().toString(),
    url: "https://randomuser.me/api/portraits/men/29.jpg",
  },
];

// 모든 포스트를 리턴
export async function getAll() {
  return getPosts().find().sort({ createAt: -1 }).toArray();
}

// 사용자 아이디(userid)에 대한 포스트를 리턴
// filter -> 조건을 만족하는 모든 요소를 배열로 리턴
export async function getAllByUserid(userid) {
  return getPosts().find({ userid }).sort({ createAt: -1 }).toArray();
}

// 글 번호(id)에 대한 포스트를 리턴
// find -> 조건을 만족하는 첫 번째 요소 하나를 리턴
export async function getById(id) {
  return posts.find((post) => post.id === id);
}

// 포스트 작성
export async function create(text, id) {
  console.log("id: ", id);
  return UserRepository.findByid(id).then((user) =>
    getPosts()
      .insertOne({
        text,
        createAt: new Date(),
        useridx: user.id,
        name: user.name,
        userid: user.userid,
        url: user.url,
      })
      .then((result) => {
        return getPosts().findOne({ _id: result.insertedId });
      })
  );
}

// 포스트 변경
export async function update(id, text) {
  const post = posts.find((post) => post.id === id);
  if (post) {
    post.text = text;
  }
  return post;
}

// 포스트 삭제
export async function remove(id) {
  posts = posts.filter((post) => post.id !== id);
}
