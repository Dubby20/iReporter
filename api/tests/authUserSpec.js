import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import pool from '../models/database';
import {
  users
} from './testData';


const {
  expect
} = chai;

chai.use(chaiHttp);


describe('User', () => {
  before((done) => {
    pool.query(('DELETE from users where email = \'duby@yahoo.com\''));
    pool.query(('DELETE from users where username = \'Dubem20\''))
      .then(() => {
        done();
      }).catch(() => done());
  });

  describe('User signup', () => {
    it('It should not create a user with no firstname', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(users[0])
        .end((error, response) => {
          expect(response).to.status(422);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error').eql('Please enter your firstname');
          done();
        });
    });

    it('It should not create a user with no lastname', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(users[1])
        .end((error, response) => {
          expect(response).to.status(422);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error').eql('Please enter your lastname');
          done();
        });
    });

    it('It should not create a user with no othernames', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(users[2])
        .end((error, response) => {
          expect(response).to.status(422);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error').eql('Please enter your othernames');
          done();
        });
    });

    it('It should not create a user with no username', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(users[3])
        .end((error, response) => {
          expect(response).to.status(422);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error').eql('Please enter your username');
          done();
        });
    });

    it('It should not create a user with no email', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(users[4])
        .end((error, response) => {
          expect(response).to.status(422);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error').eql('Please enter your email');
          done();
        });
    });

    it('It should not create a user with no firstname', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(users[5])
        .end((error, response) => {
          expect(response).to.status(422);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error').eql('Please enter your password');
          done();
        });
    });

    it('It should not create a user with no firstname', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(users[6])
        .end((error, response) => {
          expect(response).to.status(422);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error').eql('Please enter your phone number');
          done();
        });
    });

    it('It should create user with valid input details', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(users[14])
        .end((error, response) => {
          expect(response).to.status(201);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('message').eql('User created successfully');
          expect(response.body.data).to.be.an('array');
          done();
        });
    });

    it('It should not create a user with invalid firstname', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(users[7])
        .end((error, response) => {
          expect(response).to.status(422);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error').eql('firstname must be between 3 and 30 characters only');
          done();
        });
    });

    it('It should not create a user with invalid lastname', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(users[8])
        .end((error, response) => {
          expect(response).to.status(422);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error').eql('lastname must be between 3 and 30 characters only');
          done();
        });
    });

    it('It should not create a user with invalid othernames', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(users[9])
        .end((error, response) => {
          expect(response).to.status(422);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error').eql('othernames must be a minimum of 3 charcaters');
          done();
        });
    });

    it('It should not create a user with invalid username', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(users[10])
        .end((error, response) => {
          expect(response).to.status(422);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error').eql('username must contain between 3 and 30 alphanumeric characters only');
          done();
        });
    });

    it('It should not create a user with invalid email', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(users[11])
        .end((error, response) => {
          expect(response).to.status(422);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error').eql('Please enter a valid email');
          done();
        });
    });

    it('It should not create a user with invalid password', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(users[12])
        .end((error, response) => {
          expect(response).to.status(422);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error').eql('Password must be a minimum of 6 alphanumeric characters');
          done();
        });
    });

    it('It should not create a user with invalid phone number', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(users[13])
        .end((error, response) => {
          expect(response).to.status(422);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error').eql('Please enter a valid phone number');
          done();
        });
    });


    it('It should not create user with an existing email', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(users[14])
        .end((error, response) => {
          expect(response).to.status(409);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal('Email already exists');
          done();
        });
    });

    it('It should not create user if fields are incomplete', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(users[15])
        .end((error, response) => {
          expect(response).to.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal('Fill all required fields');
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
          expect(response.body).to.have.property('message').equal('Successfully signed in');
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
          expect(response.body.error).equal('User does not exists');
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
          expect(response.body.error).to.equal('email is required');
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
          expect(response.body.error).to.equal('password is required');
          done();
        });
    });
  });
});