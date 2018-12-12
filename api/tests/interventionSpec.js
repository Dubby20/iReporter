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
chai.use(chaiHttp);
let userToken;

const intervention = {
  location: '6.524379, 3.379206',
  images: [
    'https://static.pulse.ng/img/incoming/origs7532087/2036362149-w644-h960/babachir-lawal.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVtbtjMiVvbOLVc7dA53s3_st7BjF-wtTxNu8Tq_-5al0IZBId.jpg'
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

  it('it return an error if images is empty', (done) => {
    chai
      .request(server)
      .post('/api/v1/interventions')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .send(records[2])
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Please enter an image url');
        done();
      });
  });

  it('it return an error if videos is empty', (done) => {
    chai
      .request(server)
      .post('/api/v1/interventions')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .send(records[3])
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Please enter a video url');
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
        expect(response.body.error).eql('Unauthorized');
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
      .get('/api/v1/interventions/1')
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
      .patch('/api/v1/interventions/2/location')
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
      .patch('/api/v1/interventions/80/location')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .send({
        location: '9.076479, 7.398574'
      })
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('The intervention with the given id does not exists');
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
        expect(response.body).to.have.property('error').eql('Unauthorized');
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
      .patch('/api/v1/interventions/1/comment')
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

  it('it should return an error if the location is empty', (done) => {
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
        expect(response.body).to.have.property('error').eql('The intervention with the given id does not exists');
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
        expect(response.body).to.have.property('error').eql('Unauthorized');
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
        expect(response.body).to.have.property('error').eql('Unauthorized');
        done();
      });
  });
});