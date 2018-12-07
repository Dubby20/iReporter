import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import pool from '../models/database';


const {
  expect
} = chai;

chai.use(chaiHttp);

const user = {
  firstname: 'Dubby',
  lastname: 'Alex',
  othernames: 'Dubem',
  username: 'Dubem20',
  email: 'duby@yahoo.com',
  password: 'password',
  phoneNumber: '07056734563'
};

const user2 = {
  firstname: 'Dubby',
  lastname: 'Alex',
  othernames: 'Dubem',
  username: 'Dubem20',
  email: 'duby12@yahoo.com',
  password: 'password',
  phoneNumber: '07056734563'
};

const inValidUser = {
  firstname: 'ja12',
  lastname: 'Nnadi',
  othernames: 'Dubem',
  username: '',
  email: 'dubyyahoocom',
  password: 'pass',
  phoneNumber: '07056734563'
};


describe('User', () => {
  before((done) => {
    pool.query(('DELETE from users where email = \'duby@yahoo.com\''));
    pool.query(('DELETE from users where username = \'Dubem20\''))
      .then(() => {
        done();
      }).catch(() => done());
  });

  describe('User signup', () => {
    it('It should create user with valid input details', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(user)
        .end((error, response) => {
          expect(response).to.status(201);
          expect(response.body).to.be.an('object');
          expect(response.body.data[0]).to.have.property('message').eql('User created successfully');
          expect(response.body.data).to.be.an('array');
          done();
        });
    });

    it('It Should not create a user with Invalid input details', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(inValidUser)
        .end((error, response) => {
          expect(response).to.status(422);
          expect(response.body).to.be.an('object');
          done();
        });
    });

    it('It should not create user with an existing email', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(user)
        .end((error, response) => {
          expect(response).to.status(409);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Email already exists');
          done();
        });
    });

    it('It should not create user with an existing username', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(user2)
        .end((error, response) => {
          expect(response).to.status(409);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Username already exists');
          done();
        });
    });
  });
});
// });