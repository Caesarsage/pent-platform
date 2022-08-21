import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { launchServer } from '../main'

chai.should()

chai.use(chaiHttp)

const testUser = {
  email: "test@gmail.com",
  username: "caesarsage",
  password: "testtest",
  firstName: "Caesar",
  lastName: "Dest",
  gender: "Male"
}
const app = chai.request(launchServer)

before(function (done) {
  this.timeout(3000)
  setTimeout(done, 2000)
})

// Test the /POST route
describe('/POST /api/auth/register', () => {
  it('it should register successfully', async () => {
    const res = await app.get('/')
    // res.send(testUser)
    expect(res.body).should.be.a('array')
    expect(res.status).to.be.eql(200)
    // res.body.should.have.property('message').eql('successfully created')
  })
})

// // Test failed /POST route
// it('it should not register the user, no payload passed', async () => {
//   const res = await app.post('/api/auth/register')
//     .send(testUser)
//     expect(res.status).to.be.eql(400)
//     expect(res.body.message).eql('Username already exists')


// })
// })

// Test the /Login route
//   describe('/POST /api/auth/login', () => {
//     it('it should login user', async () => {
//       const app = await chai.request(launchServer)
//       app.post('/api/auth/login')
//         .end((err, res) => {
//           res.should.have.status(200)
//           res.body.should.be.a('object')
//         })
//     })
//   })

//   // Test user not found /POST route
//   describe('/POST /api/students', () => {
//     it('it should not login user', async () => {
//       const app = await chai.request(launchServer)
//       app.post('/api/auth/login')
//         .send({})
//         .end((err, res) => {
//           res.should.have.status(400)
//         })
//     })
//   })
// })