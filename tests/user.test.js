const request = require("supertest");
const mongoose = require("mongoose");
const server = require("../server");
const User = require("../models/User");

jest.setTimeout(30000);

describe("User API", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  it("should create a new user", async () => {
    const res = await request(server).post("/api/users").send({
      name: "Stuart Olivera",
      email: "stuart.olivera@niveussolutions.com",
      age: 30,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
  });

  it("should fetch all users", async () => {
    await request(server).post("/api/users").send({
      name: "Shashank Hegde",
      email: "shashank.hegde@niveussolutions.com",
      age: 25,
    });

    const res = await request(server).get("/api/users");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should update a user", async () => {
    const user = await request(server)
      .post("/api/users")
      .send({ name: "Nithin", email: "nithin@gmail.com", age: 22 });

    const res = await request(server)
      .put(`/api/users/${user.body._id}`)
      .send({ age: 23 });

    expect(res.statusCode).toEqual(200);
    expect(res.body.age).toEqual(23);
  });
});
