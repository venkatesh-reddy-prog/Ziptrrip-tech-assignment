import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../src/app";

describe("Todo API", () => {
  it("returns health status", async () => {
    const response = await request(app).get("/api/health");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
  });

  it("creates and retrieves a todo", async () => {
    const created = await request(app)
      .post("/api/todos")
      .send({
        title: `Test todo ${Date.now()}`,
        description: "Created by automated test",
        priority: "high"
      });

    expect(created.status).toBe(201);
    expect(created.body.data.title).toContain("Test todo");

    const id = created.body.data.id;
    const fetched = await request(app).get(`/api/todos/${id}`);

    expect(fetched.status).toBe(200);
    expect(fetched.body.data.id).toBe(id);
  });

  it("rejects an invalid todo", async () => {
    const response = await request(app)
      .post("/api/todos")
      .send({ title: "" });

    expect(response.status).toBe(400);
  });

  it("updates and toggles a todo", async () => {
    const created = await request(app)
      .post("/api/todos")
      .send({ title: `Update test ${Date.now()}` });

    const id = created.body.data.id;

    const updated = await request(app)
      .put(`/api/todos/${id}`)
      .send({ title: "Updated title", priority: "low" });

    expect(updated.status).toBe(200);
    expect(updated.body.data.title).toBe("Updated title");
    expect(updated.body.data.priority).toBe("low");

    const toggled = await request(app).patch(`/api/todos/${id}/toggle`);
    expect(toggled.status).toBe(200);
    expect(toggled.body.data.completed).toBe(true);
  });

  it("deletes a todo", async () => {
    const created = await request(app)
      .post("/api/todos")
      .send({ title: `Delete test ${Date.now()}` });

    const id = created.body.data.id;
    const deleted = await request(app).delete(`/api/todos/${id}`);

    expect(deleted.status).toBe(204);

    const fetched = await request(app).get(`/api/todos/${id}`);
    expect(fetched.status).toBe(404);
  });
});
