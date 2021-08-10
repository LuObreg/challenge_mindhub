describe('Get /api/cities', () => {
    it('Return all cities', async () => {
        const response = await request(app).get('/api/cities')
        expect(response.status).toBe(200)
        expect(response.body.ok).toBe(true)
        expect(response.body.total).toBe(27)
        expect(response.body).not.toBeNull()
        expect(Array.isArray(response.body.response)).toBe(true)
    });
});

const request = require('supertest')
const { app } = require('../app')
let testServer
beforeAll(() => {
testServer = app.listen(5000)
});
afterAll((done) => {
testServer.close(done)
})
