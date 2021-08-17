
describe("Get /api/cities", () => {
    it("Return all cities", async () => {
        const response = await request(app).get("/api/cities")
        expect(response.status).toBe(200)
        expect(response.body.success).toBe(true)
        expect(response.body.total).toBe(4)
        expect(response.body).not.toBeNull()
        expect(Array.isArray(response.body.response)).toBe(true)
    });
});

describe("Get /api/cityby/:id", () => {
    it("Return a city by its id", async () => {
        const response = await request(app).get("/api/cityby/6108651e8ca378e769bfaf52")
        expect(response.status).toBe(200)
        expect(response.body.success).toBe(true)
        expect(response.body.response.name).toBe("Buenos Aires")
        expect(response.body).not.toBeNull()
        expect(Array.isArray(response.body.response)).toBe(false)
    });
});


describe("Get /api/city", () => {
    it("Return a city by a query", async () => {
        const response = await request(app).get("/api/city?name=Buenos%20Aires")
        expect(response.status).toBe(200)
        expect(response.body.success).toBe(true)
        expect(response.body.response.name).toBe("Buenos Aires")
        expect(response.body).not.toBeNull()
    });
});

const request = require("supertest")
const { app } = require("../app")
let testServer
beforeAll(() => {
    testServer = app.listen(5000)
});
afterAll((done) => {
    testServer.close(done)
})



