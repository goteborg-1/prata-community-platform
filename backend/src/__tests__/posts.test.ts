import dotenv from "dotenv"
import app from "../app.js";
import request from "supertest"
import * as db from "./helpers/db.js"
import { beforeAll, afterEach, afterAll, describe, test, expect, beforeEach } from "@jest/globals"
import { PostModel } from "../models/Post.model.js"; 

dotenv.config()

beforeAll(() => db.connect());
afterEach(() => db.clearDatabase());
afterAll(() => db.closeDatabase());


describe("GET /posts", () => {
  // ---- positive tests ----
  test("return array of posts", async () => {
    const res = await request(app).get("/api/v1/posts")


    expect(res.status).toBe(200)
    expect(res.body.data).toBeInstanceOf(Array)
  })
})

describe("POST /posts", () => {
  let token: string

  // create account -> to pass auth middleware
  beforeEach(async () => {
    await request(app).post("/api/v1/users/register").send({
      email: "test@test.com",
      handle: "testuser",
      password: "password123"
    })

    // sign in -> only signed in users can post
    const login = await request(app).post("/api/v1/users/login").send({
      email: "test@test.com",
      password: "password123"
    })

    token = login.body.data.token
  })

  test("create a post, only send required fields, autofill rest", async () => {

    // sending just the miniumum, gets rest autofilled by model
    const res = await request(app)
      .post("/api/v1/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test title",
        description: "test description",
        categories: ["family", "anxiety"]
      })


    expect(res.status).toBe(201)
    expect(res.body.data).toHaveProperty("title", "Test title")
    expect(res.body.data).toHaveProperty("description", "test description")
    expect(res.body.data.categories).toContain("family") // order does not matter with toContain
    expect(res.body.data.categories).toContain("anxiety") // order does not matter with toContain
    expect(res.body.data).toHaveProperty("likeCount", 1) // autofilled default (likes own post)
    expect(res.body.data).toHaveProperty("isAnonymous", false) // autofilled default
    expect(res.body.data).toHaveProperty("triggerTags", []) // autofilled default
  })


  // ---- negative tests ----
  test("POST without Authorization-header -> expect 401", async () => {
    const res = await request(app)
      .post("/api/v1/posts")
      .send({
        title: "Test title",
        description: "test description",
        categories: ["family", "anxiety"]
      })

    expect(res.status).toBe(401)
  })

  test("POST with auth, but without required field (no title) -> expect 400", async () => {
    const res = await request(app)
      .post("/api/v1/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "",
        description: "test description",
        categories: ["family", "anxiety"]
      })

    expect(res.status).toBe(400)
  })
})

describe("GET /posts/:id", () => {

  // ---- create a post so it can be found ----
  let token: string
  let postId: string

  beforeEach(async () => {
    await request(app).post("/api/v1/users/register").send({
      email: "test@test.com",
      handle: "testuser",
      password: "password123"
    })

    const login = await request(app).post("/api/v1/users/login").send({
      email: "test@test.com",
      password: "password123"
    })

    token = login.body.data.token



    const res = await request(app)
      .post("/api/v1/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test title specific",
        description: "test description specific id",
        categories: ["family", "anxiety"],
        isAnonymous: true
      })

    postId = res.body.data.id

  })
  // ---- positive tests ----
  test("return a specific post", async () => {
    const res = await request(app).get(`/api/v1/posts/${postId}`)



    expect(res.status).toBe(200)
    expect(res.body.data).toHaveProperty("title", "Test title specific")
    expect(res.body.data).toHaveProperty("description", "test description specific id")
    expect(res.body.data).toHaveProperty("isAnonymous", true)
  })

  // ---- negative tests ----
  test("return post that does not exist -> return 404", async () => {
    const res = await request(app).get(`/api/v1/posts/000000000000000000000001`) // MongoDB ObjectID has to be 24 hex

    expect(res.status).toBe(404)
  })
})

describe("PATCH /posts/:id", () => {
  // ---- create a post so it can be found ----
  let token: string
  let postId: string

  beforeEach(async () => {
    await request(app).post("/api/v1/users/register").send({
      email: "test@test.com",
      handle: "testuser",
      password: "password123"
    })

    const login = await request(app).post("/api/v1/users/login").send({
      email: "test@test.com",
      password: "password123"
    })

    token = login.body.data.token



    const res = await request(app)
      .post("/api/v1/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test title specific",
        description: "test description specific id",
        categories: ["family", "anxiety"],
        isAnonymous: true
      })

    postId = res.body.data.id

  })

  test("updating title and description of specific post", async () => {
    const res = await request(app)
      .patch(`/api/v1/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated title",
        description: "updated description"
      })
    
    expect(res.status).toBe(200)
    expect(res.body.data).toHaveProperty("title", "Updated title")                           
    expect(res.body.data).toHaveProperty("description", "updated description")
  })
})


describe("DELETE /posts/:id", () => {
  // ---- create a post so it can be found ----
  let token: string
  let postId: string

  beforeEach(async () => {
    await request(app).post("/api/v1/users/register").send({
      email: "test@test.com",
      handle: "testuser",
      password: "password123"
    })

    const login = await request(app).post("/api/v1/users/login").send({
      email: "test@test.com",
      password: "password123"
    })

    token = login.body.data.token



    const res = await request(app)
      .post("/api/v1/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test title specific",
        description: "test description specific id",
        categories: ["family", "anxiety"],
        isAnonymous: true
      })

    postId = res.body.data.id

  })

  // make sure its removed from DB, not only server
  test("Delete a post from DB", async () => {
    const res = await request(app)
      .delete(`/api/v1/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`)
  
    expect(res.status).toBe(204)
  })
})

