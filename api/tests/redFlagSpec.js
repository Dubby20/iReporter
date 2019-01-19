import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import {
  records
} from './testData';


const {
  expect
} = chai;

const user = {
  email: 'ebuka179@gmail.com',
  password: 'password221'
};

const admin = {
  email: 'jacynnadi20@gmail.com',
  password: 'password'
};
chai.use(chaiHttp);
let userToken;
let adminToken;

describe('/POST red-flags', () => {
  before((done) => {
    chai
      .request(server)
      .post('/api/v1/auth/login')
      .send(user)
      .end((error, response) => {
        userToken = response.body.data[0].token;
        done();
      });
  });
  it('it should create a red-flag', (done) => {
    chai
      .request(server)
      .post('/api/v1/red-flags')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .send(records[0])
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body).to.be.an('object');
        expect(response.body.data).to.be.an('array');
        expect(response.body.data[0]).to.have.property('message').eql('Created red-flag record');
        done();
      });
  });

  it('it return an error if the location is empty', (done) => {
    chai
      .request(server)
      .post('/api/v1/red-flags')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .send(records[1])
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Please enter your location');
        done();
      });
  });
  it('it return an error if comment is empty', (done) => {
    chai
      .request(server)
      .post('/api/v1/red-flags')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .send(records[4])
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Please enter a comment');
        done();
      });
  });

  it('it should return an error if the location is invalid', (done) => {
    chai.request(server)
      .post('/api/v1/red-flags')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .send(records[5])
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('location does not match a Lat Long coordinates');
        done();
      });
  });

  it('it should return an error if the image is not a string', (done) => {
    chai.request(server)
      .post('/api/v1/red-flags')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .send(records[6])
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('image must be a string');
        done();
      });
  });


  it('it should return an error if the video is not a string', (done) => {
    chai.request(server)
      .post('/api/v1/red-flags')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .send(records[7])
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('video must be a string');

        done();
      });
  });

  it('it should return an error if the comment is not a string', (done) => {
    chai.request(server)
      .post('/api/v1/red-flags')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .send(records[8])
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('comment must be a string of characters');

        done();
      });
  });

  it('it should return an error if images is not an array', (done) => {
    chai.request(server)
      .post('/api/v1/red-flags')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .send(records[9])
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Images must be an array');

        done();
      });
  });

  it('it should return an error if videos is not an array', (done) => {
    chai.request(server)
      .post('/api/v1/red-flags')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .send(records[10])
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('videos must be an array');

        done();
      });
  });

  it('it should not create a red-flag if the user is not authenticated', (done) => {
    chai
      .request(server)
      .post('/api/v1/red-flags')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', '')
      .send(records[0])
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body).to.be.an('object');
        expect(response.body.error).eql('You must signup or login to access this route');
        done();
      });
  });

  it('it should not create a red-flag if the token is invalid', (done) => {
    chai
      .request(server)
      .post('/api/v1/red-flags')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', 'eghdfhyujgfjkgk')
      .send(records[0])
      .end((error, response) => {
        expect(response).to.have.status(403);
        expect(response.body).to.be.an('object');
        expect(response.body.error).eql('Authentication failed');
        done();
      });
  });
});

describe('/GET all red-flags', () => {
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(user)
      .end((error, response) => {
        userToken = response.body.data[0].token;
        done();
      });
  });
  it('it should GET all red-flags', (done) => {
    chai.request(server)
      .get('/api/v1/red-flags')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.data[0]).to.have.property('message').eql('All red-flags was retrieved successfully');
        expect(response.body).to.be.an('object');
        done();
      });
  });
});

describe('/GET/red-flags/:id', () => {
  it('it should GET a red-flag by the given id', (done) => {
    chai.request(server)
      .get('/api/v1/red-flags/267')
      .set('x-access-token', userToken)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.data[0]).to.have.property('message').equal('Get a specific red-flag was successful');
        expect(response.body).to.be.an('object');
        expect(response.body.data).to.be.an('array');
        done();
      });
  });

  it('it should return an error message if the id is not a number', (done) => {
    chai.request(server)
      .get('/api/v1/red-flags/re')
      .set('x-access-token', userToken)
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body.error).to.equal('The given id is not a number');
        expect(response.body).to.be.an('object');
        done();
      });
  });

  it('it should return an error message when the given ID is not found', (done) => {
    chai.request(server)
      .get('/api/v1/red-flags/70')
      .set('x-access-token', userToken)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.error).to.equal('The id of the given red-flag was not found');
        expect(response.body).to.be.an('object');
        done();
      });
  });
});

describe('/PATCH red-flags/:id/location', () => {
  it('it should UPDATE location of a specific red-flag id', (done) => {
    const redFlagLocation = {
      location: '9.076479, 7.398574'
    };
    chai.request(server)
      .patch('/api/v1/red-flags/270/location')
      .set('content-Type', 'application/json')
      .set('accept', 'application/json')
      .set('x-access-token', userToken)
      .send(redFlagLocation)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.data).to.be.an('array');
        expect(response.body.data[0]).to.have.property('message').eql('Updated red-flag record’s location');
        done();
      });
  });

  it('it should return an error if the location is empty', (done) => {
    const redFlagLocation = {
      location: ''
    };
    chai.request(server)
      .patch('/api/v1/red-flags/2/location')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .send(redFlagLocation)
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Please enter your location');
        done();
      });
  });

  it('it should return an error if the location is invalid', (done) => {
    chai.request(server)
      .patch('/api/v1/red-flags/1/location')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .send({
        location: '9.076479'
      })
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('location does not match a Lat Long coordinates');
        done();
      });
  });

  it('it should return an error if the red-flag id is not a number', (done) => {
    chai.request(server)
      .patch('/api/v1/red-flags/ab/location')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .send({
        location: '9.076479, 7.398574'
      })
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('The given id is not a number');
        done();
      });
  });

  it('it should return an error if the red-flag id is not found', (done) => {
    chai.request(server)
      .patch('/api/v1/red-flags/80/location')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .send({
        location: '9.076479, 7.398574'
      })
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('The red-flag with the given id does not exists');
        done();
      });
  });

  it('it should return an error if the user_id is not authenticated', (done) => {
    chai.request(server)
      .patch('/api/v1/red-flags/14/location')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', '')
      .send({
        location: '9.076479, 7.398574'
      })
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('You must signup or login to access this route');
        done();
      });
  });
});

describe('/PATCH red-flags/:id/comment', () => {
  it('it should UPDATE comment of a specific red-flag id', (done) => {
    const redFlagComment = {
      comment: '24 billion NNPC contract scam'
    };
    chai.request(server)
      .patch('/api/v1/red-flags/270/comment')
      .set('content-Type', 'application/json')
      .set('accept', 'application/json')
      .set('x-access-token', userToken)
      .send(redFlagComment)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.data).to.be.an('array');
        expect(response.body.data[0]).to.have.property('message').eql('Updated red-flag record’s comment');
        done();
      });
  });

  it('it should return an error if the comment is empty', (done) => {
    const redFlagComment = {
      comment: ''
    };
    chai.request(server)
      .patch('/api/v1/red-flags/2/comment')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .send(redFlagComment)
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Please enter a comment');
        done();
      });
  });

  it('it should return an error if the comment is invalid', (done) => {
    chai.request(server)
      .patch('/api/v1/red-flags/1/comment')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .send({
        comment: 90
      })
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('comment must be a string of characters');
        done();
      });
  });

  it('it should return an error if the red-flag id is not a number', (done) => {
    chai.request(server)
      .patch('/api/v1/red-flags/ab/comment')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .send({
        comment: '24 billion NNPC contract scam'
      })
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('The given id is not a number');
        done();
      });
  });

  it('it should return an error if the red-flag id is not found', (done) => {
    chai.request(server)
      .patch('/api/v1/red-flags/10/comment')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .send({
        comment: '24 billion NNPC contract scam'
      })
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('The red-flag with the given id does not exists');
        done();
      });
  });

  it('it should return an error if the user_id is not authenticated', (done) => {
    chai.request(server)
      .patch('/api/v1/red-flags/14/comment')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', '')
      .send({
        comment: '24 billion NNPC contract scam'
      })
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('You must signup or login to access this route');
        done();
      });
  });
});


describe('/DELETE red-flags/:id', () => {
  it('it should not delete a red-flag id if it is not a number', (done) => {
    chai.request(server)
      .delete('/api/v1/red-flags/in')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('The given id is not a number');
        done();
      });
  });

  it('it should not DELETE a red-flag id that is not available', (done) => {
    chai.request(server)
      .delete('/api/v1/red-flags/45')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('The red-flag with the given id does not exists');
        done();
      });
  });

  it('it should return an error if the user_id is not authenticated', (done) => {
    chai.request(server)
      .delete('/api/v1/red-flags/14/')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', '')
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('You must signup or login to access this route');
        done();
      });
  });
});

describe('/PATCH red-flags/:id/status', () => {
  before((done) => {
    chai
      .request(server)
      .post('/api/v1/auth/login')
      .send(admin)
      .end((error, response) => {
        adminToken = response.body.data[0].token;
        done();
      });
  });
  it('it should UPDATE status of a specific red-flag id', (done) => {
    const redFlagStatus = {
      status: 'resolved'
    };
    chai.request(server)
      .patch('/api/v1/red-flags/266/status')
      .set('content-Type', 'application/json')
      .set('accept', 'application/json')
      .set('x-access-token', adminToken)
      .send(redFlagStatus)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.data).to.be.an('array');
        expect(response.body.data[0]).to.have.property('message').eql('Updated red-flag record’s status');
        done();
      });
  });

  it('it should return an error if the status is empty', (done) => {
    const redFlagStatus = {
      status: ''
    };
    chai.request(server)
      .patch('/api/v1/red-flags/2/status')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', adminToken)
      .send(redFlagStatus)
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Status is required');
        done();
      });
  });

  it('it should return an error if the status is invalid', (done) => {
    chai.request(server)
      .patch('/api/v1/red-flags/1/status')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', adminToken)
      .send({
        status: 'pending'
      })
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Invalid status, status must be a string containing under investigation, resolved or rejected');
        done();
      });
  });

  it('it should return an error if the red-flag id is not a number', (done) => {
    chai.request(server)
      .patch('/api/v1/red-flags/ab/status')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', adminToken)
      .send({
        status: 'under investigation'
      })
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('The given id is not a number');
        done();
      });
  });

  it('it should return an error if the red-flag id is not found', (done) => {
    chai.request(server)
      .patch('/api/v1/red-flags/80/status')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', adminToken)
      .send({
        status: 'resolved'
      })
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('The status with the given red-flag id was not found');
        done();
      });
  });

  it('it should return an error if the user_id is not authenticated', (done) => {
    chai.request(server)
      .patch('/api/v1/red-flags/14/status')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', '')
      .send({
        status: 'rejected'
      })
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('You must signup or login to access this route');
        done();
      });
  });
  it('it should return an error if the user_id is not authorized', (done) => {
    chai.request(server)
      .patch('/api/v1/red-flags/14/status')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .send({
        status: 'rejected'
      })
      .end((error, response) => {
        expect(response).to.have.status(403);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('You do not have the admin rights to perform this action');
        done();
      });
  });
});