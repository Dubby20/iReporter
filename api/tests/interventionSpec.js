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

  it('it should not create an empty intervention', (done) => {
    const invalidIntervention = {
      location: '',
      images: '',
      videos: [],
      comment: ''
    };
    chai
      .request(server)
      .post('/api/v1/interventions')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .send(invalidIntervention)
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body)
          .to.have.property('message')
          .eql('Input fields must not be empty');
        done();
      });
  });

  it('it should not create an intervention if input is not valid', (done) => {
    const redFlag2 = {
      location: '10.89',
      images: 'htpps://wwww.bbgfddhghj',
      videos: [],
      comment: ''
    };
    chai
      .request(server)
      .post('/api/v1/interventions')
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

  it('it should not create a intervention if the token is invalid', (done) => {
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
        expect(response.body.error).eql('Access denied');
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
});

describe('/GET/interventions/:id', () => {
  it('it should GET an intervention by the given id', (done) => {
    chai.request(server)
      .get('/api/v1/interventions/11')
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
        expect(response.body.error).to.equal('The given intervention id is not a number');
        expect(response.body).to.be.an('object');
        done();
      });
  });

  it('it should return an error message when the given ID is not found', (done) => {
    chai.request(server)
      .get('/api/v1/interventions/1')
      .set('x-access-token', userToken)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.error).to.equal('The id of the given intervention was not found');
        expect(response.body).to.be.an('object');
        done();
      });
  });
});