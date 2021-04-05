// Test expected output when given valid input
// Test expected output when given invalid input

const chai = require('chai')
const chaiHTTP = require('chai-http')
const expect = chai.expect

// For chai to run tests on an unused port
chai.use(chaiHTTP)

const app = require('../app.js')

// If Mockaroo is down, change route to "res.send('Text')" and 
// comment out the axios to make sure the test runs.

// Group of tests
describe('Testing route handler for GET /usersbyname ', () => {
    it('should return 200 OK status ', () => {
        return chai.request(app).get('/usersbyname').then((response) => {
            expect(response.status).to.equal(200)
        })
    }).timeout(3000)

    it('should return user objects with the correct fields', () => {
        return chai.request(app).get('/usersbyname').then((response) => {
            expect((response.body)[0]).to.have.property('username')
            expect((response.body)[0]).to.have.property('password')
            expect((response.body)[0]).to.have.property('firstName')
            expect((response.body)[0]).to.have.property('lastName')
            expect((response.body)[0]).to.have.property('bio')
            expect((response.body)[0]).to.have.property('followers')
            expect((response.body)[0]).to.have.property('following')
            expect((response.body)[0]).to.have.property('liked')
            expect((response.body)[0]).to.have.property('slug')
            expect((response.body)[0]).to.have.property('imagePath')
            expect((response.body)[0]).to.have.property('id')
        })
    }).timeout(8000)

    it('should return user objects with the correct field types', () => {
        return chai.request(app).get('/usersbyname').then((response) => {
            expect((response.body)[0]).to.have.property('username').that.is.a('string')
            expect((response.body)[0]).to.have.property('followers').that.is.an('array')
            expect((response.body)[0]).to.have.property('id').that.is.a('int')
        })
    }).timeout(4000)

    // Not testing number of users returned - can be >= 1 based on search term
})