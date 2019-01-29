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


const intervention = {
  location: '6.524379, 3.379206',
  images: [
    'https://res.cloudinary.com/djdsxql5q/image/upload/v1547738828/ireporter/tfxf6rwbqcmevzgkr3vg.jpg',
    'https://res.cloudinary.com/djdsxql5q/image/upload/v1547738885/ireporter/hqem8cqf5g3e5ehu50hv.jpg'
  ],
  videos: [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVtbtjMiVvbOLVc7dA53s3_st7BjF-wtTxNu8Tq_-5al0IZBId',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVtbtjMiVvbOLVc7dA53s3_st7BjF-wtTxNu8Tq_-5al0IZBId'
  ],
  comment: 'Grass Cutting” scandal of ex-secretary to the Federal Government'
};


describe('/POST interventions', () => {
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
  it('it should create an intervention', (done) => {
    chai
      .request(server)
      .post('/api/v1/interventions')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .send(intervention)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body).to.be.an('object');
        expect(response.body.data).to.be.an('array');
        expect(response.body.data[0]).to.have.property('message').eql('Created intervention record');
        done();
      });
  });

  it('it return an error if the location is empty', (done) => {
    chai
      .request(server)
      .post('/api/v1/interventions')
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
      .post('/api/v1/interventions')
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
      .post('/api/v1/interventions')
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
      .post('/api/v1/interventions')
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
      .post('/api/v1/interventions')
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
      .post('/api/v1/interventions')
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

  it('it should not create a intervention if the user is not authenticated', (done) => {
    chai
      .request(server)
      .post('/api/v1/interventions')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', '')
      .send(intervention)
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body).to.be.an('object');
        expect(response.body.error).eql('You must signup or login to access this route');
        done();
      });
  });

  it('it should not create an intervention if the token is invalid', (done) => {
    chai
      .request(server)
      .post('/api/v1/interventions')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', 'eghdfhyujgfjkgk')
      .send(intervention)
      .end((error, response) => {
        expect(response).to.have.status(403);
        expect(response.body).to.be.an('object');
        expect(response.body.error).eql('Authentication failed');
        done();
      });
  });
});

describe('/GET all interventions', () => {
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(user)
      .end((error, response) => {
        userToken = response.body.data[0].token;
        done();
      });
  });
  it('it should GET all interventions', (done) => {
    chai.request(server)
      .get('/api/v1/interventions')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.data[0]).to.have.property('message').eql('All interventions was retrieved successfully');
        expect(response.body).to.be.an('object');
        done();
      });
  });

  it('it should GET all interventions', (done) => {
    chai.request(server)
      .get('/api/v1/interventions')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.data).to.be.an('array');
        expect(response.body).to.be.an('object');
        done();
      });
  });
});

describe('/GET/interventions/:id', () => {
  it('it should GET an intervention by the given id', (done) => {
    chai.request(server)
      .get('/api/v1/interventions/257')
      .set('x-access-token', userToken)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.data[0]).to.have.property('message').equal('Get a specific intervention was successful');
        expect(response.body).to.be.an('object');
        expect(response.body.data).to.be.an('array');
        done();
      });
  });

  it('it should return an error message if the id is not a number', (done) => {
    chai.request(server)
      .get('/api/v1/interventions/re')
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
      .get('/api/v1/interventions/70')
      .set('x-access-token', userToken)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.error).to.equal('The id of the given intervention was not found');
        expect(response.body).to.be.an('object');
        done();
      });
  });
});

describe('/PATCH interventions/:id/location', () => {
  it('it should UPDATE location of a specific intervention id', (done) => {
    const interventionLocation = {
      location: '9.076479, 7.398574'
    };
    chai.request(server)
      .patch('/api/v1/interventions/258/location')
      .set('content-Type', 'application/json')
      .set('accept', 'application/json')
      .set('x-access-token', userToken)
      .send(interventionLocation)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.data).to.be.an('array');
        expect(response.body.data[0]).to.have.property('message').eql('Updated intervention record’s location');
        done();
      });
  });

  it('it should return an error if the location is empty', (done) => {
    chai.request(server)
      .patch('/api/v1/interventions/2/location')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .send({
        location: ''
      })
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Please enter your location');
        done();
      });
  });

  it('it should return an error if the location is invalid', (done) => {
    chai.request(server)
      .patch('/api/v1/interventions/1/location')
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

  it('it should return an error if the intervention id is not a number', (done) => {
    chai.request(server)
      .patch('/api/v1/interventions/ab/location')
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

  it('it should return an error if the intervention id is not found', (done) => {
    chai.request(server)
      .patch('/api/v1/interventions/180/location')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .send({
        location: '9.076479, 7.398574'
      })
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('The location with the given intervention id does not exists');
        done();
      });
  });

  it('it should return an error if the user_id is not authenticated', (done) => {
    chai.request(server)
      .patch('/api/v1/interventions/1/location')
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

describe('/PATCH interventions/:id/comment', () => {
  it('it should UPDATE comment of a specific intervention id', (done) => {
    const interventionComment = {
      comment: '24 billion NNPC contract scam'
    };
    chai.request(server)
      .patch('/api/v1/interventions/258/comment')
      .set('content-Type', 'application/json')
      .set('accept', 'application/json')
      .set('x-access-token', userToken)
      .send(interventionComment)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.data).to.be.an('array');
        expect(response.body.data[0]).to.have.property('message').eql('Updated intervention record’s comment');
        done();
      });
  });

  it('it should return an error if the comment is empty', (done) => {
    chai.request(server)
      .patch('/api/v1/interventions/2/comment')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .send({
        comment: ''
      })
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Please enter a comment');
        done();
      });
  });

  it('it should return an error if the comment is invalid', (done) => {
    chai.request(server)
      .patch('/api/v1/interventions/1/comment')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .send({
        comment: 234
      })
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('comment must be a string of characters');
        done();
      });
  });

  it('it should return an error if the intervention id is not a number', (done) => {
    chai.request(server)
      .patch('/api/v1/interventions/ab/comment')
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

  it('it should return an error if the intervention id is not found', (done) => {
    chai.request(server)
      .patch('/api/v1/interventions/60/comment')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .send({
        comment: '24 billion NNPC contract scam'
      })
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('The comment with the given intervention id does not exists');
        done();
      });
  });

  it('it should return an error if the user_id is not authenticated', (done) => {
    chai.request(server)
      .patch('/api/v1/interventions/1/comment')
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

describe('/DELETE interventions/:id', () => {
  it('it should not delete a intervention id if it is not a number', (done) => {
    chai.request(server)
      .delete('/api/v1/interventions/in')
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

  it('it should not DELETE an intervention id that is not available', (done) => {
    chai.request(server)
      .delete('/api/v1/interventions/90')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('The intervention with the given id does not exists');
        done();
      });
  });

  it('it should return an error if the user_id is not authenticated', (done) => {
    chai.request(server)
      .delete('/api/v1/interventions/14/')
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

describe('/PATCH interventions/:id/status', () => {
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
  it('it should UPDATE status of a specific intervention id', (done) => {
    const interventionStatus = {
      status: 'resolved'
    };
    chai.request(server)
      .patch('/api/v1/interventions/258/status')
      .set('content-Type', 'application/json')
      .set('accept', 'application/json')
      .set('x-access-token', adminToken)
      .send(interventionStatus)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.data).to.be.an('array');
        expect(response.body.data[0]).to.have.property('message').eql('Updated intervention record’s status');
        done();
      });
  });

  it('it should return an error if the status is empty', (done) => {
    const interventionStatus = {
      status: ''
    };
    chai.request(server)
      .patch('/api/v1/interventions/2/status')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', adminToken)
      .send(interventionStatus)
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Status is required');
        done();
      });
  });

  it('it should return an error if the comment is invalid', (done) => {
    chai.request(server)
      .patch('/api/v1/interventions/1/status')
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

  it('it should return an error if the intervention id is not a number', (done) => {
    chai.request(server)
      .patch('/api/v1/interventions/ab/status')
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

  it('it should return an error if the intervention id is not found', (done) => {
    chai.request(server)
      .patch('/api/v1/interventions/50/status')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', adminToken)
      .send({
        status: 'resolved'
      })
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('The status with the given intervention id was not found');
        done();
      });
  });

  it('it should return an error if the user_id is not authenticated', (done) => {
    chai.request(server)
      .patch('/api/v1/interventions/14/status')
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
      .patch('/api/v1/interventions/14/status')
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

describe('/GET/users/:id/interventions/', () => {
  it('it should GET a user red-flag recordd', (done) => {
    chai.request(server)
      .get('/api/v1/users/1/interventions')
      .set('x-access-token', userToken)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.data[0]).to.have.property('message').equal('Successful');
        expect(response.body).to.be.an('object');
        expect(response.body.data).to.be.an('array');
        done();
      });
  });

  it('it should return an error message if the id is not a number', (done) => {
    chai.request(server)
      .get('/api/v1/users/xy/interventions')
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
      .get('/api/v1/users/2/interventions')
      .set('x-access-token', userToken)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.error).to.equal('User has no interventions record');
        expect(response.body).to.be.an('object');
        done();
      });
  });
});