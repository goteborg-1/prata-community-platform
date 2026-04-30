import dotenv from "dotenv"
import app from "../app.js";
import request from "supertest"
import * as db from "./helpers/db.js"
import { beforeAll, afterEach, afterAll, describe, test, expect, beforeEach } from "@jest/globals"

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


