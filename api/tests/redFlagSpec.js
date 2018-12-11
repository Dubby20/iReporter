import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const {
  expect
} = chai;

const user = {
  email: 'ebuka179@gmail.com',
  password: 'password221'
};
chai.use(chaiHttp);
let userToken;

const redFlag = {
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
      .send(redFlag)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body).to.be.an('object');
        expect(response.body.data).to.be.an('array');
        expect(response.body.data[0]).to.have.property('message').eql('Created red-flag record');
        done();
      });
  });

  it('it should not create an empty red-flag', (done) => {
    const invalidRedFlag = {
      location: '',
      images: '',
      videos: [],
      comment: ''
    };
    chai
      .request(server)
      .post('/api/v1/red-flags')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .send(invalidRedFlag)
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body)
          .to.have.property('message')
          .eql('Input fields must not be empty');
        done();
      });
  });

  it('it should not create a red-flag if input is not valid', (done) => {
    const redFlag2 = {
      location: '10.89',
      images: 'htpps://wwww.bbgfddhghj',
      videos: [],
      comment: ''
    };
    chai
      .request(server)
      .post('/api/v1/red-flags')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .send(redFlag2)
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
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
      .send(redFlag)
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body).to.be.an('object');
        expect(response.body.error).eql('Unauthorized');
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
      .send(redFlag)
      .end((error, response) => {
        expect(response).to.have.status(403);
        expect(response.body).to.be.an('object');
        expect(response.body.error).eql('Access denied');
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
      .get('/api/v1/red-flags/1')
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
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal('The given red-flag id is not a number');
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
      .patch('/api/v1/red-flags/1/location')
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
        expect(response.body).to.have.property('error').eql('Please enter a location');
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
        expect(response.body).to.have.property('error').eql('Please enter a valid location');
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
        expect(response.body).to.have.property('error').eql('The given red-flag id is not a number');
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
        expect(response.body).to.have.property('error').eql('Unauthorized');
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
      .patch('/api/v1/red-flags/1/comment')
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

  it('it should return an error if the location is empty', (done) => {
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
        comment: '$24 billion NNPC contract scam'
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
        expect(response.body).to.have.property('error').eql('The given red-flag id is not a number');
        done();
      });
  });

  it('it should return an error if the red-flag id is not found', (done) => {
    chai.request(server)
      .patch('/api/v1/red-flags/100/comment')
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
        expect(response.body).to.have.property('error').eql('Unauthorized');
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
        expect(response.body).to.have.property('error').eql('The given red-flag id is not a number');
        done();
      });
  });

  it('it should not DELETE an intervention id that is not available', (done) => {
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
        expect(response.body).to.have.property('error').eql('Unauthorized');
        done();
      });
  });
});