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

  describe('User login', () => {
    it('It should login a user with a valid input details', (done) => {
      const userLogin = {
        email: 'duby@yahoo.com',
        password: 'password'
      };
      chai.request(server)
        .post('/api/v1/auth/login')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(userLogin)
        .end((error, response) => {
          expect(response).to.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body.data[0]).to.have.property('message').equal('Successfully signed in');
          expect(response.body.data[0]).to.have.property('token');
          expect(response.body.data).to.be.an('array');
          done();
        });
    });

    it('It should not login a user with Invalid email details', (done) => {
      const userLogin2 = {
        email: 'jay7@gmail.com',
        password: 'password'
      };
      chai.request(server)
        .post('/api/v1/auth/login')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(userLogin2)
        .end((error, response) => {
          expect(response).to.status(422);
          expect(response.body).to.be.an('object');
          expect(response.body.error).equal('Invalid login details. Email or password is wrong');
          done();
        });
    });

    it('It should not login a user with Invalid password details', (done) => {
      const userLogin3 = {
        email: 'duby@yahoo.com',
        password: 'dubby'
      };
      chai.request(server)
        .post('/api/v1/auth/login')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(userLogin3)
        .end((error, response) => {
          expect(response).to.status(422);
          expect(response.body).to.be.an('object');
          expect(response.body.error).equal('Invalid login details. Email or password is wrong');
          done();
        });
    });

    it('It should not login a user when the email is not given or invalid', (done) => {
      const userLogin4 = {
        email: '',
        password: 'dubby654'
      };
      chai.request(server)
        .post('/api/v1/auth/login')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(userLogin4)
        .end((error, response) => {
          expect(response).to.status(422);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal('Email is required');
          done();
        });
    });

    it('It should not login a user when the password is not given or invalid', (done) => {
      const userLogin5 = {
        email: 'jay7@gmail.com',
        password: ''
      };
      chai.request(server)
        .post('/api/v1/auth/login')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(userLogin5)
        .end((error, response) => {
          expect(response).to.status(422);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal('Password is required');
          done();
        });
    });
  });
});