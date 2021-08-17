describe("Get /api/itineraries", () => {
    it("Return all itineraries", async () => {
        const response = await request(app).get("/api/itineraries")
        expect(response.status).toBe(200)
        expect(response.body).not.toBeNull()
        expect(Array.isArray(response.body.itinerarios)).toBe(true)
    });
});

describe("Get /api/itineraries/:id", () => {
    it("Return itineraries by its city id", async () => {
        const response = await request(app).get("/api/itineraries/6108651e8ca378e769bfaf52")
        expect(response.status).toBe(200)
        expect(response.body.success).toBe(true)
        expect(response.body).not.toBeNull()
        expect(Array.isArray(response.body.response)).toBe(true)
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