import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';


const {
  expect
} = chai;

chai.use(chaiHttp);

describe('/POST red-flag', () => {
  it('should create a red-flag record', (done) => {
    const incidents = {
      createdBy: 2,
      type: 'intervention',
      location: '6.524379, 3.379206',
      status: 'rejected',
      images: ['https://static.pulse.ng/img/incoming/origs7872357/5196368231-w644-h960/DSuR9f-XUAY9MDF.jpg'],
      videos: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVtbtjMiVvbOLVc7dA53s3_st7BjF-wtTxNu8Tq_-5al0IZBId'],
      comment: '$24 billion NNPC contract scam'
    };
    chai.request(server)
      .post('/api/v1/red-flags')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(incidents)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body).to.be.an('object');
        expect(response.body.data[0]).to.have.property('message').eql('Created red-flag record');
        done();
      });
  });
});

describe('/GET all red-flag records', () => {
  it('should get all red-flag records', (done) => {
    chai.request(server)
      .get('/api/v1/red-flags')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.data[0]).to.have.property('message').eql('All red-flag records retrieved successfully');
        done();
      });
  });

  it('should get all red-flag records', (done) => {
    chai.request(server)
      .get('/api/v1/red-flags')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.data[0]).to.have.property('message').eql('All red-flag records retrieved successfully');
        done();
      });
  });
});

describe('/GET a specific red-flag record', () => {
  it('should get a red-flag record id', (done) => {
    chai.request(server)
      .get('/api/v1/red-flags/1')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.data[0]).to.have.property('message').eql('The given red-flag id retrieved successfullly');
        done();
      });
  });

  it('should return an error if the red-flag record id is not found', (done) => {
    chai.request(server)
      .get('/api/v1/red-flags/10')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('The red-flag record with the given ID was not found');
        done();
      });
  });

  it('should return an error if the red-flag record id is not a number', (done) => {
    chai.request(server)
      .get('/api/v1/red-flags/rf')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('The given id is not a number');
        done();
      });
  });
});

describe('/PATCH a specific red-flag record location', () => {
  it('it should update the location of a specific red-flag record', (done) => {
    const redFlagLocation = {
      location: '6.524379, 3.379206'
    };
    chai.request(server)
      .patch('/api/v1/red-flags/1/location')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(redFlagLocation)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.data[0]).to.have.property('message').eql('Updated red-flag record’s location');
        done();
      });
  });

  it('should return an error if the red-flag record id is not found', (done) => {
    chai.request(server)
      .patch('/api/v1/red-flags/10/location')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('The red-flag record with the given ID was not found');
        done();
      });
  });

  it('should return an error if the red-flag record id is not a number', (done) => {
    chai.request(server)
      .patch('/api/v1/red-flags/rf/location')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('The given id is not a number');
        done();
      });
  });

  it('it should return an error if the location input is empty', (done) => {
    const redFlagLocation = {
      location: ''
    };
    chai.request(server)
      .patch('/api/v1/red-flags/1/location')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(redFlagLocation)
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Please enter a location');
        done();
      });
  });

  it('it should return an error if the location input is invalid', (done) => {
    const redFlagLocation = {
      location: '109, 180'
    };
    chai.request(server)
      .patch('/api/v1/red-flags/1/location')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(redFlagLocation)
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Please enter a valid location');
        done();
      });
  });
});

describe('/PATCH a specific red-flag record comment', () => {
  it('it should update the comment of a specific red-flag record', (done) => {
    const redFlagComment = {
      comment: 'Dasuki gate scandal'
    };
    chai.request(server)
      .patch('/api/v1/red-flags/1/comment')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(redFlagComment)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.data[0]).to.have.property('message').eql('Updated red-flag record’s comment');
        done();
      });
  });

  it('should return an error if the red-flag record id is not found', (done) => {
    chai.request(server)
      .patch('/api/v1/red-flags/10/comment')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('The red-flag record with the given ID was not found');
        done();
      });
  });

  it('should return an error if the red-flag record id is not a number', (done) => {
    chai.request(server)
      .patch('/api/v1/red-flags/rf/comment')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('The given id is not a number');
        done();
      });
  });

  it('it should return an error if the comment input is empty', (done) => {
    const redFlagComment = {
      comment: ''
    };
    chai.request(server)
      .patch('/api/v1/red-flags/1/comment')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(redFlagComment)
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Please enter a comment');
        done();
      });
  });

  it('it should return an error if the comment input is not a string', (done) => {
    const redFlagComment = {
      comment: 109
    };
    chai.request(server)
      .patch('/api/v1/red-flags/1/comment')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(redFlagComment)
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Comment must be a character not exceeding 300 words');
        done();
      });
  });
});

describe('/DELETE a specific red-flag record location', () => {
  it('it should delete the location of a specific red-flag record', (done) => {
    chai.request(server)
      .delete('/api/v1/red-flags/1/')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.data[0]).to.have.property('message').eql('red-flag record has been deleted successfully');
        done();
      });
  });

  it('should return an error if the red-flag record id is not found', (done) => {
    chai.request(server)
      .delete('/api/v1/red-flags/10/')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('The red-flag record with the given ID was not found');
        done();
      });
  });

  it('should return an error if the red-flag record id is not a number', (done) => {
    chai.request(server)
      .delete('/api/v1/red-flags/rf')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('The given id is not a number');
        done();
      });
  });
});